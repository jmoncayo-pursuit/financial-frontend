import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setError('');
        setIsAuthenticated(true);
        const hamburger = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector(
          '.navbar-collapse'
        );
        if (navbarCollapse?.classList.contains('show')) {
          hamburger?.click();
        }
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className='card bg-dark'>
      <div className='card-body p-3'>
        <form onSubmit={handleLogin}>
          <div className='mb-2'>
            <input
              className='form-control'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div className='mb-2'>
            <input
              className='form-control'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Login
          </button>
          {error && (
            <div
              className='alert alert-danger mt-2 mb-0 py-2'
              role='alert'
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
