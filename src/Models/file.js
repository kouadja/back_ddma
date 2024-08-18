const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },

  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: false,
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  }],
  users :[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',

  }]
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
