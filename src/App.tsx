import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
    }}>
      <Header />
      <main className="flex-grow-1 py-4">
        <div className="container-fluid">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/login" element={
              <MainLayout>
                <Login />
              </MainLayout>
            } />
            <Route path="/register" element={
              <MainLayout>
                <Register />
              </MainLayout>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
