import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Bentley.css";
import bentley from '../assets/Bentley.jpg';

const Bentley = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={bentley} className='car1'/>
        <h1>Bentley Continental GT</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Bentley;
