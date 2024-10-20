import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToSection = (sectionId) => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, currentPath === '/' ? 0 : 100);
  };

  const handleAddBlogClick = () => {
    if (user) {
      navigate("/add-blog");
    } else {
      navigate("/login", { state: { from: "/add-blog" } });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setIsMenuOpen(false); // Close the menu if it's open
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">Home</Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <button className="navbar-link" onClick={() => handleScrollToSection('about-section')}>About</button>
          <button className="navbar-link" onClick={() => handleScrollToSection('blog-post-form-section')}>Blog</button>
          <button className="navbar-link" onClick={() => handleScrollToSection('contact-us-section')}>Contact</button>
          <button className="navbar-link" onClick={handleAddBlogClick}>Add Blog</button>
          {user ? (
            <>
              <button className="dashboard-link" onClick={handleDashboardClick}>Dashboard</button>
              <button className="login-btn" onClick={() => {
                handleLogout();
                navigate('/');
              }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;