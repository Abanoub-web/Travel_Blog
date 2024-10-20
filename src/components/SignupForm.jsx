import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const initialUsersData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    photo: ''
  };

  const [users, setUsers] = useState(initialUsersData);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      setUsers({
        ...users,
        photo: file.name
      });
    }
  };

  const generateUniqueId = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    let newId;
    do {
      newId = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // Random number between 3 and 10
    } while (existingUsers.some(user => user.id === newId));
    return newId;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Create a new user object
    const newUser = {
      id: generateUniqueId(),
      username: users.firstName.toLowerCase() + users.lastName.toLowerCase(),
      password: users.password,
      name: `${users.firstName} ${users.lastName}`,
      email: users.email,
      img: profilePhoto || './img/user1.png',
      dateOfBirth: `${users.year}-${users.month}-${users.day}`,
      gender: users.gender
    };

    // Add the new user to the existing users array
    const updatedUsers = [...existingUsers, newUser];

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Reset the form
    setUsers(initialUsersData);
    setProfilePhoto(null);

    alert('User registered successfully!');
    navigate('/login');
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={users.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={users.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={users.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={users.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <div className="dob-selectors">
            <select name="day" value={users.day} onChange={handleChange} required>
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>

            <select name="month" value={users.month} onChange={handleChange} required>
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select name="year" value={users.year} onChange={handleChange} required>
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={users.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Profile Photo</label>
          <input type="file" onChange={handlePhotoUpload} accept="image/*" />
          {profilePhoto && <img src={profilePhoto} alt="Profile Preview" className="profile-preview" />}
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;