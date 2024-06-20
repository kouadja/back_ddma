const express = require('express')
const {loginContoller,login,} = require("../Controllers/userController.js");
const {uploadFile,findByName} = require('../Controllers/driveController.js')
const multer = require('multer');
const router = express.Router()


const upload = multer({ dest: 'uploads/' });
router.post('/api/login',login);
router.post('/api/register',loginContoller)
router.post("/api/upload",upload.single('file'),uploadFile)
router.get("/drive_ressource_findone",findByName)
module.exports = router;

