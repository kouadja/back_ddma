const express = require('express')
const {uploadFile,findByName,getFile,getFilesByCampaign} = require('../Controllers/driveController.js')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router()




/* router.get('/download/:fileId', downloadFile); */
router.post("/api/upload",upload.single('file'),uploadFile)
router.get("/api/drive_ressource_findone",findByName)
router.get("/api/get_file/:id",getFile)
router.get('/api/campaign/:campaignId/filesToDrive', getFilesByCampaign);


module.exports = router;

