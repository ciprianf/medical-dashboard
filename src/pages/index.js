import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = [
  { id: 1, test_name: 'Total Cholesterol', value: 180, unit: 'mg/dL', range_reference: '<200', status: 'Normal', category: 'Blood Tests' },
  { id: 2, test_name: 'Triglycerides', value: 220, unit: 'mg/dL', range_reference: '<150', status: 'High', category: 'Blood Tests' },
  { id: 3, test_name: 'Blood Glucose', value: 90, unit: 'mg/dL', range_reference: '70-99', status: 'Normal', category: 'Blood Tests' },
  { id: 4, test_name: 'Brain Total Volume', value: 1200, unit: 'cm³', range_reference: '1100-1400', status: 'Normal', category: 'MRI' },
  { id: 5, test_name: 'White Matter Hyperintensities', value: 3, unit: 'lesions', range_reference: '<5', status: 'Normal', category: 'MRI' },
  { id: 6, test_name: 'Hippocampal Volume', value: 7.2, unit: 'cm³', range_reference: '6.5-8.0', status: 'Normal', category: 'MRI' },
  { id: 7, test_name: 'Cardiac Ejection Fraction', value: 60, unit: '%', range_reference: '50-70', status: 'Normal', category: 'MRI' },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Normal":
      return "normal";
    default:
      return "abormal";
  }
};

function App() {
  const [bloodTests, setTests] = useState(mockData);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [filterCategory, setFilterCategory] = useState('All Tests');

  useEffect(() => {
    setTests(mockData);
    const labels = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const cholesterolValues = [195, 190, 188, 185, 182, 180];
    const glucoseValues = [92, 91, 89, 90, 88, 90];

    setChartData({
      labels,
      datasets: [
        {
          label: 'Total Cholesterol (mg/dL)',
          data: cholesterolValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
        {
          label: 'Blood Glucose (mg/dL)',
          data: glucoseValues,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
        },
      ],
    });
  }, []);

  // Handle dropdown change
  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  // Filter tests based on selected category
  const filteredTests = filterCategory === 'All Tests'
    ? bloodTests
    : bloodTests.filter(test => test.category === filterCategory);

  const allCategories = [...new Set(bloodTests.map(test => test.category))];

  return (
    <div className="container">
      <header>
        <h1>Health Insights Dashboard</h1>
      </header>
      <main>
        <h2>Test Results</h2>
        <div className="filter-container">
          <label htmlFor="category-filter">Filter by Category: </label>
          <select
            id="category-filter"
            value={filterCategory}
            onChange={handleFilterChange}
            className="filter-dropdown"
          >
            <option value="All Tests">All Tests</option>
            {allCategories.map(category => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>

        {allCategories.map(category => filteredTests.some(test => test.category === category) && (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            <div className="results">
              {filteredTests.filter(test => test.category === category).map(test => (
                <div key={test.id} className="result-card">
                  <h4>{test.test_name}</h4>
                  <p>Value: {test.value} {test.unit}</p>
                  <p>Range: {test.range_reference}</p>
                  <p className={`result-status ${getStatusClass(test.status)}`}>
                    Status: {test.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h2>Trends</h2>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Blood Test Trends Over Time' },
            },
          }}
        />
      </main>
      <footer>
        <p>Demo page by Alexandru Farcasanu</p>
      </footer>
    </div>
  );
}

export default App;
