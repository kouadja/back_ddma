const express = require('express');
const router = express.Router();
const campaignController = require('../Controllers/campaignController');

router.post('/api/campaigns', campaignController.createCampaign);
router.post('/api/campaigns/:campaignId/user', campaignController.addUserToCampaign);
/* router.get('/api/campaigns', campaignController.getAllCampaigns); */
router.get('/api/files/:fileId/campaigns', campaignController.getCampaignsInFile);

router.post('/api/campaigns/:campaignId/videos', campaignController.addVideoToCampaign);
router.get('/api/files/:fileId/videos', campaignController.getVideosInFile);


module.exports = router;

