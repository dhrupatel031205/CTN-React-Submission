import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');
  const [loading, setLoading] = useState(false);

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

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number';
        return '';
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to current user data
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate all fields
      const newErrors = {
        firstName: validateField('firstName', formData.firstName),
        lastName: validateField('lastName', formData.lastName),
        email: validateField('email', formData.email),
        phone: validateField('phone', formData.phone)
      };

      setErrors(newErrors);

      // Check if there are any errors
      const hasErrors = Object.values(newErrors).some(error => error !== '');
      if (hasErrors) {
        showToastNotification('Please fix the errors before saving', 'error');
        return;
      }

      // Update user data
      updateUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      });

      showToastNotification('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (err) {
      showToastNotification('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2>User not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7 col-xl-6">
          <div className="card shadow-lg border-0" style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px'
          }}>
            <div className="card-header border-0" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px 15px 0 0',
              padding: '1.5rem'
            }}>
              <div className="d-flex align-items-center">
                <div className="me-3" style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: 'white'
                }}>
                  <i className="bi bi-person-circle"></i>
                </div>
                <div>
                  <h3 className="card-title mb-1 text-white fw-bold">My Profile</h3>
                  <p className="mb-0 text-white" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    {isEditing ? 'Edit your information' : 'View your profile details'}
                  </p>
                </div>
              </div>
            </div>
            <div className="card-body p-5">
              {!isEditing ? (
                // View Mode
                <div>
                  <div className="text-center mb-4">
                    <div style={{ 
                      width: '100px', 
                      height: '100px', 
                      margin: '0 auto 1.5rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                    </div>
                    <h4 className="fw-bold mb-1" style={{ color: '#2c3e50' }}>
                      {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-muted mb-0">User Account</p>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-4 text-muted fw-semibold">Email:</div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-envelope me-2 text-muted"></i>
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-sm-4 text-muted fw-semibold">Phone:</div>
                    <div className="col-sm-8">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-telephone me-2 text-muted"></i>
                        {user.phone || 'Not provided'}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      className="btn py-2 px-4 fw-semibold"
                      style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      onClick={handleEdit}
                    >
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit Profile
                    </button>
                    <button 
                      className="btn btn-outline-danger py-2 px-4 fw-semibold"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSave}>
                  <div className="row mb-3">
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                    <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
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
                        onChange={handleInputChange}
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


                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn py-2 px-4 fw-semibold"
                      style={{ 
                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary py-2 px-4 fw-semibold"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
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

export default Profile;
