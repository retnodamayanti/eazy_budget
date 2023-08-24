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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <DatePicker 
        selected={date} 
        onChange={date => setDate(date)} 
        dateFormat="yyyy-MM-dd"
      />
      <button type="submit">{mode === 'add' ? 'Add' : 'Update'} Expense</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default ExpenseForm;
