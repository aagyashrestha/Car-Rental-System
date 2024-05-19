import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditCarForm() {
  const { id } = useParams(); // Get the car ID from the URL
  const [carData, setCarData] = useState({
    carName: '',
    numberPlate: '',
    category: '',
    color: '',
    carImage: '',
    status: ''
  });

  useEffect(() => {
    fetchCarData();
  }, []); // Fetch car data when the component mounts

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cars/${id}`);
      if (response.data && response.data.car) {
        setCarData(response.data.car);
      } else {
        console.error('Car data not found:', response.data);
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/cars/${id}`, carData);
      console.log('Car data updated successfully!');
      // Redirect or display a success message after successful update
    } catch (error) {
      console.error('Error updating car data:', error);
    }
  };

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="carName">Car Name:</label>
          <input type="text" id="carName" name="carName" value={carData.carName} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="numberPlate">Number Plate:</label>
          <input type="text" id="numberPlate" name="numberPlate" value={carData.numberPlate} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={carData.category} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input type="text" id="color" name="color" value={carData.color} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="carImage">Car Image:</label>
          <input type="text" id="carImage" name="carImage" value={carData.carImage} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" value={carData.status} onChange={handleInputChange} />
        </div>
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}

export default EditCarForm;
