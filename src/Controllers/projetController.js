const Project = require("../Models/project.js");

exports.createProject = async (req, res) => {
  try {
    const { name, description, folderName, campaigns, members } = req.body;

    const newProject = new Project({
      name,
      description,
      folderName,
      campaigns,
      members
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('members');
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Ajoutez d'autres actions de contrôleur selon vos besoins


// Ajoutez d'autres actions de contrôleur selon vos besoins
