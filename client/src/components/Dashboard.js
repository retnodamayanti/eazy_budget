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
  const totalIncome = 500;
  const balance = totalIncome - totalExpense;

  return (
    <div className="dashboard container mt-5">
      <div className="text-center mb-4">
        <h2>Welcome, {user?.username || 'Guest'}!</h2>
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h4 className="card-title">Total Income</h4>
              <p className="card-text">${totalIncome}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h4 className="card-title">Total Expense</h4>
              <p className="card-text">${totalExpense}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light">
              <div className="card-body">
                  <h4 className="card-title">Balance</h4>
                  <p className={`card-text ${balance === 0 ? 'red-text' : ''}`}>${balance}</p>
              </div>
          </div>
        </div>

      </div>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;
