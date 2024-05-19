import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './CarCard'; // Assuming you have a CarCard component
import "./LuxuryCar.css";

function LuxuryCar() {
  const [luxuryCars, setLuxuryCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLuxuryCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars?category=Luxury');
        console.log('Response data:', response.data); // Check the received data
        setLuxuryCars(response.data.cars.filter(car => car.category === 'Sedan')); // Filter only luxury cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching luxury cars:', error);
        setLoading(false);
      }
    };
  
    fetchLuxuryCars();
  }, []);

  useEffect(() => {
    if (luxuryCars.length > 0) {
      console.log('Fetched luxury cars:', luxuryCars);
    } else {
      console.log('No luxury cars fetched.');
    }
  }, [luxuryCars]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCars = luxuryCars.filter(car => {
    return car.carName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container-fluid">
      <div className="container">
        <h1>Luxury Cars</h1>
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
                <p>No luxury cars found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LuxuryCar;
