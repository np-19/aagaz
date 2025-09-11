const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'counselor', 'parent'],
    default: 'student'
  },
  grade: {
    type: String,
    enum: ['9th', '10th', '11th', '12th', 'undergraduate', 'postgraduate', 'other'],
    required: function() {
      return this.role === 'student';
    }
  },
  profileImage: {
    type: String
  },
  preferences: {
    interests: [String],
    careerGoals: [String],
    subjects: [String]
  },
  quizResults: [{
    quizId: String,
    score: Number,
    results: Object,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  savedColleges: [{
    collegeId: String,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  savedCareers: [{
    careerId: String,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
