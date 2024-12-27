import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [strength, setStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Add effect to check password match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true); // Reset when confirm password is empty
    }
  }, [password, confirmPassword]);

  const checkPasswordStrength = (password) => {
    let score = 0;

    // Length check (8+ chars = 1 point, 12+ chars = 2 points)
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score++;

    // Character variety checks
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const varietyCount = [
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
    ].filter(Boolean).length;

    // Base score from variety (up to 2 points)
    score += Math.min(2, Math.floor(varietyCount / 2));

    // Bonus point for having special characters and meeting minimum requirements
    if (hasSpecial && score >= 2) {
      score += 1;
    }

    setStrength(score);
    return score;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Require medium strength (2/4)
    if (strength < 2) {
      setError(
        'Please use a stronger password. Try using at least 8 characters with a mix of letters, numbers, or symbols.'
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        {
          email,
          password,
        }
      );

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login', {
        state: {
          message: 'Account created successfully! Please log in.',
        },
      });
    } catch (err) {
      console.error('Full error:', err);
      console.error('Response:', err.response);
      if (err.response && err.response.status === 409) {
        setError(
          'Email already exists. Please use a different email.'
        );
      } else {
        setError(err.response?.data || 'Error during sign up');
      }
    }
  };

  const generateSecurePassword = () => {
    const length = 16;
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let password = '';
    // Ensure at least one of each type
    password +=
      charset.uppercase[
        Math.floor(Math.random() * charset.uppercase.length)
      ];
    password +=
      charset.lowercase[
        Math.floor(Math.random() * charset.lowercase.length)
      ];
    password +=
      charset.numbers[
        Math.floor(Math.random() * charset.numbers.length)
      ];
    password +=
      charset.symbols[
        Math.floor(Math.random() * charset.symbols.length)
      ];

    // Fill the rest randomly
    const allChars = Object.values(charset).join('');
    for (let i = password.length; i < length; i++) {
      password +=
        allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    setPassword(password);
    setConfirmPassword(password);
    checkPasswordStrength(password);
  };

  const checkPasswordCriteria = (password) => {
    return {
      length8: password.length >= 8,
      length12: password.length >= 12,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
  };

  return (
    <div className='card bg-dark'>
      <div className='card-body p-3'>
        <form onSubmit={handleSignUp}>
          <div className='mb-2'>
            <input
              className='form-control'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              autoComplete='username'
              required
            />
          </div>
          <div className='mb-2'>
            <div className='input-group'>
              <input
                className='form-control'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                placeholder='Password'
                autoComplete='new-password'
                required
              />
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={generateSecurePassword}
                title='Generate Secure Password'
              >
                Generate
              </button>
            </div>
            {password && (
              <>
                <div
                  className={`password-strength strength-${strength} cursor-pointer`}
                  onClick={() => setShowChecklist(!showChecklist)}
                  style={{ cursor: 'pointer' }}
                >
                  Password Strength: {strength}/5{' '}
                  <small>(click for details)</small>
                </div>
                {showChecklist && (
                  <div className='password-checklist mt-2 small'>
                    <ul className='list-unstyled mb-0'>
                      {Object.entries(
                        checkPasswordCriteria(password)
                      ).map(([criterion, isMet]) => (
                        <li
                          key={criterion}
                          className={
                            isMet ? 'text-success' : 'text-danger'
                          }
                        >
                          <i
                            className={`bi ${
                              isMet
                                ? 'bi-check-circle'
                                : 'bi-x-circle'
                            }`}
                          ></i>{' '}
                          {criterion === 'length8' &&
                            'At least 8 characters'}
                          {criterion === 'length12' &&
                            'At least 12 characters (recommended)'}
                          {criterion === 'hasUpper' &&
                            'Contains uppercase letters'}
                          {criterion === 'hasLower' &&
                            'Contains lowercase letters'}
                          {criterion === 'hasNumber' &&
                            'Contains numbers'}
                          {criterion === 'hasSpecial' &&
                            'Contains special characters'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          <div className='mb-2'>
            <input
              className={`form-control ${
                confirmPassword
                  ? passwordsMatch
                    ? 'is-valid'
                    : 'is-invalid'
                  : ''
              }`}
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
              autoComplete='new-password'
              required
            />
            {confirmPassword &&
              (passwordsMatch ? (
                <div className='valid-feedback'>Passwords match</div>
              ) : (
                <div className='invalid-feedback'>
                  Passwords do not match
                </div>
              ))}
          </div>
          <button type='submit' className='btn btn-primary w-100'>
            Sign Up
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

export default SignUpForm;
