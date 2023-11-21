'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email cannot be Empty!"
        },
        notEmpty: {
          msg: "Email cannot be Empty!"
        },
        isEmail: {
          msg: "Email should be written in email format!"
        }
      }
    },


    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be Empty!"
        },
        notEmpty: {
          msg: "Password cannot be Empty!"
        }
      }
    },


    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Username cannot be Empty!"
        },
        notEmpty: {
          msg: "Username cannot be Empty!"
        }
      }
    },


    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Gender cannot be Empty!"
        },
        notEmpty: {
          msg: "Gender cannot be Empty!"
        }
      }
    },


    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Age cannot be Empty!"
        },
        notEmpty: {
          msg: "Age cannot be Empty!"
        }
      }
    },


    imageUrl: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notNull: {
          msg: "imageUrl cannot be Empty!"
        },
        notEmpty: {
          msg: "imageUrl cannot be Empty!"
        }
      }
    },


  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  })

  return User;
};