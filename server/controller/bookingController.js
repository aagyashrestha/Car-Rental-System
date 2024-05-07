import BookingModel from '../models/bookingModel.js';

// Controller function to create a new booking
const createBooking = async (req, res) => {
    try {
        const { username, location, pickupDate, dropDate, userType } = req.body;
        const newBooking = new BookingModel({
            username,
            location,
            pickupDate,
            dropDate, // Include dropDate in the new booking instance
            userType,
            citizenshipFile: req.file.filename // Retrieve filename from multer upload
        });
        await newBooking.save(); // Save booking data to MongoDB
        res.status(201).json({ status: true, message: 'Booking created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

export { createBooking };
