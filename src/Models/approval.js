const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprovalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  status: {
    type: String,
    enum: ['valid', 'invalid'],
    required: true,
  },
});

const Approval = mongoose.model('Approval', ApprovalSchema);
module.exports = Approval;
