import React, { useState, useEffect } from 'react';
import PromptBox from './components/PromptBox';
import AnswerWindow from './components/AnswerWindow';
import SourceInfo from './components/SourceInfo';
import FileUploader from './components/FileUploader';
import './styles/App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [source, setSource] = useState('');
  const [sourceFiles, setSourceFiles] = useState([]);

  useEffect(() => {
    fetchFileList().then(files => {
      setSourceFiles(files);
    });
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await fetch('http://localhost:5000/list-files');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parsing the JSON response
      return data; // The list of base filenames
    } catch (error) {
      console.error("Error fetching file list:", error);
      return [];
    }
  };

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:5000/parse_embed_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_type: 'url',
          source: 'https://example.com',
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setAnswer(responseData.answer);
      setSource(responseData.source);
    } catch (error) {
      console.error("Error on send:", error);
    }
  };

  const handleFileDrop = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/parse_and_embed', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setAnswer(responseData.answer);
      setSource(responseData.source);
    } catch (error) {
      console.error("Error handling file drop:", error);
    }
  };

  return (
    <div className="App">
      <PromptBox prompt={prompt} setPrompt={setPrompt} handleSend={handleSend} />
      <AnswerWindow answer={answer} />
       <SourceInfo sources={sourceFiles} />
      <FileUploader onFileDrop={handleFileDrop} />
    </div>
  );
}

export default App;
