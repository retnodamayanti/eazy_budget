const { AuthenticationError } = require('apollo-server-express');
const { Expense } = require('../models'); 
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
  Query: {
    expenses: async (parent, args, context) => {
      if (context.user) {
        const expenses = await Expense.find({ userId: context.user._id });
        return expenses;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      console.log(`Attempting login for email: ${email}`);
      
      const user = await User.findOne({ email });
      console.log('User found:', user);
  
      if (!user) {
        console.log('User not found');
        throw new AuthenticationError('User not found');
      }
  
      const correctPassword = await user.isCorrectPassword(password);
      console.log(`Correct password for user ${user.username}: ${correctPassword}`);
  
      if (!correctPassword) {
        console.log(`Incorrect password for user: ${user.username}`);
        throw new AuthenticationError('Incorrect password');
      }
  
      const token = signToken(user); 
      console.log(`Login successful for user ${user.username}`);
      return { token, user };
    },  
    
    signup: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error(error);
        throw new AuthenticationError('Signup failed');
      }
    },
  
    addExpense: async (parent, { input }, context) => {
      if (context.user) {
        const expense = await Expense.create({ ...input, userId: context.user._id });
        return expense;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateExpense: async (parent, { expenseId, input }, context) => {
      if (context.user) {
        const updatedExpense = await Expense.findOneAndUpdate(
          { _id: expenseId, userId: context.user._id },
          input,
          { new: true }
        );
        return updatedExpense;
      }
      throw new AuthenticationError('Not logged in');
    },
    removeExpense: async (parent, { expenseId }, context) => {
      if (context.user) {
        const removedExpense = await Expense.findOneAndRemove({ _id: expenseId, userId: context.user._id });
        return removedExpense;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
