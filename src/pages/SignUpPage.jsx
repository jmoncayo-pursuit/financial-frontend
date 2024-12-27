import React from 'react';
import { Navigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

function SignUpPage() {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='page-container'>
      <h1>Create Account</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
