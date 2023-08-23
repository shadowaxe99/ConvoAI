
import React, { useState } from 'react'; // Importing React and useState hook
import './App.css'; // Importing styling

function App() {
  // State variables for managing message and response
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  // Function to send the message to the server
  const sendMessage = async () => {
    // ... logic here ...
  };

  // Rendering the input field, send button, and response
  return (
    <div className="App">
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>{response}</div>
    </div>
  );
}

export default App; // Exporting the App component
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    });
    const data = await res.json();
    setResponse(data.text);
  };

  return (
    <div className="App">
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>{response}</div>
    </div>
  );
}

export default App;
