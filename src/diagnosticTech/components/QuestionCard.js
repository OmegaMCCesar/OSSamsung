import React from 'react';

const QuestionCard = ({ question, options, onAnswer }) => {
  return (
    <div className="question-card">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
