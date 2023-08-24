import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../utils/mutations';
import { GET_EXPENSES } from '../utils/queries';
import DatePicker from 'react-datepicker';

const ExpenseManager = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: GET_EXPENSES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({ variables: { input: { description, amount: parseFloat(amount), category, date: selectedDate.toISOString() } } });
      setDescription('');
      setAmount('');
      setCategory('');
      setSelectedDate(new Date());
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="expense-manager">
      <h2>Manage Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          pattern="\d*\.?\d*"
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
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseManager;
