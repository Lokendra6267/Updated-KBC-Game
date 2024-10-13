import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Question.css';

const Question = ({ onAnswer, onQuestionChange }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/question');
      setQuestion(response.data);
      setAnswered(false);
      setSelectedAnswer(null);
      onQuestionChange(response.data);  // Inform parent (App.js) of the new question
    } catch (error) {
      console.error('Error fetching the question', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setAnswered(true);
    onAnswer(selectedOption === question.answer);
  };

  const handleNext = () => {
    fetchQuestion();
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <h2>{question.question}</h2>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`option-button ${
              answered
                ? option === question.answer
                  ? 'correct'
                  : option === selectedAnswer
                  ? 'wrong'
                  : 'disabled'
                : ''
            }`}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && <button onClick={handleNext} style={{ backgroundColor: 'GrayText', color: 'white' }}>Next Question</button>}
    </div>
  );
};

export default Question;
