import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to user role
  const [popupMessage, setPopupMessage] = useState(""); // State for pop-up message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
      role,
    }).then((response) => {
      if (response.data.status === 'success') {
        // Show success pop-up for new user registration
        setPopupMessage("New user registered successfully!");
        navigate("/login");
      } else if (response.data.status === 'user_exists') {
        // Show pop-up for existing user
        setPopupMessage("User already exists!");
      }
    }).catch(err => {
      console.log(err);
      setPopupMessage("Error occurred during signup."); // Display generic error message
    });
  };

  return (
    <div className="sign-up-container">
      <div className="image"></div>
      <div className="form-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            user
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            admin
          </label>
        </div>

        <button type="submit">Sign Up</button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>

        {/* Render pop-up message if it is not empty */}
        {popupMessage && (
          <div className="popup">
            <span className="popuptext">{popupMessage}</span>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default Signup;