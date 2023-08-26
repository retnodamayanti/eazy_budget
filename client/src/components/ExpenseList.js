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
    <div className="expense-list container px-5">
      <h3 className="display-4 lh-1 mb-4">Expense List</h3>
      {isFormVisible && (
        <div className="bg-light p-4 rounded">
          <h4 className="fw-bold">{formMode === 'add' ? 'Add Expense' : 'Update Expense'}</h4>
          <ExpenseForm
            mode={formMode}
            initialExpense={currentExpense}
            onSubmit={formMode === 'add' ? handleAddFormSubmit : handleUpdateFormSubmit}
            onClose={closeForm}
          />
        </div>
      )}
      <ul className="list-group mt-4">
        {expenses.map(expense => (
          <li key={expense._id} className="list-group-item">
            <div><strong>Description:</strong> {expense.description}</div>
            <div><strong>Amount:</strong> ${expense.amount}</div>
            <div><strong>Category:</strong> {expense.category}</div>
            <div><strong>Date:</strong> {expense.date}</div>
            <div className="expense-buttons mt-2">
              <button className="btn btn-warning btn-sm me-2" onClick={() => showUpdateForm(expense)}>Update</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveExpense(expense._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-4" onClick={showAddForm}>Add Expense</button>
    </div>
  );
};

export default ExpenseList;
