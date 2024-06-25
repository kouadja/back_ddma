const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  content: {
    type: String, // You can adjust as per your needs (e.g., Buffer for binary files)
    required: true,
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true,
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  }],
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
