const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thought extends Model { };

Thought.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  thoughtText: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 280],
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    references: {
      model: 'user',
      key: 'username',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
}, {
  sequelize,
  underscored: true,
  freezeTableName: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  modelName: 'thought',
});


module.exports = Thought;