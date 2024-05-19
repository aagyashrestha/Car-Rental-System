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
        // Your logout logic here
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

            
            <div className="what">
              
            <div className="search">
                <h1>All Products</h1>
            </div>
            <div className="product-list">
            
                <div className="product-item">
                    <div className="product-info">
                        <img src={luxurycar} alt="Luxury Car" />
                    </div>
                    
                    <div className="info-container">
                        <h2>Luxury Cars</h2>
                        <p>Explore our luxurious collection of cars.<br></br> Whether you're looking for comfort, style, or <br></br>cutting-edge technology, our luxury cars deliver the ultimate <br></br>driving experience. Choose from a variety <br></br>of models designed to exceed your expectations.</p>
                    </div>
                    <div className="button-container">
                        <button><Link to="/luxurycar">Luxury Cars</Link></button>
                    </div>
                </div>

                <div className="product-item">
                    <div className="product-info">
                        <img src={sportscar} alt="Sports Car" />
                    </div>
                    
                    <div className="info-container">
                        <h2>Sports Car</h2>
                        <p>Feel the adrenaline rush with our high-performance sports cars. Designed for speed and agility, our sports cars offer unparalleled driving dynamics. Experience the thrill of the track on the open road with our exhilarating collection.</p>
                    </div>
                    <div className="button-container">
                        <button><Link to="/sportscar">Sports Car</Link></button>
                    </div>
                </div>

                <div className="product-item">
                    <div className="product-info">
                        <img src={regularcar} alt="Regular Car" />
                    </div>
                    
                    <div className="info-container">
                        <h2>Regular Cars</h2>
                        <p>Get from A to B with ease and comfort in our reliable regular cars. Perfect for daily commutes, family outings, or road trips, our regular cars offer fuel efficiency, safety features, and ample space for passengers and cargo.</p>
                    </div>
                    <div className="button-container">
                        <button><Link to="/regularcar">Regular Cars</Link></button>
                    </div>
                </div>

                <div className="product-item">
                    <div className="product-info">
                        <img src={regularcar} alt="Regular Car" />
                    </div>
                    
                    <div className="info-container">
                        <h2>Regular Cars</h2>
                        <p>Get from A to B with ease and comfort in our reliable regular cars. Perfect for daily commutes, family outings, or road trips, our regular cars offer fuel efficiency, safety features, and ample space for passengers and cargo.</p>
                    </div>
                    <div className="button-container">
                        <button><Link to="/regularcar">Regular Cars</Link></button>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Car Rental System. All rights reserved.</p>
            </footer>
        </div>
        </div>
    );
}

export default Home;
