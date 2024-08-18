const Campaign = require('../Models/campaign.js');
const Video = require('../Models/video.js');
const User = require('../Models/user.js');
const File = require('../Models/file');
const drive = require("../config/driveConfig.js");

// Créer une nouvelle campagne
exports.createCampaign = async (req, res) => {
  const { name, fileId } = req.body;


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
      // Étape 1 : Trouver le fichier et peupler les campagnes associées
      const file = await File.findById(fileId).populate('campaigns');
      if (!file) {
          return res.status(404).json({ message: 'File not found' });
      }

      // Étape 2 : Récupérer toutes les vidéos associées à ces campagnes
      const campaigns = file.campaigns;
      let allVideos = [];

      for (let campaign of campaigns) {
          const videos = await Video.find({ campaign: campaign._id });
          // Ajouter l'ID de la campagne, les approvals, la date et le nom de la campagne à chaque vidéo
          allVideos = allVideos.concat(videos.map(video => ({
              ...video.toObject(),
              campaignId: campaign._id,
              approvals: video.approvals,
              videoId: video._id,
              date: video.date,
              nameCampaign: campaign.name // Ajouter le nom de la campagne
          })));
      }

      if (allVideos.length === 0) {
          return res.status(404).send('Aucun fichier trouvé pour ces campagnes.');
      }

      // Étape 3 : Récupérer les fichiers depuis Google Drive
      const fileBuffers = []; // Tableau pour stocker les fichiers récupérés

      for (const video of allVideos) {
          try {
              const driveResponse = await drive.files.get({
                  fileId: video.fileDriveId,
                  alt: 'media'
              }, { responseType: 'arraybuffer' }); // Récupérer les fichiers en tant que buffer

              const contentType = driveResponse.headers['content-type'];
              const buffer = Buffer.from(driveResponse.data);

              fileBuffers.push({
                  buffer,
                  contentType,
                  fileName: video.name,
                  campaignId: video.campaignId, // Ajouter l'ID de la campagne
                  approvals: video.approvals, // Ajouter les approvals
                  date: video.date, // Ajouter la date
                  videoId: video.videoId,
                  nameCampaign: video.nameCampaign // Ajouter le nom de la campagne
              });

          } catch (error) {
              console.error(`Erreur lors de la récupération du fichier ${video.fileDriveId}`, error);
              continue; // Passer au fichier suivant en cas d'erreur
          }
      }

      // Étape 4 : Envoyer tous les fichiers au client
      res.status(200).json(fileBuffers.map(f => ({
          content: f.buffer.toString('base64'), // Convertir les buffers en base64 pour l'envoi JSON
          contentType: f.contentType,
          fileName: f.fileName,
          fileId: fileId,
          videoId: f.videoId,
          campaignId: f.campaignId, // Inclure l'ID de la campagne
          approvals: f.approvals, // Inclure les approvals
          date: f.date, // Inclure la date
          nameCampaign: f.nameCampaign // Inclure le nom de la campagne
      })));

  } catch (error) {
      console.error('Erreur lors de la récupération des fichiers de la campagne:', error);
      res.status(500).send('Erreur lors de la récupération des fichiers.');
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

    if(campaigns == null){
      res.status(400).json({message:"pas de campagne"});
    }else{
      res.status(200).json(campaigns);
    }
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

    if (!file) {
      return res.status(404).json({ message: 'File non trouvé' });
    }

    if (!file.campaigns || file.campaigns.length === 0) {
      return res.status(200).json({ message: 'Aucune campaign trouvée dans ce fichier' });
    }

    res.status(200).json(file.campaigns);
  } catch (error) {
    console.error('Erreur lors de la récupération des campaigns:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

