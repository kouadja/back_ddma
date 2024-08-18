const express = require('express')
const {loginContoller,login,getUser,} = require("../Controllers/userController.js");

const router = express.Router()



router.post('/api/login',login);
router.get('/api/getuser',getUser);

router.post('/api/register',loginContoller)

module.exports = router;


