
const { Op } = require('sequelize');
const { Friend } = require('../models');

module.exports = class FriendController {


    static async addFriend(req, res, next) {

        try {

            const friend = await Friend.findOne({
                where: {
                    userId1: req.user.id,
                    userId2: req.params.id,
                    status: "Friend"
                }
            })

            if (!friend) {
                const newFriend = await Friend.create({ userId1: req.user.id, userId2: req.params.id, status: "Friend" })
                res.status(201).json(newFriend)
            }

            // throw {name: "AlreadyFriend"}

        } catch (error) {
            console.log(error)
            next(error)
        }

    }


    static async friends(req, res, next) {
        try {
            const friends = await Friend.findAll({
                where: {
                    [Op.or]: {
                        userId1: req.user.id,
                        userId2: req.user.id,
                    }
                }
            })

            res.status(200).json(friends)

        } catch (error) {
            next(error)
        }
    }


}