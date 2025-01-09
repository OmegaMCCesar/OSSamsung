import React from 'react';

const ResultScreen = ({ location }) => {
  const { answers } = location.state;

  return (
    <div className="result-screen">
      <h2>Diagnóstico Final</h2>
      <div className="diagnosis">
        {answers.map((answer, index) => (
          <p key={index}>
            {answer.question}: {answer.answer}
          </p>
        ))}
      </div>
      <h3>Posible Causa:</h3>
      <p>[Aquí iría la causa]</p>
      <h3>Recomendación:</h3>
      <p>[Instrucción de reparación]</p>
    </div>
  );
};

export default ResultScreen;
