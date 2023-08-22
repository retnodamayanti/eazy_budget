import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from './utils/ApolloClient'; 
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; 

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <ApolloProvider client={ApolloClient}>
      <div>
        {token ? (
          <>
            <Dashboard onLogout={handleLogout} />
          </>
        ) : (
          <Auth />
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
