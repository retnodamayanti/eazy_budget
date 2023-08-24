import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginMutation, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      console.log("Login onCompleted triggered", data);
      localStorage.setItem('token', data.login.token);
      setLoggedIn(true);
      setUser(data.login.user);
      navigate('/dashboard');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("handleLogin function called"); // Log at the beginning

    console.log("Attempting to log in with:", email, password);
    
    loginMutation({ variables: { email, password } })
      .then(response => {
        console.log("Server response:", response);
      })
      .catch(err => {
        console.error("Login failed:", err);
      });
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

export default Login;
