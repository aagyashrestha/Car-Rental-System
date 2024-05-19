import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './menu.css';
// import whiteBarImage from './white_bar.png';

const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/auth/logout')
    .then(res => {
    if (res.data.status) {
    navigate('/login');
    }
    })
    .catch(err => {
    console.log(err);
    });
    };
const MenuBar = () => {
  // State for managing the dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to toggle between English and Nepali language
  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'Nepali' : 'English');
  };

  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo"><Link to="/">Vroom Cars</Link></div> 
           
            <ul className="links">
            <li><Link to="/"> Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <button className='btn' onClick={handleLogout} ><Link to="/login">Logout</Link></button>

          </div>

          
          <div className="toggle_btn" onClick={toggleMenu}>
          </div>
        
      </header>
    </div>
  );
};

export default MenuBar;