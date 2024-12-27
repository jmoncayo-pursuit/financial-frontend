import React from 'react';
import { Navigate } from 'react-router-dom';

function DashboardPage() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='container pt-3'>
      <h1 className='text-center mb-3'>Financial Dashboard</h1>
      <div className='row g-3'>
        <div className='col-12 col-md-4'>
          <div className='card bg-dark text-white h-100'>
            <div className='card-body'>
              <h2 className='card-title h5 mb-2'>Budget Overview</h2>
              <p className='card-text mb-0'>Coming soon...</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-4'>
          <div className='card bg-dark text-white h-100'>
            <div className='card-body'>
              <h2 className='card-title h5 mb-2'>
                Disposable Income
              </h2>
              <p className='card-text mb-0'>Coming soon...</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-4'>
          <div className='card bg-dark text-white h-100'>
            <div className='card-body'>
              <h2 className='card-title h5 mb-2'>
                Investment Suggestions
              </h2>
              <p className='card-text mb-0'>Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
