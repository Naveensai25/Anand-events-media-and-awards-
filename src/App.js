// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext'; // Import the ModalProvider
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Landinformation from './pages/Landinformation';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import NominationFormPage from './pages/NominationFormPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop'; // Import the ScrollToTop component

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth');
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <ModalProvider> {/* Wrap everything with ModalProvider */}
      <Router>
        <div className="min-h-screen bg-white">
          <ScrollToTop /> {/* Add ScrollToTop component here */}
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/Landinfo" element={<Landinformation />} />
              
              {/* Awards Routes */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<CategoryDetailPage />} />
              <Route path="/nominate" element={<NominationFormPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ModalProvider>
  );
}

export default App;