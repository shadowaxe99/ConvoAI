const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/api/sendMessage', (req, res) => {
  const { message } = req.body;
  // Handle the message and generate a response from the Investor CRM Outreach Tool
  const response = {
    text: `You sent: ${message.text}`,
  };
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
