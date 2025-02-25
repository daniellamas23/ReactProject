import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar los componentes necesarios en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SessionChart = ({ data, options }) => {
  return (
    <div style={{ width: '900px', height: '500px', margin: '60px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Gráfico de Sesiones por Actividad</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SessionChart;



