const ConvoController = require('../controllers/ConvoController');
const FriendController = require('../controllers/FriendController');
const MessageController = require('../controllers/MessageController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router();



router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.use(authentication)

router.get("/users", UserController.users)  // list All Users


// ================= FRIENDS

router.post("/addFriend/:id", FriendController.addFriend)   // add new friend

router.get("/friends", FriendController.friends)  // get ALL FRIENDLISTS

router.post("/convo", ConvoController.newConvo) // create new Convo


// ================= MESSAGE + CONVO

router.get("/convo", ConvoController.getConvo)  // get all convo + friends

router.get("/convo/:id", ConvoController.getConvoById)  // get one convo + all messages

router.post("/message/:id", MessageController.newMessage)   // create new Message

router.use(errorHandler)



module.exports = router;