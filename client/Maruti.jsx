import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Maruti.css";
import maruti from '../assets/Maruti.jpg';

const Maruti = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={maruti} className='car1'/>
        <h1>Maruti</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Maruti;
