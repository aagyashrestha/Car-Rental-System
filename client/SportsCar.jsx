import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard'; // Assuming you have a CarCard component
import "./SportsCar.css";

function SportsCar() {
  const [sportCars, setSportCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSportCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars?category=Sports');
        console.log('Response data:', response.data); // Check the received data
        setSportCars(response.data.cars.filter(car => car.category === 'Sports')); // Filter only sports cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sport cars:', error);
        setLoading(false);
      }
    };
  
    fetchSportCars();
  }, []);

  useEffect(() => {
    if (sportCars.length > 0) {
      console.log('Fetched sports cars:', sportCars);
    } else {
      console.log('No sports cars fetched.');
    }
  }, [sportCars]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCars = sportCars.filter(car => {
    return car.carName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container-fluid">
      <div className="container">
      <h1>Sports Cars</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search by car name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="product-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {filteredCars.length > 0 ? (
                <div className="product">
                  {filteredCars.map(car => (
                    <CarCard key={car._id} car={car} /> // Assuming `_id` is a unique identifier for each car
                  ))}
                </div>
              ) : (
                <p>No sports cars found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SportsCar;
