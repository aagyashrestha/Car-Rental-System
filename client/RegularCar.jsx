import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard'; // Assuming you have a CarCard component
import "./RegularCar.css";

function RegularCar() {
  const [regularCars, setRegularCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRegularCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars?category=Normal');
        console.log('Response data:', response.data); // Check the received data
        setRegularCars(response.data.cars.filter(car => car.category === 'Normal')); // Filter only normal cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching regular cars:', error);
        setLoading(false);
      }
    };
  
    fetchRegularCars();
  }, []);

  useEffect(() => {
    if (regularCars.length > 0) {
      console.log('Fetched regular cars:', regularCars);
    } else {
      console.log('No regular cars fetched.');
    }
  }, [regularCars]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCars = regularCars.filter(car => {
    return car.carName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container-fluid">
      <div className="container">
        <h1>Regular Cars</h1>
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
                <p>No regular cars found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegularCar;
