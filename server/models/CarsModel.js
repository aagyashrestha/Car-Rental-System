import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    carName: String,
    numberPlate: String,
    category: String,
    color: String,
    carImage: String
});

const CarModel = mongoose.model('Car', carSchema);
export default CarModel;