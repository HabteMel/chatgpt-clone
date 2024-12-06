const mongoose = require('mongoose');

const ChatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userMessage: String,
  botMessage: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatHistory', ChatHistorySchema);
