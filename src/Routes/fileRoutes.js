const express = require('express');
const router = express.Router();
const {createFile,getFile,getFilesInFolder,addUserToFile,getUsersInFile} = require('../Controllers/fileController');

// Endpoint pour créer un nouveau fichier
router.post('/api/fichiers',createFile );
router.get('/api/fichiers',getFile );
router.get('/api/folders/:folderId', getFilesInFolder);
router.post('/api/files/:fileId/addUser', addUserToFile);
router.get('/api/files/:fileId/users', getUsersInFile);



module.exports = router;