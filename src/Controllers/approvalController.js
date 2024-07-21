const Approval = require('../Models/approval.js');
const Video = require('../Models/video.js');
const User = require('../Models/user.js');

// Approuver ou désapprouver une vidéo
exports.approveVideo = async (req, res) => {
  const { videoId } = req.params;
  const { userId, status } = req.body;

  try {

    const approval = new Approval({ user: userId, video: videoId, status });
    await approval.save();

    const video = await Video.findById(videoId);
    video.approvals.push(approval._id);
    await video.save();

    res.status(201).json(approval);
  } catch (error) {
    console.error('Error approving video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Obtenir les approbations d'une vidéo
exports.getApprovalsForVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    const approvals = await Approval.find({ video: videoId })
      .populate('user');
    res.status(200).json(approvals);
  } catch (error) {
    console.error('Error fetching approvals:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
