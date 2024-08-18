const express = require('express');
const router = express.Router();
const approvalController = require('../Controllers/approvalController.js');

router.post('/api/videos/:videoId/approval', approvalController.approveVideo);
router.get('/api/videos/:campaignId/approvals', approvalController.getApprovalsForVideo);
/* router.get('/api/videos/:campaignId/approvals', approvalController.getApprouveByCampaign); */

module.exports = router;
