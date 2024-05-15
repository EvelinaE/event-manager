import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm';
import UsersList from './components/UsersList';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <div className="hero">
          <div className="hero-layer hero-layer1"></div>
          <div className="hero-layer hero-layer2"></div>
          <div className="hero-layer hero-layer3"></div>
          <div className="hero-content">
            <h1>Event Register</h1>
            <h2>Easy Peasy Event Registration</h2>
          </div>
        </div>
        <div className="app-container">
          <Routes>
            <Route path="/" element={
              <>
                <div className="form-container">
                  <RegistrationForm />
                </div>
                <div className="link-container">
                  <Link to="/users-list">Go to Registered Users List</Link>
                </div>
              </>
            } />
            <Route path="/users-list" element={
              <>
                <UsersList />
                <div className="link-container">
                  <Link to="/">Go Back to the Main Page</Link>
                </div>
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
