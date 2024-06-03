const express = require('express')
const {loginContoller} = require("../Controllers/userController.js");


const router = express.Router()


router.post('/api/login',loginContoller)

module.exports = router;