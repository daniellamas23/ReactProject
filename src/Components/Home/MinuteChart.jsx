import React from 'react';
import { Bar } from 'react-chartjs-2';

const MinuteChart = ({ data, options }) => {
  return (
    <div style={{ width: '900px', height: '500px', margin: '60px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Minutos de Ejercicio en los Últimos 7 Días</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MinuteChart;

