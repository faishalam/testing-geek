'use strict';
const {
  Model
} = require('sequelize');
const { genSalt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: "userId"
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull :{
          msg : "Name is required"
        },
        notEmpty : {
          msg: "Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull :{
          msg : "Email is required"
        },
        notEmpty : {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull :{
          msg : "Password is required"
        },
        notEmpty : {
          msg: "Password is required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "reseller",
      validate: {
        notNull :{
          msg : "Role is required"
        },
        notEmpty : {
          msg: "Role is required"
        }
      }
    },
  }, {
    hooks : {
      beforeCreate(instance, option) {
        instance.password = genSalt(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};