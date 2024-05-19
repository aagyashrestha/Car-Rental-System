import React from 'react';
import "./CarCard.css";
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  console.log(car._id); // Add console.log here to log the carId
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.carImage} alt="Car" />
      </div>
      <div className="car-details">
        <h2>{car.carName}</h2>
        <p><strong>Number Plate:</strong> {car.numberPlate}</p>
        <p><strong>Category:</strong> {car.category}</p>
        
        <p><strong>Price:</strong> {car.price}</p>
        <p><strong>Status:</strong> {car.color}</p>
        
      </div>
    </div>
  );
};

export default CarCard;
