const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  file: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = Campaign;
