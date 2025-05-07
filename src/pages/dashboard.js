import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data (replace with API fetch if applicable)
const mockData = [
  { id: 1, test_name: 'Total Cholesterol', value: 180, unit: 'mg/dL', range_reference: '<200', status: 'Normal' },
  { id: 2, test_name: 'Blood Glucose', value: 90, unit: 'mg/dL', range_reference: '70-99', status: 'Normal' },
];

function App() {
  const [bloodTests, setBloodTests] = useState(mockData);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Simulate API fetch or use mock data
    setBloodTests(mockData);

    // Prepare chart data (example: cholesterol over time)
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const values = [190, 185, 182, 180, 178]; // Mock cholesterol values
    setChartData({
      labels,
      datasets: [
        {
          label: 'Cholesterol (mg/dL)',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
      ],
    });

    // If using an API, uncomment and configure:
    /*
    axios.get('https://your-api-endpoint.com/blood-tests/')
      .then(response => {
        setBloodTests(response.data);
        const labels = response.data.map(test => test.created_at);
        const values = response.data
          .filter(test => test.test_name === 'Total Cholesterol')
          .map(test => test.value);
        setChartData({
          labels: labels.slice(-5),
          datasets: [{
            label: 'Cholesterol (mg/dL)',
            data: values.slice(-5),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          }],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
    */
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Health Insights Dashboard</h1>
      </header>
      <main>
        <h2>Latest Test Results</h2>
        <div className="results">
          {bloodTests.map(test => (
            <div key={test.id} className="result-card">
              <h3>{test.test_name}</h3>
              <p>Value: {test.value} {test.unit}</p>
              <p>Range: {test.range_reference}</p>
              <p>Status: {test.status}</p>
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