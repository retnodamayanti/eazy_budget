import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseForm = ({ mode, initialExpense, onSubmit, onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  useEffect(() => {
    if (mode === 'update' && initialExpense) {
      setDescription(initialExpense.description);
      setAmount(initialExpense.amount);
      setCategory(initialExpense.category);
      setDate(new Date(initialExpense.date));
    }
  }, [mode, initialExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!description.trim()) {
      setErrorMessage('Description is required.');
      return;
    }
    if (!amount || amount <= 0) {
      setErrorMessage('Amount is required and must be a positive value.');
      return;
    }
    if (!category) {
      setErrorMessage('Category is required.');
      return;
    }

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    onSubmit({
      description,
      amount: Number(amount),
      category,
      date: formattedDate
    });
    onClose();
  };


return (
  <div className="container px-5">
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} 
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => {
            if (e.target.value >= 0 || e.target.value === '') {
              setAmount(e.target.value);
            }
          }}
          onWheel={(e) => e.preventDefault()}
          min="0"
          title="Please enter a valid positive amount"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select 
          className="form-control" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
  
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <DatePicker 
          className="form-control"
          selected={date} 
          onChange={date => setDate(date)} 
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
        />
      </div>
      <div className="mt-3 d-flex flex-column flex-md-row justify-content-center align-items-center">
        <button type="submit" className="btn btn-grad mb-2 mb-md-0 me-md-2 flex-fill">{mode === 'add' ? 'Add' : 'Update'}</button>
        <button type="button" className="btn btn-grad flex-fill" onClick={onClose}>Cancel</button>
      </div>




    </form>
  </div>
);
};

export default ExpenseForm;
