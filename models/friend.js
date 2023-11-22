'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      Friend.belongsTo(models.User, {as: "Sender", foreignKey: "userId1"})
      Friend.belongsTo(models.User, {as: "Receiver", foreignKey: "userId2"})

    }
  }
  Friend.init({
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,

    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    }

  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};