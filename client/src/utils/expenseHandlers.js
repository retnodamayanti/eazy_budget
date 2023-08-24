import { useMutation } from '@apollo/client';
import { ADD_EXPENSE, UPDATE_EXPENSE, REMOVE_EXPENSE } from './mutations';
import { GET_EXPENSES } from '../utils/queries';

export const useHandleAddExpense = () => {
    const [addExpense] = useMutation(ADD_EXPENSE, {
      refetchQueries: [{ query: GET_EXPENSES }],
    });
  
    return (inputDetails) => {
      addExpense({ variables: { input: inputDetails } })
        .then(response => {
          console.log('Expense added:', response.data.addExpense);
        })
        .catch(error => {
          console.error('Error adding expense:', error);
        });
    };
  };
  
  export const useHandleUpdateExpense = () => {
    const [updateExpense] = useMutation(UPDATE_EXPENSE, {
      refetchQueries: [{ query: GET_EXPENSES }],
    });
  
    return (expenseId, updatedDetails) => {
      updateExpense({ variables: { expenseId, input: updatedDetails } })
        .then(response => {
          console.log('Expense updated:', response.data.updateExpense);
        })
        .catch(error => {
          console.error('Error updating expense:', error);
        });
    };
  };
  
  

export const useHandleRemoveExpense = () => {
    const [removeExpense] = useMutation(REMOVE_EXPENSE, {
        refetchQueries: [{ query: GET_EXPENSES }],
      });
      

  return (expenseId) => {
    // Show confirmation prompt
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (!confirmDelete) return;

    removeExpense({ variables: { expenseId } })
      .then(response => {
        console.log('Expense removed:', response.data.removeExpense);
        // Refresh list or handle UI updates
      })
      .catch(error => {
        console.error('Error removing expense:', error);
      });
  };
};
