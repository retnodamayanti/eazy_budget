const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/connection'); 
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // Add your context logic if needed
      },
    });

    server.start().then(() => {
      server.applyMiddleware({ app });

      // Add a route for testing the GraphQL endpoint
      app.get('/graphql', (req, res) => {
        res.send('GraphQL endpoint is running.');
      });

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      });
    });
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running.');
});
