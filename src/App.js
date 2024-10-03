import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showError, setShowError] = useState(false); 

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        setShowError(false); 
        setTimeout(() => {
          setAuthError(''); 
        }, 500); 
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [authError]);

  return (
    <Router>
      <div className="relative">
        {/* Header */}
        <header className="bg-indigo-700 text-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-wide">My App</h1>
            <nav>
              <ul className="flex space-x-8">
                {/* NavLink  */}
                <li>
                  <NavLink
                    to="/"
                    className="text-white text-lg transition duration-300 hover:text-indigo-400 focus:outline-none"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                    })}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="text-white text-lg transition duration-300 hover:text-indigo-400 focus:outline-none"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                    })}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="text-white text-lg transition duration-300 hover:text-indigo-400 focus:outline-none"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                    })}
                  >
                    Signup
                  </NavLink>
                </li>
                {isAuthenticated && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard"
                        className="text-white text-lg transition duration-300 hover:text-indigo-400 focus:outline-none"
                        style={({ isActive }) => ({
                          fontWeight: isActive ? 'bold' : 'normal',
                        })}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      {/* Logout  */}
                      <span
                        onClick={handleLogout}
                        className="text-white text-lg cursor-pointer transition duration-300 hover:text-indigo-400 focus:outline-none"
                      >
                        Logout
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>

        {/* Error message  */}
        {authError && (
          <div
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg text-center w-3/4 max-w-md z-50 transition-opacity duration-500 ${
              showError ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {authError}
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
