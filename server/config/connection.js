// // const mongoose = require('mongoose');

// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect('mongodb://localhost:27017/budgettracker', {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
      
// //     });
// //     console.log('Connected to MongoDB');
// //   } catch (error) {
// //     console.error('Error connecting to MongoDB:', error);
// //   }
// // };

// module.exports = connectDB;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/budgettracker');

module.exports = mongoose.connection;

