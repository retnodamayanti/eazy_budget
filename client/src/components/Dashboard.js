import React from 'react';
import ExpenseList from './ExpenseList.js';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h2>Welcome, {user?.username || 'Guest'}!</h2>
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
