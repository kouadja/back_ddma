const express = require('express')
const {loginContoller,login,} = require("../Controllers/userController.js");

const router = express.Router()



router.post('/api/login',login);
router.post('/api/register',loginContoller)

module.exports = router;


