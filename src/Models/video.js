const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fileDriveId: {
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
}, { timestamps: true });

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
