
const express = require('express'); // Importing the Express framework
const { spawn } = require('child_process'); // For invoking Python scripts
const app = express(); // Creating an Express application
const port = 5000; // Defining the port number

// Cache to store responses for previously processed queries
const cache = new Map();
const MAX_CACHE_SIZE = 100; // Limit for cache size

app.use(express.json()); // Middleware to parse JSON requests

// Endpoint to handle messages and invoke the AI agent
app.post('/api/sendMessage', (req, res) => {
  // ... logic here ...
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const { spawn } = require('child_process');
const app = express();
const port = 5000;

// Cache to store responses for previously processed queries
const cache = new Map();
const MAX_CACHE_SIZE = 100; // Limit for cache size

app.use(express.json());

app.post('/api/sendMessage', (req, res) => {
  const { message } = req.body;

  
    // Check if the response is already cached
    if (cache.has(message.text)) {
        return res.json({ text: cache.get(message.text) });
    }

    // Call the AI agent Python script
    const ai_agent_response = call_python_script('ai_agent_script.py', message.text);
    cache.set(message.text, ai_agent_response); // Cache the response
    return res.json({ text: ai_agent_response });
    
  if (cache.has(message.text)) {
    return res.json({ text: cache.get(message.text) });
  }

  // Spawn a child process to call the Python AI agent script
  const aiProcess = spawn('python3', ['/mnt/data/extracted/flagged/ai_agent_script.py']);
  aiProcess.stdin.write(message.text);
  aiProcess.stdin.end();

  // Collect data from the AI agent's stdout
  let ai_response_text = '';
  aiProcess.stdout.on('data', (data) => {
    ai_response_text += data.toString();
  });

  // Spawn another child process to call the Python NLP processing script
  aiProcess.stdout.on('end', () => {
    const nlpProcess = spawn('python3', ['/mnt/data/extracted/flagged/nlp_processing_script.py']);
    nlpProcess.stdin.write(ai_response_text);
    nlpProcess.stdin.end();

    // Collect data from the NLP processing script's stdout
    let nlp_response_text = '';
    nlpProcess.stdout.on('data', (data) => {
      nlp_response_text += data.toString();
    });

    // Send the final response and update the cache
    nlpProcess.stdout.on('end', () => {
      const response = { text: nlp_response_text };
      res.json(response);

      // Update the cache
      if (cache.size >= MAX_CACHE_SIZE) {
        cache.delete(cache.keys().next().value); // Remove the oldest entry
      }
      cache.set(message.text, nlp_response_text);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
