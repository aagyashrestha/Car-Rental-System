import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Alfa.css";
import alfa from '../assets/alfa.jpg';

const Alfa = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={alfa} className='car1'/>
        <h1>Alfa Romeo</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Alfa;
