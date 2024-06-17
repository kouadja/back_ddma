const Project = require("../Models/project.js");
const User = require("../Models/user.js");

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




exports.getUserProjects = async (req, res) => {
  try {
    const {email} = req.body;

    // Trouver l'utilisateur et peupler les rôles
    const user = await User.find({email}).populate('roles');
   const userId= user._id
   console.log(user)
    
    // Récupérer les projets attribués à l'utilisateur
    const userProjects = await Project.find({ members: userId }).populate('members campaigns.files');

    // Vérifier les permissions de l'utilisateur
    const isAdmin = user[0].roles[0].name;
    console.log(isAdmin)
    if (isAdmin) {
      // Si l'utilisateur est un admin, retourner tous les projets
      const allProjects = await Project.find().populate('members campaigns.files');
      return res.json(allProjects);
    }

    // Retourner les projets attribués à l'utilisateur
    res.json(userProjects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({ message: 'Erreur interne du serveur 1' });
  }
};