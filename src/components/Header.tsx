import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="navbar navbar-expand-lg navbar-dark" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
    }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/" style={{ fontSize: '1.5rem' }}>
          <i className="bi bi-shield-lock me-2"></i>UMS
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/login') ? 'active' : ''}`} 
                    to="/login"
                    style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/register') ? 'active' : ''}`} 
                    to="/register"
                    style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/profile') ? 'active' : ''}`} 
                  to="/profile"
                  style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex align-items-center">
            <a 
              href="https://github.com/dhrupatel031205" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white me-3 text-decoration-none"
              style={{ 
                fontSize: '0.9rem',
                opacity: 0.9,
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              <i className="bi bi-github me-1"></i>
              dhrupatel031205
            </a>
            
            {user && (
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
                style={{ 
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
