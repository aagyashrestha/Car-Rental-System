import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Porsche.css";
import porsche from '../assets/Porsche.jpg';

const Porsche = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={porsche} className='car1'/>
        <h1>Porsche</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Porsche;
