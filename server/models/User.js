const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  savedExpenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
});

// hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt); 
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// isCorrectPassword method
userSchema.methods.isCorrectPassword = async function (password) {
  console.log(`Comparing passwords for user ${this.email}:`);
  console.log(`Stored password hash: ${this.password}`);
  
  const match = await bcrypt.compare(password, this.password);
  console.log(`Password match result: ${match}`);
  
  return match;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
