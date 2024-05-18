import React from 'react';
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Mustang.css";
import mustang from '../assets/mustang.jpg';

const Mustang = () => {
    return(
        <div className="sign-up-container1">
        <div className='container1'>
        <img src={mustang} className='car1'/>
        <h1>Ford Mustang</h1>

        <button><Link to={"/booking"}>Book</Link></button>

        </div>
      </div>
    );
};

export default Mustang;
