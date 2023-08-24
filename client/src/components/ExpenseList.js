import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXPENSES } from '../utils/queries'; 
import { useHandleAddExpense, useHandleUpdateExpense, useHandleRemoveExpense } from '../utils/expenseHandlers';


const ExpenseList = () => {
  const handleAddExpense = useHandleAddExpense();
  const handleUpdateExpense = useHandleUpdateExpense();
  const handleRemoveExpense = useHandleRemoveExpense();
  const { loading, error, data } = useQuery(GET_EXPENSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const expenses = data.expenses;

  return (
    <div className="expense-list">
      <h3>Expense List</h3>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            <div>Description: {expense.description}</div>
            <div>Amount: {expense.amount}</div>
            <div>Category: {expense.category}</div>
            <div>Date: {expense.date}</div>
            <div className="expense-buttons">
              <button onClick={() => handleUpdateExpense(expense)}>Update</button>
              <button onClick={() => handleRemoveExpense(expense._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default ExpenseList;
