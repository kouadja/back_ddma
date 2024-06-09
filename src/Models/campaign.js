const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
