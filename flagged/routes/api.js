const express = require('express');
const router = express.Router();

router.post('/send-message', (req, res) => {
  const { message } = req.body;

  // Handle the message and generate AI response
  const aiResponse = 'This is the AI response';

  res.json({ message: aiResponse });
});

module.exports = router;
