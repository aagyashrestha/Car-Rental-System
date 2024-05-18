import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Bmw.css";
import bmw from '../assets/BMW.jpg';

const Bmw = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={bmw} className='car1'/>
        <h1>Bmw</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Bmw;
