const express = require('express');
const router = express.Router();
const dossierController = require('../Controllers/folderController.js');

// Route to get all dossiers
router.post('/api/dossiers', dossierController.getAllFolder);

// Route to create a new dossier
router.post('/api/dossiers', dossierController.createFolder);


module.exports = router;
