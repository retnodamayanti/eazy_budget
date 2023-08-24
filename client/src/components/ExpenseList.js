import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXPENSES } from '../utils/queries'; 
import { useHandleAddExpense, useHandleUpdateExpense, useHandleRemoveExpense } from '../utils/expenseHandlers';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'
  const [currentExpense, setCurrentExpense] = useState(null); // For updating

  const handleAddExpense = useHandleAddExpense();
  const handleUpdateExpense = useHandleUpdateExpense();
  const handleRemoveExpense = useHandleRemoveExpense();
  
  const { loading, error, data } = useQuery(GET_EXPENSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const expenses = data.expenses;

  const showAddForm = () => {
    setFormMode('add');
    setCurrentExpense(null);
    setIsFormVisible(true);
  };

  const showUpdateForm = (expense) => {
    setFormMode('update');
    setCurrentExpense(expense);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setCurrentExpense(null);
  };

  const handleAddFormSubmit = (expenseDetails) => {
    handleAddExpense(expenseDetails);
    closeForm();
  };

  const handleUpdateFormSubmit = (expenseDetails) => {
    if (currentExpense) {
      handleUpdateExpense(currentExpense._id, expenseDetails);
      closeForm();
    }
  };

  return (
    <div className="expense-list">
      <h3>Expense List</h3>
      {isFormVisible && (
        <div>
          <h4>{formMode === 'add' ? 'Add Expense' : 'Update Expense'}</h4>
          <ExpenseForm
            mode={formMode}
            initialExpense={currentExpense}
            onSubmit={formMode === 'add' ? handleAddFormSubmit : handleUpdateFormSubmit}
            onClose={closeForm}
          />
        </div>
      )}
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            <div>Description: {expense.description}</div>
            <div>Amount: {expense.amount}</div>
            <div>Category: {expense.category}</div>
            <div>Date: {expense.date}</div>
            <div className="expense-buttons">
              <button onClick={() => showUpdateForm(expense)}>Update</button>
              <button onClick={() => handleRemoveExpense(expense._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={showAddForm}>Add Expense</button>
    </div>
  );
};

export default ExpenseList;
