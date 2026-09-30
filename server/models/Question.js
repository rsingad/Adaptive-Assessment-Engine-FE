const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    default: 'DSA' // e.g. DSA, Operating Systems, Web Development
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number, // 0-based index of the correct option
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  prerequisite: {
    type: String,
    default: null
  },
  difficulty: {
    type: Number, // Value from 0.1 (Easy) to 1.0 (Expert)
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
