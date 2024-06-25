// api/controllers/dossierController.js

const Folder = require("../Models/folder.js");

// Récupérer tous les dossiers
exports.getAllFolder = async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (err) {
    console.error('Erreur lors de la récupération des dossiers :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un nouveau dossier
exports.createFolder = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const newFolder = new Folder({ name, parent });
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (err) {
    console.error('Erreur lors de la création du dossier :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
