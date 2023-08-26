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
      <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-grad-add mt-4" onClick={showAddForm}>Add Expense</button>
      </div>
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
      <h3 className="display-4 lh-1 mb-4 mt-4">Expense List</h3>
      <ul className="list-group mt-4">
    {expenses.length === 0 ? (
        <li className="list-group-item py-3 text-center">
            You don't have any expenses.
        </li>
    ) : (
        expenses.map(expense => (
            <li key={expense._id} className="list-group-item py-3 hover-effect">
                <div className="row">
                    <div className="col-md-9">
                        <div><strong>Description:</strong> {expense.description}</div>
                        <div><strong>Amount:</strong> ${expense.amount}</div>
                        <div><strong>Category:</strong> {expense.category}</div>
                        <div><strong>Date:</strong> {expense.date}</div>
                    </div>
                    <div className="col-md-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-end">
                        <button className="btn btn-grad btn-sm" onClick={() => showUpdateForm(expense)}>Update</button>
                        <button className="btn btn-grad btn-sm" onClick={() => handleRemoveExpense(expense._id)}>Remove</button>
                    </div>
                </div>
            </li>
        ))
    )}
</ul>
    </div>
  );
  
};

export default ExpenseList;
