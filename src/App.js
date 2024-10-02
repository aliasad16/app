import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        {/* Header */}
        <header className="bg-indigo-600 text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">My App</h1> {/* App Title or Logo */}
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-indigo-300 transition duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-indigo-300 transition duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-indigo-300 transition duration-300">
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-indigo-300 transition duration-300">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
