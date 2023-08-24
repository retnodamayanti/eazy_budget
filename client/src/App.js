import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import ExpenseManager from './components/ExpenseManager';
import Signup from './components/Signup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {loggedIn && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/expense" element={loggedIn ? <ExpenseManager /> : <Navigate to="/" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
