// Import necessary modules

import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    numberPlate: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    carImage: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true }, // New price field
    count: { type: Number, required: true, default:0 }
});

const CarModel = mongoose.model('Car', carSchema);

export default CarModel;
