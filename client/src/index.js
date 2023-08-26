import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client'; 
import client from './utils/ApolloClient'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './global.css';

ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  );
  