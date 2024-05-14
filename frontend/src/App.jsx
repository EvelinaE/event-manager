import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import UsersList from './components/UsersList'; // Adjust path as necessary
import './App.css';

const App = () => {
  return (
    <Router>
      <div id="root">
        <div className="hero">
          <h1>Event Register</h1>
        </div>
        <div className="form-container">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/users-list" element={<UsersList />} />
          </Routes>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/users-list">Go to Registered Users List</Link>
        </div>
      </div>
    </Router>
  );
};

export default App;
