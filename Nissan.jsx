import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Nissan.css";
import nissan from '../assets/nissan.jpg';

const Nissan = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={nissan} className='car1'/>
        <h1>Nissan Z</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Nissan;
