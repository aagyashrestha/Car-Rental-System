import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./EditCarForm.css";

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

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [userType, setUserType] = useState('');
  const [citizenshipFile, setCitizenshipFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);

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

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    if (userType === "local") {
      setCitizenshipFile(fileObj);
    } else if (userType === "tourist") {
      setPassportFile(fileObj);
    }
  };

  return (
    <div className="edit-car-form-container">
      
      <form className="edit-car-form" onSubmit={handleSubmit}>
        {/* Car Information Section */}
        <div className="car-information">
          <h3>Car Information</h3>
          {/* Car Name */}
          <div className="form-group">
            <label htmlFor="carName">Car Name:</label>
            <input type="text" id="carName" name="carName" value={carData.carName} onChange={handleInputChange}  />
          </div>
          {/* Number Plate */}
          <div className="form-group">
            <label htmlFor="numberPlate">Number Plate:</label>
            <input type="text" id="numberPlate" name="numberPlate" value={carData.numberPlate} onChange={handleInputChange} />
          </div>
          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={carData.category} onChange={handleInputChange} />
          </div>
          {/* Color */}
          
          {/* Car Image */}
          <div className="form-group">
            <label htmlFor="carImage">Car Image:</label>
            <input type="text" id="carImage" name="carImage" value={carData.carImage} onChange={handleInputChange} />
          </div>
          {/* Status */}
          
        </div>

        {/* Booking Information Section */}
        <div className="booking-information">
          
          
          <div className="form-group">
  <label htmlFor="color">STATUS - "BOOKED" or "AVAILABLE"</label>
  <input 
    type="text" 
    id="color" 
    name="color" 
    value={carData.color} 
    onChange={handleInputChange} 
    pattern="^(BOOKED|AVAILABLE)$" 
    title="Please type 'BOOKED' or 'AVAILABLE' " 
  />
</div>

        </div>

        <button className="submit-button" type="submit">EDIT</button>
      </form>
    </div>
  );
}

export default EditCarForm;
