const express  = require('express')
const userController = require('../../controllers/user/user.controller')
const router = express.Router()
const {userSignin,userSignup} = userController()


router.post('/signup', userSignup);
router.post('/signin', userSignin);

module.exports = router;