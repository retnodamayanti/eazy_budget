import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../utils/mutations';
import { useNavigate, Link } from 'react-router-dom'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordError, setPasswordError] = useState('');


  const [signupMutation, { loading, error }] = useMutation(SIGNUP);
  const navigate = useNavigate(); 

  const handleSignup = async () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    try {
      await signupMutation({ variables: { username, email, password } });
      navigate('/'); 
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 gradient-bg-login">
            <h2 className="text-center mb-4">Create an Account</h2>
            {error && <p className="text-danger text-center">Error: {error.message}</p>}
            <form>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => setUsernameTouched(true)}
                />
                {usernameTouched && !username && <p className="text-danger">Username is required.</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
                {emailTouched && !email && <p className="text-danger">Email is required.</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(''); 
                  }}
                  onBlur={() => setPasswordTouched(true)}
                />
                {passwordTouched && !password && <p className="text-danger">Password is required.</p>}
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </div>
              <div className="mb-3 text-center">
                <Link to="/">Already have an account? Login</Link>
              </div>
              <div className="d-grid">
                <button type="button" onClick={handleSignup} disabled={loading} className="btn btn-primary">
                  {loading ? 'Signing up...' : 'Signup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Signup;
