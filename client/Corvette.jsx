import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Corvette.css";
import corvette from '../assets/corvette.jpg';

const Corvette = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={corvette} className='car1'/>
        <h1>Chevrolet Corvette</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Corvette;
