const express = require('express');
const router = express.Router();
const approvalController = require('../Controllers/approvalController.js');

router.post('/api/videos/:videoId/approvals', approvalController.approveVideo);
router.get('/api/videos/:videoId/approvals', approvalController.getApprovalsForVideo);

module.exports = router;
