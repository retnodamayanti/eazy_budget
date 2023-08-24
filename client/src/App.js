import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store the user data

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard user={user} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
