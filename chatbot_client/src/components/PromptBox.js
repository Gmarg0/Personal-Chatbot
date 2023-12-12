// components/PromptBox.js
import React from 'react';
import '../styles/PromptBox.css';

function PromptBox({ prompt, setPrompt, handleSend }) {
  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt here..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default PromptBox;
