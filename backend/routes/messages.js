
import express from 'express';
import Message from '../models/Message.js';
const router = express.Router();

// POST /messages - store a new message
router.post('/', async (req, res) => {
  try {
    console.log('Received message:', req.body); // Debug log
    const { name, email, content } = req.body;
    const message = new Message({ name, email, content });
    await message.save();
    console.log('Message saved to DB:', message); // Debug log
    res.status(201).json({ success: true, message: 'Message stored successfully.' });
  } catch (err) {
    console.error('Error saving message:', err); // Debug log
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /messages - get all messages (for developer)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
