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
        <p><strong>Color:</strong> {car.color}</p>
        <p><strong>Price:</strong> {car.price}</p>
        <Link to={`/booking/${car._id}`}>
          <button className="book-button">BOOK</button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
