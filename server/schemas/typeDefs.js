const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Expense {
    _id: ID!
    description: String!
    amount: Float!
    category: String!
    date: String!
  }
  
  type Query {
    expenses: [Expense]!
  }
  
  input ExpenseInput {
    description: String!
    amount: Float!
    category: String!
    date: String!
  }
  
  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    addExpense(input: ExpenseInput!): Expense
    updateExpense(expenseId: ID!, input: ExpenseInput!): Expense
    removeExpense(expenseId: ID!): Expense
    login(email: String!, password: String!): Auth
  }  
  
  type Auth {
    token: String
    user: User
  }
  
  type User {
    _id: ID!
    username: String!
    email: String!
    savedExpenses: [Expense]
  }
`;

module.exports = typeDefs;
