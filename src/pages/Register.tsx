import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('error');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) return true; // Phone is optional
    // Support international phone numbers with +, spaces, dashes, and parentheses
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateName = (value: string, field: string): string => {
    if (!value.trim()) return `${field} is required`;
    if (value.length < 2) return `${field} must be at least 2 characters long`;
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return `${field} can only contain letters, spaces, hyphens and apostrophes`;
    if (value.length > 50) return `${field} cannot exceed 50 characters`;
    return '';
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number';
        return '';
      case 'password':
        if (!value.trim()) return 'Password is required';
        return validatePassword(value);
      case 'confirmPassword':
        if (!value.trim()) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'firstName':
        return validateName(value, 'First name');
      case 'lastName':
        return validateName(value, 'Last name');
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
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

    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword),
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName)
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      showToastNotification('Please fix the errors before submitting', 'error');
      return;
    }

    setLoading(true);

    try {
      const success = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });

      if (success) {
        showToastNotification('Registration successful! Redirecting to profile...', 'success');
        setTimeout(() => navigate('/profile'), 1500);
      } else {
        showToastNotification('Email already exists', 'error');
      }
    } catch (err) {
      showToastNotification('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
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
                  <i className="bi bi-person-plus"></i>
                </div>
                <h2 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>Create Account</h2>
                <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>Join us today and get started</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-end-0">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                    {errors.firstName && (
                      <div className="invalid-feedback d-block">
                        {errors.firstName}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-end-0">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                    {errors.lastName && (
                      <div className="invalid-feedback d-block">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold">Phone Number (Optional)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="bi bi-telephone text-muted"></i>
                    </span>
                    <input
                      type="tel"
                      className={`form-control border-start-0 ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                  {errors.phone && (
                    <div className="invalid-feedback d-block">
                      {errors.phone}
                    </div>
                  )}
                  <div className="form-text text-muted">Format: +1 (555) 123-4567 or 555-123-4567</div>
                </div>


                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="bi bi-lock text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control border-start-0 ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      minLength={6}
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                  <div className="form-text text-muted">Password must be at least 8 characters with uppercase, lowercase, number, and special character</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="bi bi-lock-fill text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control border-start-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback d-block">
                      {errors.confirmPassword}
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0" style={{ color: '#6c757d' }}>
                  Already have an account? 
                  <Link 
                    to="/login" 
                    className="text-decoration-none fw-semibold ms-1"
                    style={{ color: '#667eea' }}
                  >
                    Sign in here
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

export default Register;
