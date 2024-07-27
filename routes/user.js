var express = require('express');
var router = express.Router();
const userController = require('../controller/user')
// var bcrypt = require('bcrypt');

//signup
router.post('/signup', userController.SIGNUP);

//Login
router.post('/login', userController.LOGIN);


//Alluser
router.get('/all', userController.ALLUSER);

// update
router.patch('/update', userController.EDITUSER);


// delete
router.delete('/delete', userController.DELETETUSER);


module.exports = router;