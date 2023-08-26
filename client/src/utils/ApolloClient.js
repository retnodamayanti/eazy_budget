import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Determine if the environment is production
const isProduction = process.env.NODE_ENV === 'production';

// Set the GraphQL URL based on the environment
const GRAPHQL_URL = isProduction ? 
  '/graphql' : // Use a relative path for production
  'http://localhost:3001/graphql'; // Use localhost for development

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

// Set up authorization header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  
  // Return the headers to the context for the httpLink to read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
