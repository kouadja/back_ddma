const Approval = require('../Models/approval.js');
const Video = require('../Models/video.js');
const User = require('../Models/user.js');
const Campaign = require('../Models/campaign.js');

// Approuver ou désapprouver une vidéo
exports.approveVideo = async (req, res) => {
  const { videoId } = req.params;
  const { userId, status } = req.body;



  try {
    // Vérifier si la vidéo existe avant de continuer
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Créer et sauvegarder l'approbation
    const approval = new Approval({ userId: userId, videoId: videoId, status });
    await approval.save();

    // Ajouter l'approbation à la vidéo
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
  const { campaignId } = req.params;

  try {
    const approvals = await Video.find({ campaign: campaignId })
      .populate('approvals');
    res.status(200).json(approvals);
  } catch (error) {
    console.error('Error fetching approvals:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getApprouveByCampaign =async (req,res)=>{
 /*  const { campaignId } = req.params;
  try { 
    const approvals = await Video.find({ campaignId: campaignId })
      .populate('approvals');
    res.status(200).json(approvals);
  } catch (error) {
    console.error('Error fetching approvals:', error);
    res.status(500).json({ message: 'Server error' });
  }
 */
}
