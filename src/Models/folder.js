const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  contenu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fichier',
  }],
});



const Folder = mongoose.model('Folder', FolderSchema);
module.exports = Folder;
