import React, { useState } from 'react';
import { diagnosticData } from '../utils/data';
import QuestionCard from '../components/QuestionCard';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DiagnosticScreen.module.css';

const DiagnosticScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const question = diagnosticData["lavadora_no_centrifuga"][currentStep];

  const handleAnswer = (answer) => {
    const newAnswer = { question: question.question, answer };
    setAnswers(prevAnswers => [...prevAnswers, newAnswer]);

    const nextStep = question.nextStep[answer];

    if (nextStep === "fin_diagnostico") {
      navigate('/result', { state: { answers: [...answers, newAnswer] } });
    } else {
      const nextQuestionIndex = diagnosticData["lavadora_no_centrifuga"].findIndex(q => q.id === nextStep);

      if (nextQuestionIndex !== -1) {
        setCurrentStep(nextQuestionIndex);
      } else {
        console.error('Siguiente paso no encontrado:', nextStep);
      }
    }
  };

  return (
    <div className={styles.diagnosticScreen}>
      <h2 className={styles.diagnosticTitle}>Diagnóstico de Lavadora</h2>
      <div className={styles.diagnosticContainer}>
        {question ? (
          <QuestionCard
            question={question.question}
            options={question.options}
            onAnswer={handleAnswer}
          />
        ) : (
          <p>Pregunta no encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default DiagnosticScreen;




