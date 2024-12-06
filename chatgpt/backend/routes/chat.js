const express = require('express');
const Chat = require('../models/Chat');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get chat history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving chat history!" });
  }
});

// Save chat messages
router.post('/', authMiddleware, async (req, res) => {
  const { messages } = req.body;
  try {
    const chat = new Chat({ userId: req.user.id, messages });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error saving chat!" });
  }
});

module.exports = router;
