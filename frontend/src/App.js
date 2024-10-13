import React, { useState } from 'react';
import QRCodeDisplay from './components/QRCodeDisplay';
import Question from './components/Question';
import './App.css';

const App = () => {
  const [showQRCode, setShowQRCode] = useState(true);
  const [message, setMessage] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);  // Track current question

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setMessage(`Congratulations, ${playerName}! Your answer is correct.`);
      setShowQRCode(false);
      setTimeout(() => {
        setShowQRCode(true);
        setMessage('');
      }, 3000);
    } else {
      setMessage('Wrong answer. Try again!');
    }
  };

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleQuestionChange = (question) => {
    setCurrentQuestion(question);  // Update current question for QR code
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to KBC</h1>

      {/* Player's Name Input Section */}
      <div style={{ marginBottom: '30px' }}>
        <label htmlFor="playerName" style={{ marginRight: '10px' }}>Enter your name: </label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>

      {/* QR Code Section */}
      <div style={{ marginBottom: '30px' }}>
        {showQRCode && currentQuestion && (
          <QRCodeDisplay data={`http://localhost:5000/question/${encodeURIComponent(currentQuestion.question)}`} />
        )}
      </div>

      {/* Question and Message Section */}
      <Question onAnswer={handleAnswer} onQuestionChange={handleQuestionChange} />
      {message && <h3>{message}</h3>}
    </div>
  );
};

export default App;
