const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { };

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true,
    },
  },
}, {
  sequelize,
  underscored: true,
  freezeTableName: true,
  timestamps: false,
  modelName: 'user',
});


module.exports = User;