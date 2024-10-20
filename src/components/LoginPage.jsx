import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginPage.css';

function LoginPage() {
  const { handlelogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended page from where the user was redirected (if any)
  const from = location.state?.from || "/";

  function submitHandler(event) {
    event.preventDefault();

    // Call handlelogin and check if the credentials are valid
    const loginSuccessful = handlelogin({ username, password });

    if (loginSuccessful) {
      toast.success("Login successful!");
      navigate(from); // Redirect to the original page (e.g., /add-blog) after successful login
    } else {
      toast.error("Incorrect username or password. Please try again.");
    }
  }

  return (
    <div className="main my-5">
      <div className="login-form">
        <h1>Login To Continue</h1>
        <form onSubmit={submitHandler}>
          <div className="user">
            <label htmlFor="Email">Username or Email</label>
            <input
              type="text"
              placeholder="Enter Your UserName or Email"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <p>We'll never share your email with anyone else.</p>
          </div>
          <div className="pass">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="sub">
            <button className="border rounded-5" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="foot my-4">
          <p>Don't Have an Account?</p>
          <Link className="border rounded-5" to="/signup">
            Create Account
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
