import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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

  const HandlePayment = (data, actions) => {
    return actions.order.capture().then(function(details) {
      alert("Transaction completed by " + details.payer.name.given_name);
      // You can add additional logic here after successful payment
    });
  };

  return (
    <div className="imagecontainer">
    <div className="edit-car-form-container">
      <h3>BOOKING FORM</h3>
      <br />
      <br />
      <form className="edit-car-form" onSubmit={handleSubmit}>
        {/* Car Information Section */}
        <div className="car-information">
          {/* Car Name */}
          <div className="form-group">
            <label htmlFor="carName">Car Name:</label>
            <input type="text" id="carName" name="carName" value={carData.carName} onChange={handleInputChange} readOnly />
          </div>
          {/* Number Plate */}
          <div className="form-group">
            <label htmlFor="numberPlate">Number Plate:</label>
            <input type="text" id="numberPlate" name="numberPlate" value={carData.numberPlate} onChange={handleInputChange} readOnly />
          </div>
          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={carData.category} onChange={handleInputChange} readOnly />
          </div>
        </div>

        {/* Booking Information Section */}
        <div className="booking-information">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          {/* Pickup Date */}
          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date:</label>
            <input type="date" id="pickupDate" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
          </div>
          {/* Drop Date */}
          <div className="form-group">
            <label htmlFor="dropDate">Drop Date:</label>
            <input type="date" id="dropDate" value={dropDate} onChange={(e) => setDropDate(e.target.value)} required />
          </div>
          {/* User Type */}
          <div className="form-group">
            <label>Choose:</label>
            <div className="radio-button">
              <label>
                <input type="radio" value="local" checked={userType === "local"} onChange={(e) => setUserType(e.target.value)} required />
                Local Resident
              </label>
              <label>
                <input type="radio" value="tourist" checked={userType === "tourist"} onChange={(e) => setUserType(e.target.value)} required />
                Tourist
              </label>
            </div>
          </div>
          {/* File Upload */}
          {userType === "local" && (
            <div className="form-group">
              <label htmlFor="citizenshipFile">Upload Citizenship:</label>
              <input id="citizenshipFile" type="file" onChange={handleFileChange} />
            </div>
          )}
          {userType === "tourist" && (
            <div className="form-group">
              <label htmlFor="passportFile">Upload Passport:</label>
              <input id="passportFile" type="file" onChange={handleFileChange} />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="color">Type "BOOKED" if you want to book!</label>
            <input 
              type="text" 
              id="color" 
              name="color" 
              value={carData.color} 
              onChange={handleInputChange} 
              pattern="^(BOOKED|AVAILABLE)$" 
              title="Please type 'BOOKED' " 
            />
          </div>
          {/* PayPal Buttons */}
          <PayPalScriptProvider options={{ "client-id": "AYLMRe0K5vC5nDAxcc_qTjRVtaNREd0JFWkS8Vb4ZuGa9QrZjagJA2fSKXvSQp8ibG20i860TcnfbRRZ" }}>
            <PayPalButtons
              style={{ layout: "horizontal", width: "200%"  }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                  {
                  amount: {
                  value: "10.00", // Replace with the total amount
                  },
                  },
                  ],
                  });
                  }}
                  onApprove={HandlePayment}
                  />
                  </PayPalScriptProvider>
                  <button className="submit-button" type="submit">BOOK</button>
                  </div>
                  </form>
                  </div>
                  </div>
                  );
                  }
                  
 export default EditCarForm;
                  
                  
