const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [
    {
      name: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        default: ''
      }
    }
  ]
}, {
  timestamps: true
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;
