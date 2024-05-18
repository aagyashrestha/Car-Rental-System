import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menubar from './Menu';
import Cars from '../assets/newcar.png';
import luxurycar from '../assets/luxurycar.jpg';
import sportscar from '../assets/sportscar.jpg';
import regularcar from '../assets/regularcar.jpg';
import './Home.css';

function Home() {
  const navigate = useNavigate();

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

  return (
    <div>
      <Menubar />
      <img className="cars" src={Cars} alt="Cars" />

      <div>
        <div className="search">
          <h1>All Products</h1>
        </div>
        <div className="product-list">
          <div className="product-item">
            
              <img src={luxurycar} alt="Luxury Car" />
            
            <div className="button-container">
              <button><Link to="/luxurycar">Luxury Cars</Link></button>
            </div>
          </div>
          <div className="product-item">
            
              <img src={sportscar} alt="Sports Car" />
            
            <div className="button-container">
              <button><Link to="/sportscar">Sports Car</Link></button>
            </div>
          </div>
          <div className="product-item">
           
              <img src={regularcar} alt="Regular Car" />
            
            <div className="button-container">
              <button><Link to="/regularcar">Regular Cars</Link></button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Car Rental System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
