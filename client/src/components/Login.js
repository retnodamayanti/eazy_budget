import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ setLoggedIn, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);  
  const [passwordTouched, setPasswordTouched] = useState(false);  
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
    e.preventDefault();
    loginMutation({ variables: { email, password } })
      .then(response => {
        console.log("Server response:", response);
      })
      .catch(err => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 gradient-bg-login">
            <h2 className="text-center mb-4">Login</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">Error: {error.message}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}  
                />
                {emailTouched && !email && <p className="text-danger">Email is required.</p>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}  
                />
                {passwordTouched && !password && <p className="text-danger">Password is required.</p>}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
            <div className="signup-link mt-3 text-center">
              <Link to="/signup">Doesn't have an account? Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
