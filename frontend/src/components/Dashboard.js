import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { fetchData, updateFilters } from '../store/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, filters } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchData(filters));
  }, [dispatch, filters]);

  // Your filter input handlers

  const chartData = {
    labels: data.map(item => item.title),
    datasets: [
      {
        label: 'Intensity',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data.map(item => item.intensity),
      },
    ],
  };

  return (
    <div>
      {/* Your filter input elements */}
      {/* e.g., <input type="text" onChange={(e) => dispatch(updateFilters({ ...filters, end_year: e.target.value }))} /> */}

      <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
    </div>
  );
};

export default Dashboard;
