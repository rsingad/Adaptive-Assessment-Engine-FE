const mongoose = require('mongoose');

const questionHistorySchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  questionText: String,
  topic: String,
  prerequisite: String,
  difficulty: Number,
  selectedAnswer: Number,
  correctAnswer: Number,
  correct: Boolean,
  abilityBefore: Number,
  abilityAfter: Number,
  reason: String,
  answeredAt: {
    type: Date,
    default: Date.now
  }
});

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest_user'
  },
  subject: {
    type: String,
    default: 'DSA'
  },
  ability: {
    type: Number,
    default: 0.50
  },
  currentQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed'],
    default: 'in_progress'
  },
  questionHistory: [questionHistorySchema],
  totalQuestions: {
    type: Number,
    default: 10
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
