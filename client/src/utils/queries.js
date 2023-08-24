import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      _id
      description
      amount
      category
      date
    }
  }
`;
