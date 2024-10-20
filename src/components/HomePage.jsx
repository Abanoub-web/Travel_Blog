import React from 'react';
import About from './About';
import Blog from './Blog';
import ContactUs from './ContactUs';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      

      <section id="blog-post-form-section">
        <Blog />
      </section>

      <section id="about-section">
        <About />
      </section>
      <section id="contact-us-section">
        <ContactUs />
      </section>
    </div>
  );
};

export default HomePage;
