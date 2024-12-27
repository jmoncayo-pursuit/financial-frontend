import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage({ setIsAuthenticated }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const message = location.state?.message;

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='container pt-3'>
      <h1 className='text-center mb-3'>Welcome Back</h1>
      {message && (
        <div className='alert alert-success mb-3' role='alert'>
          {message}
        </div>
      )}
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-md-6 col-lg-4'>
          <LoginForm setIsAuthenticated={setIsAuthenticated} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
