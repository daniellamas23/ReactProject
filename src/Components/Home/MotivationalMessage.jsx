import React from 'react';

const MotivationalMessage = ({ tiempoHoy, tiempoAyer }) => {
  const mensajeMotivador = tiempoHoy > tiempoAyer ? "¡Bien hecho!" : "¡Que no decaiga!";
  return (
    <div>
      <h3>Evolución Personal</h3>
      <p><strong>{mensajeMotivador}</strong></p>
    </div>
  );
};

export default MotivationalMessage;
