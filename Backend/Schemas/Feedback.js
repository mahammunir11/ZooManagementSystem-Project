const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  visitorName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);