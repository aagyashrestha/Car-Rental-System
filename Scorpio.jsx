import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Scorpio.css";
import scorpio from '../assets/Scorpio.jpg';

const Scorpio = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={scorpio} className='car1'/>
        <h1>Scorpio</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Scorpio;
