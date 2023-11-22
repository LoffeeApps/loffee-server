const FriendController = require('../controllers/FriendController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.use(authentication)

router.post("/addFriend/:id", FriendController.addFriend)

router.get("/friends", FriendController.friends)

module.exports = router;