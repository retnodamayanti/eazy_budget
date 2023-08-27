const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { signToken, getUserFromToken } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the token from the headers
    const token = req.headers.authorization?.split('Bearer ')[1];

    // if there's no token, return an empty context
    if (!token) {
      return {};
    }

    // if there's a token, verify it and attach the user to the context
    const user = getUserFromToken(token);
    console.log("Logged in user ID:", user._id);
    return { user };
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
// // catch-all route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// start the server
  startApolloServer();
 
