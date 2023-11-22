
const { Friend } = require('../models');

module.exports = class FriendController {


    // ===>  /addFriend/:id
    static async addFriend (req, res, next) {
        const friend = await Friend.create({userId1: req.params.id, userId2: req.user.id})
        res.status(201).json(friend)
    }


   
      

}