const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  approvals: [{
    type: Schema.Types.ObjectId,
    ref: 'Approval',
  }],
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
