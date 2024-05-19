import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role selection
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
      role,
    })
      .then((response) => {
        if (response.data.status) {
          // Check if redirection is specified
          if (response.data.redirectTo) {
            navigate(response.data.redirectTo);
            // Display popup based on role
            if (response.data.role === "user") {
              alert("Logged in as a user");
            } else if (response.data.role === "admin") {
              alert("Logged in as an admin");
            }
          } else {
            // If no redirection is specified, redirect to default route
            navigate("/");
          }
        } else {
          // Display popup for user not registered or incorrect password
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <div className="image"></div>
      <div className="form-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

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
              Admin
            </label>
          </div>

          <button type="submit">Login</button>
          <Link to="/forgotPassword">Forgot Password?</Link>
          <p>
            Don't Have Account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
