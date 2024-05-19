import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { bookCar } from "../../../serverr/controller/CarsContoller.js";

const BookingForm = () => {
  const { carId } = useParams();
  console.log('carId:', carId);

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [userType, setUserType] = useState('');
  const [citizenshipFile, setCitizenshipFile] = useState(null);
  const [passportFile, setPassportFile] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(carId);
    const formData = new FormData();
    formData.append('username', username);
    formData.append('location', location);
    formData.append('pickupDate', pickupDate);
    formData.append('dropDate', dropDate);
    formData.append('userType', userType);
    
    if (userType === "local" && citizenshipFile) {
      formData.append('citizenshipFile', citizenshipFile);
    } else if (userType === "tourist" && passportFile) {
      formData.append('passportFile', passportFile);
    } else {
      alert('Please upload the required file.');
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3000/booking/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.data.status) {
        alert('Form submitted successfully!');
        // Update the status of the booked car to "Booked"
        // await bookCar(carId, dropDate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Booking Form</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <label htmlFor="pickupDate">Pickup Date:</label>
        <input type="date" id="pickupDate" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required/>
        <br />

        <label htmlFor="dropDate">Drop Date:</label>
        <input type="date" id="dropDate" value={dropDate} onChange={(e) => setDropDate(e.target.value)} required/>
        <br />

        <label>Choose:</label>
        <div className="radio-button">
          <label>
            <input type="radio" value="local" checked={userType === "local"} onChange={(e) => setUserType(e.target.value)} required />
            Local Resident
          </label>
          
          <label>
            <input type="radio" value="tourist" checked={userType === "tourist"} onChange={(e) => setUserType(e.target.value)} required/>
            Tourist
          </label>
        </div>
        <br />

        {userType === "local" && (
          <div>
            <label htmlFor="citizenshipFile">Upload Citizenship:</label>
            <input id="citizenshipFile" type="file" onChange={handleFileChange} />
          </div>
        )}

        {userType === "tourist" && (
          <div>
            <label htmlFor="passportFile">Upload Passport:</label>
            <input id="passportFile" className="file-upload" type="file" onChange={handleFileChange} />
          </div>
        )}

        <button type="submit">Submit</button>
        <PayPalScriptProvider options={{ "client-id": "AYLMRe0K5vC5nDAxcc_qTjRVtaNREd0JFWkS8Vb4ZuGa9QrZjagJA2fSKXvSQp8ibG20i860TcnfbRRZ" }}>
          <PayPalButtons
            style={{ layout: "horizontal" }}
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
      </form>
    </div>
  );
};

export default BookingForm;
