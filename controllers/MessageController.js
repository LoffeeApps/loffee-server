const { Message } = require('../models');


module.exports = class MessageController {


    static async newMessage (req, res, next) {
        try {
            const message = await Message.create({
                message: req.body.message,
                userId1: req.user.id,
                conversationId: req.params.id
            })
            res.status(201).json(message)
        } catch (error) {
            next(error)
        }
    }

}