import CarModel from '../models/CarsModel.js';

// Controller function to handle adding a new car
export const addCar = async (req, res) => {
    try {
        const { carName, numberPlate, category, color } = req.body;
        const carImage = req.file.path; // Get the path of the uploaded image

        // Create a new car instance
        const newCar = new CarModel({
            carName,
            numberPlate,
            category,
            color,
            carImage
        });

        // Save the new car to the database
        await newCar.save();

        // Respond with a success message and the saved car data
        res.status(201).json({ message: 'Car details saved successfully', car: newCar });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while saving car details' });
    }
};
// Controller function to handle fetching all cars
export const getAllCars = async (req, res) => {
    try {
        // Fetch all cars from the database
        const cars = await CarModel.find();

        // Respond with the list of cars
        res.status(200).json({ cars });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while fetching cars' });
    }
};
// Controller function to handle fetching a single car by ID
export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the car with the specified ID from the database
        const car = await CarModel.findById(id);

        // If the car is not found, respond with a 404 status code
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        // Respond with the fetched car data
        res.status(200).json({ car });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while fetching car details' });
    }
};