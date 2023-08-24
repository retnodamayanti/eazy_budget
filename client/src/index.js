import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import client from './utils/ApolloClient'; // Import your Apollo Client instance
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  );
  