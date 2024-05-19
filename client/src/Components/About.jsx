import React from 'react';
import image3 from '../assets/image3.png';
import './About.css';
import Menubar from './Menu';

const About = () => {
    return (
        <div><Menubar />
        <br></br>
        <div className='about'>
            
            <div className="about-left">
                <img src={image3} alt="About Vroom Rental" className='about-img'/>
            </div>
            <div className="about-right">
                <h3>About Vroom Rental</h3>
                <p>
                    Vroom Rental Car offers a diverse fleet to meet various travel needs. With a commitment to customer satisfaction and convenience, Vroom provides reliable and well-maintained cars, ranging from compact models to spacious SUVs. Whether for business trips, family vacations, or weekend getaways, Vroom aims to deliver exceptional service, competitive rates, and seamless rental experiences. With locations conveniently situated across multiple cities, Vroom makes it easy for customers to access quality transportation wherever their journey takes them.
                </p>
                <p>
                    Our mission is to provide hassle-free car rental solutions with a focus on customer comfort, safety, and satisfaction. We continuously strive to improve our services and expand our fleet to cater to the evolving needs of our customers.
                </p>
                <p>
                    At Vroom Rental, we value integrity, transparency, and efficiency. Our team is dedicated to delivering personalized assistance and ensuring a smooth rental process from start to finish.
                </p>
            </div>
        </div>
        </div>
    );
};

export default About;
