const Campaign = require('../Models/campaign.js');
const Video = require('../Models/video.js');
const User = require('../Models/user.js');
const File = require('../Models/file');

// Créer une nouvelle campagne
exports.createCampaign = async (req, res) => {
  const { name, fileId } = req.body;
  console.log(fileId)

  try {
    const newCampaign = new Campaign({ name, file: fileId });
    await newCampaign.save();


    const file = await File.findById(fileId);
    console.log("file")
    console.log(file)
    file.campaigns.push(newCampaign._id);
    await file.save();

    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Ajouter des vidéos à une campagne
exports.addVideoToCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const { name, fileDriveId } = req.body;

  try {
    const video = new Video({ name, fileDriveId, campaign: campaignId });
    await video.save();

    const campaign = await Campaign.findById(campaignId);
    campaign.videos.push(video._id);
    await campaign.save();

    res.status(201).json(video);
  } catch (error) {
    console.error('Error adding video to campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
/* exports.getVideosInCampaign = async (req, res) => {
  const { campaignId } = req.params;

  try {
    const campaign = await Campaign.findById(campaignId).populate('videos',);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const videos = await Video.find({ campaign: campaignId });
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos in campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
} */
  exports.getVideosInFile = async (req, res) => {
    const { fileId } = req.params;
  
    try {
      // Trouver le fichier et peupler les campagnes associées
      const file = await File.findById(fileId).populate('campaigns');
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      // Récupérer toutes les vidéos associées à ces campagnes
      const campaigns = file.campaigns;
      let allVideos = [];
  
      for (let campaign of campaigns) {
        const videos = await Video.find({ campaign: campaign._id });
        allVideos = allVideos.concat(videos);
      }
  
      res.status(200).json(allVideos);
    } catch (error) {
      console.error('Error fetching videos in file:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Ajouter des membres à une campagne
exports.addUserToCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const { user } = req.body;

  try {
    const campaign = await Campaign.findById(campaignId);
    campaign.users.push(user);
    await campaign.save();

    res.status(200).json(campaign);
  } catch (error) {
    console.error('Error adding member to campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Obtenir toutes les campagnes avec les vidéos et les membres
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('videos')
      .populate('members');
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Obtenir toutes les campagnes dans un fichier
exports.getCampaignsInFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId).populate('campaigns');
    res.status(200).json(file.campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
