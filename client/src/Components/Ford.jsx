import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Ford.css";
import ford from '../assets/Ford.jpg';

const Ford = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={ford} className='car1'/>
        <h1>Ford</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Ford;
