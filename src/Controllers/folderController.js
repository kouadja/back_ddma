// api/controllers/dossierController.js

const Campaign = require("../Models/campaign.js");
const File = require("../Models/file.js");
const Folder = require("../Models/folder.js");
const User = require("../Models/user.js");
const Video = require("../Models/video.js");

// Récupérer tous les dossiers
exports.getAllFolder = async (req, res) => {
/*   const { userId } = req.body;
  const files = await File.find()
  let folders = files.map(file => file.folder).filter((value, index, self) => self.indexOf(value) === index);
  return res.status(202).json(files); */
  try {
    const { userId } = req.body;

    

    // Trouver les fichiers appartenant à l'utilisateur
    const files = await File.find({ users: userId }).populate("folder");
    // Trouver l'utilisateur et peupler les rôles
    const user = await User.findById(userId).populate("roles");
   

    /* if (!files || files.length === 0) {
      return res.status(404).json({ message: "Pas de fichiers trouvés pour cet utilisateur." });
    } */

    // Extraire les dossiers des fichiers et éliminer les doublons
    let folders = files.map(file => file.folder).filter((value, index, self) => self.indexOf(value) === index);
    console.log(folders)
    // Vérifier si l'utilisateur a des dossiers
   /*  if (!folders || folders.length === 0) {
      return res.status(404).json({ message: "Pas de dossiers trouvés." });
    } */

    // Vérifier les rôles de l'utilisateur
    if (user && user.roles && user.roles[0].name === 'manager') {
      // Si l'utilisateur est un manager, obtenir tous les dossiers
      folders = await Folder.find();
      return res.status(201).json(folders);
    } else {
      // Sinon, retourner les dossiers associés aux fichiers trouvés
      return res.status(202).json(folders);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des dossiers:", error);
    res.status(500).json({ message: "Erreur serveur" });
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


exports.deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    // 1. Supprimer les Users et Videos associés aux Campaigns
    const campaigns = await Campaign.find({ fileId: { $in: await File.find({ folderId }).select('_id') } });
    const campaignIds = campaigns.map(campaign => campaign._id);

    await User.deleteMany({ campaignId: { $in: campaignIds } });
    await Video.deleteMany({ campaignId: { $in: campaignIds } });

    // 2. Supprimer les Campaigns associés aux Files
    await Campaign.deleteMany({ fileId: { $in: await File.find({ folderId }).select('_id') } });

    // 3. Supprimer les Files associés aux Folders
    await File.deleteMany({ folderId });

    // 4. Supprimer le Folder
    const result = await Folder.deleteOne({ _id: folderId });

    if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Folder et toutes les données associées supprimés avec succès' });
    } else {
        res.status(404).json({ message: 'Folder non trouvé' });
    }
} catch (error) {
    console.error('Erreur lors de la suppression du folder:', error);
    res.status(500).json({ message: 'Erreur serveur' });
}
};
