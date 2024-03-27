const Reaction = require("./Reaction");
const Thought = require("./Thought");
const User = require("./User");


User.hasMany(Thought, { foreignKey: 'user_id' });
Thought.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Reaction, { foreignKey: 'user_id' });
Reaction.belongsTo(User, { foreignKey: 'user_id' });

Thought.hasMany(Reaction, { foreignKey: 'thought_id' });
Reaction.belongsTo(Thought, { foreignKey: 'thought_id' });

User.belongsToMany(User, { as: 'user', through: 'userFriends', uniqueKey: 'user_id'});
User.belongsToMany(User, { as: 'friend', through: ' userFriends', uniqueKey: 'friend_id' });

module.exports = {
  User,
  Thought,
  Reaction,
}