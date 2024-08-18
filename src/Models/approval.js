const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprovalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  status: {
    type: String,
    enum: ['valid', 'invalid',"wait"],
    required: true,
  },
});


const Approval = mongoose.model('Approval', ApprovalSchema);
module.exports = Approval;
