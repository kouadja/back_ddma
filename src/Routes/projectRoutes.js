const projectController = require("../Controllers/projetController.js")
const express = require('express')
const { verifyToken, checkPermission ,checkRole} = require('../Middlewares/checkPermission.js');

const router = express.Router()

router.get('/api/projects', checkPermission("view_projects"), projectController.getProjects);
router.post('/api/projects', checkPermission("view_projects"),checkRole("manager"), projectController.createProject);
module.exports = router;
