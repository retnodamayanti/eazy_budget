const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection'); // Import the database connection function

const app = express();
const PORT = process.env.PORT || 3000;


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running.');
});

// Add more routes and middleware as needed

// // Set up GraphQL endpoint
// app.use('/graphql', graphqlHTTP({
//   // Your GraphQL configuration here
// }));
