const express = require('express');
const router = express.Router();
const {createFile,getFile,getFilesInFolder} = require('../Controllers/fileController');

// Endpoint pour créer un nouveau fichier
router.post('/api/fichiers',createFile );
router.get('/api/fichiers',getFile );
router.get('/api/folders/:folderId', getFilesInFolder);



module.exports = router;