'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Message.belongsTo(models.User, {as: "UserSender", foreignKey: "userId1"})
      
      Message.belongsTo(models.Conversation, {foreignKey: "conversationId"})

    }
  }
  Message.init({
    message: DataTypes.STRING(1000),
    userId1: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};