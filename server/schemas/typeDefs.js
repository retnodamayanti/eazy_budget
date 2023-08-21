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
    addExpense(input: ExpenseInput!): Expense
    updateExpense(expenseId: ID!, input: ExpenseInput!): Expense
    removeExpense(expenseId: ID!): Expense
  }
  `;
  
  module.exports = typeDefs;