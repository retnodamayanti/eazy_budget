import React from 'react';
import ExpenseList from './ExpenseList.js';
import { useQuery } from '@apollo/client';
import { GET_EXPENSES } from '../utils/queries';


const Dashboard = ({ user }) => {
  const { loading, error, data } = useQuery(GET_EXPENSES, {
    fetchPolicy: "network-only"
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const expenses = data.expenses;
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.username || 'Guest'}!</h2>
      <h3>Total Expense: ${totalExpense}</h3>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;
