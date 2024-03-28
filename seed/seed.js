const sequelize = require('../config/connection');
const { Thought, User, Reaction } = require('../model');
const { getRandomUser, getReaction, randomPick, getThought } = require('./data');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function seed(req, res) {
  // drop all collections in db
  await sequelize.sync({ force: true });

  const {
    minUser = 10,
    maxUser = 100,
    minThought = 10,
    maxThought = 100,
    minReaction = 10,
    maxReacction = 100
  } = req.body;

  const users = getUsersObject(randomNum(minUser, maxUser));
  const thoughts = getThoughtObject(randomNum(minThought, maxThought), users);

  const usersData = await User.bulkCreate(users);
  const thoughtsData = await Thought.bulkCreate(thoughts);

  const reactions = getReactionObject(randomNum(minReaction, maxReacction), users, thoughtsData.map(e => e.toJSON()))
  const reactionsData = await Reaction.bulkCreate(reactions);

  console.log(thoughtsData);
  res.status(201).json({
    msg: 'seeded',
    size: {
      users: usersData.length,
      thoughts: thoughtsData.length,
      reactions: reactionsData.length
    },
    usersData,
    thoughtsData,
    reactionsData
  });
}

/**
 * return a random number between 0 and [num]
 * @param {number} num upper bound of random gen
 * @returns {number} random gen between 0 and [num]
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * return an array of size [num] of userdata
 * @param {number} num amount of users
 * @returns {{username: string, email: string}[]}
 */
function getUsersObject(num) {
  const users = new Array(num);

  for (let i = 0; i < users.length; i++) {
    const username = getRandomUser();
    const email = `${username}@email.com`;

    users[i] = { username, email };
  }

  return users;
}

/**
 * return an array of size [num] of thoughtdata
 * @param {number} num amount of thoughts
 * @param {{username: string, email: string}[]} users array of userdatas
 * @returns {{thoughtText: string, username: string}}
 */
function getThoughtObject(num, users) {
  const thoughts = new Array(num);

  for (let i = 0; i < thoughts.length; i++) {
    const thoughtText = getThought();
    const username = randomPick(users).username;

    thoughts[i] = { thoughtText, username };
  }
  return thoughts;
}

/**
 *
 * @param {number} num maximum amount of reactions
 * @param {{username: string, email: string}[]} users array of user data
 * @param {{id: number, thoughtText: string, created_at: Date, username: string}[]} thoughts
 * @returns {{reactionBody: string, thought_id: number, username: string}[]} array of reaction data
 */
function getReactionObject(num, users, thoughts) {
  const reactions = new Array(num);

  for (let i = 0; i < reactions.length; i++) {
    const reactionBody = getReaction();
    const thought_id = randomPick(thoughts).id;
    const username = randomPick(users).username;

    reactions[i] = { reactionBody, thought_id, username };
  }
  return reactions;
}

module.exports = seed;