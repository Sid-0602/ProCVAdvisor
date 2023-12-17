const express = require("express");
const router = express.Router();
const User = require("../models/users");
const userController = require("../controller/user-controller");

router.get('/get-users',userController.getUsers);
router.get('/get-user/:id',userController.getUser);
router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router;