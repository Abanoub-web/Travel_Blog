import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-nav">
          <ul>
            <li>
              <Link to="/" className="footer-link">Home</Link>
            </li>
            <li>
              <button
                className="footer-link"
                onClick={() => handleScrollToSection('about-section')}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="footer-link"
                onClick={() => handleScrollToSection('contact-us-section')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
        <p>&copy; 2024 Travel Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
