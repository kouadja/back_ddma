const Project = require("../Models/project.js");

exports.createCampaign = async (req, res) => {
  try {
    const { projectId, name, description, files } = req.body;
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const newCampaign = { name, description, files };
    project.campaigns.push(newCampaign);
    
    await project.save();
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const { projectId } = req.params;
    
    const project = await Project.findById(projectId).populate('campaigns');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project.campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const { projectId, campaignId } = req.params;
    const { name, description, files } = req.body;
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const campaign = project.campaigns.id(campaignId);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    campaign.name = name || campaign.name;
    campaign.description = description || campaign.description;
    campaign.files = files || campaign.files;
    
    await project.save();
    
    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { projectId, campaignId } = req.params;
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const campaign = project.campaigns.id(campaignId);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    campaign.remove();
    
    await project.save();
    
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
