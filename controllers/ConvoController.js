const { Conversation, Message, User } = require('../models');

module.exports = class ConvoController {


    static async newConvo(req, res, next) {
        try {

            const { id } = req.user
            const { userId2 } = req.body

            if (id === userId2) {
                throw { name: "Forbidden", message: "Do not send it to Yourself!" }
            }


            const convo = await Conversation.findOne({
                where: {
                    userId1: id,
                    userId2: userId2
                }
            })

            if(convo) throw { name: "Forbidden", message: "Conversation Already Exists!" }


            const convos = await Conversation.create({
                userId1: id,
                userId2: userId2
            })

            res.status(201).json(convos)

        } catch (error) {
            next(error)
        }
    }


    static async getConvo(req, res, next) {
        try {

            const convo = await Conversation.findAll({
                include: [{
                    model: User,
                    as: "ReceiverId"
                }]
            })

            res.status(201).json(convo)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }


    static async getConvoById(req, res, next) {
        try {

            const convo = await Conversation.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                {
                    model: User,
                    as: "ReceiverId"
                },
                {
                    model: User,
                    as: "SenderId"
                },
                {
                    model: Message,
                }
            ]
            })

            res.status(201).json(convo)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}