const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reaction extends Model { };

Reaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  reactionBody: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 280],
    },
  },
  thought_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'thought',
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'user',
      key: 'username',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  updatedAt: false,
  createdAt: 'created_at',
  underscored: true,
  freezeTableName: true,
  modelName: 'reaction'
});


module.exports = Reaction;