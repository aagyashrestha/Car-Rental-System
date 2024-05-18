import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Audi.css";
import audi from '../assets/Audi.jpg';

const Audi = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={audi} className='car1'/>
        <h1>Audi</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Audi;
