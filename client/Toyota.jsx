import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Toyota.css";
import toyota from '../assets/Toyota.jpg';

const Toyota = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={toyota} className='car1'/>
        <h1>Toyota</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Toyota;
