// components/AnswerWindow.js
import React from 'react';
import '../styles/AnswerWindow.css';


function AnswerWindow({ answer }) {
  return (
    <div>
      <textarea readonly value={answer} />
    </div>
  );
}

export default AnswerWindow;
