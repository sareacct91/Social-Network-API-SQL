const Reaction = require("./Reaction");
const Thought = require("./Thought");
const User = require("./User");


User.hasMany(Thought, { sourceKey: 'username', foreignKey: 'username' });
Thought.belongsTo(User, { targetKey: 'username' ,foreignKey: 'username' });

User.hasMany(Reaction, {sourceKey: 'username', foreignKey: 'username' });
Reaction.belongsTo(User, {targetKey: 'username', foreignKey: 'username' });

Thought.hasMany(Reaction, { foreignKey: 'thought_id' });
Reaction.belongsTo(Thought, { foreignKey: 'thought_id' });

User.belongsToMany(User, {
  as: 'friend',
  through: 'userFriends',
  foreignKey: 'user_id',
  otherKey: 'friend_id',
});

module.exports = {
  User,
  Thought,
  Reaction,
}