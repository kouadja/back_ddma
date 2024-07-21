// api/controllers/dossierController.js

const File = require("../Models/file.js");
const Folder = require("../Models/folder.js");
const User = require("../Models/user.js");

// Récupérer tous les dossiers
exports.getAllFolder = async (req, res) => {
  
  
  
  
  try {
    const {userId} = req.body
    const files = await File.find({ users: userId }).populate("folder");
    const user = await User.findById(userId).populate("roles");

    const folders = files.map(file => file.folder).filter((value, index, self) => self.indexOf(value) === index);
console.log(folders)
/*     console.log(files) */

if(user.roles[0].name== "manager"){
  const folders = await Folder.find();
  res.status(201).json(folders);
}else{
  console.log(files)
  res.status(202).json(folders);
}


/*     const folder = await Folder.find({ files: { $in: fileIds } }).populate({
      path: 'files',
      populate: { path: 'users' } // Populate users in files
    }); */
/*     console.log(folder) */


   
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

