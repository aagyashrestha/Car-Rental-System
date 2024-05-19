import React, { useState, useEffect } from "react";
import "./Contact.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [emailText, setEmailText] = useState("");
    const [showAlert, setShowAlert] = useState(false);
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3000/auth/contact", {
        name,
        email,
        subject,
        text: emailText
      }).then(response => {
          if(response.data.status) {
            setShowAlert(true);
          }
      }).catch(err => {
          console.log(err)
      })
    };

    useEffect(() => {
      let timer;
      if (showAlert) {
        timer = setTimeout(() => {
          setShowAlert(false); // Hide the alert after 5 seconds
        }, 5000); // 5000 milliseconds = 5 seconds
      }
      
      return () => {
        clearTimeout(timer); // Clear the timeout when the component unmounts or showAlert changes
      };
    }, [showAlert]);
  
    return (
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Reach out to us</h2>
  
          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
  
          {/* Email Input */}
          <input
            type="email"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
  
          {/* Subject Input */}
          <input
            type="text"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />
  
          {/* Email Text Input */}
          <textarea
            rows="4"
            placeholder="Enter your message"
            onChange={(e) => setEmailText(e.target.value)}
          ></textarea>
  
          <button type="submit">Send</button>

          {/* Alert Message */}
          {showAlert && (
            <div className="alert" style={{ backgroundColor: "orange", color: "white", padding: "7px", marginTop: "10px", borderRadius: "10px" }}>
              Your message has been sent!
            </div>
          )}
        </form>
      </div>
    );
}

export default Contact;
