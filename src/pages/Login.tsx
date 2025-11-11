import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('error');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        return '';
      default:
        return '';
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateField('email', value);
    setErrors({
      ...errors,
      email: error
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const error = validateField('password', value);
    setErrors({
      ...errors,
      password: error
    });
  };

  const showToastNotification = (message: string, type: 'success' | 'error' | 'warning') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate all fields
      const newErrors = {
        email: validateField('email', email),
        password: validateField('password', password)
      };

      setErrors(newErrors);

      // Check if there are any errors
      const hasErrors = Object.values(newErrors).some(error => error !== '');
      if (hasErrors) {
        showToastNotification('Please fix the errors before logging in', 'error');
        return;
      }

      const success = await login(email, password);
      if (success) {
        showToastNotification('Login successful! Redirecting to profile...', 'success');
        setTimeout(() => navigate('/profile'), 1000);
      } else {
        showToastNotification('Invalid email or password', 'error');
      }
    } catch (err) {
      showToastNotification('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 col-xl-4">
          <div className="card shadow-lg border-0" style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px'
          }}>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="mb-3" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  <i className="bi bi-shield-lock"></i>
                </div>
                <h2 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>Welcome Back</h2>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="bi bi-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      className={`form-control border-start-0 ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      required
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="bi bi-lock text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control border-start-0 ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      required
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn w-100 py-3 fw-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0" style={{ color: '#6c757d' }}>
                  Don't have an account? 
                  <Link 
                    to="/register" 
                    className="text-decoration-none fw-semibold ms-1"
                    style={{ color: '#667eea' }}
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className={`toast show align-items-center text-white bg-${toastType === 'success' ? 'success' : toastType === 'warning' ? 'warning' : 'danger'}`} role="alert">
            <div className="d-flex">
              <div className="toast-body">
                {toastMessage}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
