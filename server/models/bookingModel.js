import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    location: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    dropDate: { type: Date, required: true }, // Added dropDate field
    userType: { type: String, required: true },
    citizenshipFile: { type: String } // Store filename of citizenship file
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;
