import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../utils/mutations.js'; // Import your GraphQL mutation

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      const token = data.login.token;
      // Save token in localStorage or state (implement as needed)
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
