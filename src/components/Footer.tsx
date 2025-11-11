import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-3 mt-auto" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'rgba(255,255,255,0.9)',
      fontSize: '0.85rem',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container-fluid">
        <p className="mb-0">
          © 2024 User Management System. All rights reserved. | 
          <span className="ms-2">Developed with ❤️ by DHRUV PATEL</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
