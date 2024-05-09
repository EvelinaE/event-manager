// frontend/src/App.jsx
import React from 'react';
import RegistrationForm from './RegistrationForm';
// import UsersList from './components/UsersList'; // Import the UsersList component
import './App.css'; // Import your CSS file

const App = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero">
                <h1>Event Register</h1>
            </div>

            {/* Main Content */}
            <div className="app-container">
                <div className="form-container">
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
};

export default App;
