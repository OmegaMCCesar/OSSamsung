export const diagnosticData = {
    "lavadora_no_centrifuga": [
      {
        id: "step1",
        question: "¿La bomba de drenado le llega el voltaje necesario?",
        options: ["Sí", "No"],
        nextStep: {
          "Sí": "step2",
          "No": "step3"
        }
      },
      {
        id: "step2",
        question: "¿La bomba de drenado presenta obstrucciones?",
        options: ["Sí", "No"],
        nextStep: {
          "Sí": "step4",
          "No": "step5"
        }
      },
      {
        id: "step3",
        question: "¿El interruptor de la puerta está conectado?",
        options: ["Sí", "No"],
        nextStep: {
          "Sí": "fin_diagnostico",
          "No": "step6"
        }
      },
      {
        id: "step4",
        result: "Despeje la obstrucción de la bomba."
      },
      {
        id: "step5",
        result: "La bomba está dañada físicamente, considere reemplazarla."
      },
      {
        id: "step6",
        result: "Conecte el interruptor de la puerta."
      }
    ]
  };
  
  
  