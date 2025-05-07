import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = [
  { test: 'Total Cholesterol', value: 180, unit: 'mg/dL', range: '<200', status: 'Normal' },
  { test: 'Blood Glucose', value: 90, unit: 'mg/dL', range: '70-99', status: 'Normal' },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Cholesterol (mg/dL)',
      data: [190, 185, 182, 180, 178],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
    },
  ],
};

function App() {
  return (
    <div className="container">
      <header>
        <h1>Health Insights Dashboard</h1>
      </header>
      <main>
        <h2>Latest Test Results</h2>
        <div className="results">
          {mockData.map((item, index) => (
            <div key={index} className="result-card">
              <h3>{item.test}</h3>
              <p>Value: {item.value} {item.unit}</p>
              <p>Range: {item.range}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
        </div>
        <h2>Trends</h2>
        <Line data={chartData} />
      </main>
      <footer>
        <p>Demo project by [Your Name]</p>
      </footer>
    </div>
  );
}

export default App;