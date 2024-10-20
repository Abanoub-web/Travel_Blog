import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SignupForm from "./components/SignupForm";
import BlogPostForm from './components/BlogPostForm';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import React from 'react';
import { AuthProvider } from './store/AuthContext';
import './App.css';

function App() {
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if users already exist in localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users'));
        if (!existingUsers || existingUsers.length === 0) {
          const response = await fetch('/data.json');
          const data = await response.json();
          localStorage.setItem('users', JSON.stringify(data.users));
        }

        // Check if posts already exist in localStorage
        const existingPosts = JSON.parse(localStorage.getItem('posts'));
        if (!existingPosts || existingPosts.length === 0) {
          const response = await fetch('/data.json');
          const data = await response.json();
          localStorage.setItem('posts', JSON.stringify(data.Posts));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-blog" element={<BlogPostForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;