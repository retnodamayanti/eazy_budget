import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpenseForm = ({ mode, initialExpense, onSubmit, onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    if (mode === 'update' && initialExpense) {
      setDescription(initialExpense.description);
      setAmount(initialExpense.amount);
      setCategory(initialExpense.category);
    }
  }, [mode, initialExpense]);

const handleSubmit = (e) => {
    e.preventDefault();
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
          onChange={(e) => setAmount(e.target.value)}
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
  
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <DatePicker 
          className="form-control"
          selected={date} 
          onChange={date => setDate(date)} 
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-primary me-2">{mode === 'add' ? 'Add' : 'Update'} Expense</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  </div>
);
};

export default ExpenseForm;
