// components/SourceInfo.js
import React from 'react';
import '../styles/SourceInfo.css';

function SourceInfo({ sources }) {
  return (
    <div>
      <h3>Sources:</h3>
      <ul>
        {sources.map((source, index) => (
          <li key={index}>Source: {source}</li>
        ))}
      </ul>
    </div>
  );
}

export default SourceInfo;
