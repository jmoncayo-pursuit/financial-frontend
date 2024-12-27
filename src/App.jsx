import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className='app'>
        <NavBar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <Routes>
          <Route
            path='/'
            element={
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path='/login'
            element={
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
