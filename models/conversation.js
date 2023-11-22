'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.belongsTo(models.User, {as: "SenderId", foreignKey: "userId1"})
      Conversation.belongsTo(models.User, {as: "ReceiverId", foreignKey: "userId2"})
      
      Conversation.hasMany(models.Message, {foreignKey: "conversationId"})
    }
  }
  Conversation.init({
    userId1: DataTypes.INTEGER,

    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};