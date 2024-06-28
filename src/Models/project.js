const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, enum: ['video', 'pdf'], required: true },
  url: { type: String, required: true }
});

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  files: [fileSchema]
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  folderName: { type: String, required: true },
  campaigns: [campaignSchema],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
