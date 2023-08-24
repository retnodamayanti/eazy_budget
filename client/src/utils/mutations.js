import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation AddExpense($input: ExpenseInput!) {
    addExpense(input: $input) {
      _id
      description
      amount
      category
      date
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($expenseId: ID!, $input: ExpenseInput!) {
    updateExpense(expenseId: $expenseId, input: $input) {
      _id
      description
      amount
      category
      date
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation RemoveExpense($expenseId: ID!) {
    removeExpense(expenseId: $expenseId) {
      _id
      description
      amount
      category
      date
    }
  }
`;
