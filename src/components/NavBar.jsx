import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          Financial Manager
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls='navbarNav'
          aria-expanded={isMenuOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isMenuOpen ? 'show' : ''
          }`}
          id='navbarNav'
        >
          <ul className='navbar-nav ms-auto'>
            {isAuthenticated ? (
              <li className='nav-item'>
                <button
                  className='nav-link btn btn-link'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <li className='nav-item'>
                    <Link
                      to='/login'
                      className='nav-link'
                      onClick={handleNavigation}
                    >
                      Login
                    </Link>
                  </li>
                )}
                {location.pathname !== '/signup' && (
                  <li className='nav-item'>
                    <Link
                      to='/signup'
                      className='nav-link'
                      onClick={handleNavigation}
                    >
                      Sign Up
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
