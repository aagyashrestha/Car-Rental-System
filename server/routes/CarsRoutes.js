
import express from 'express';
import multer from 'multer';
import { addCar, getAllCars, getCarById, updateCarById, deleteCarById } from '../controller/CarsContoller.js';

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename for uploaded files
    }
});

const upload = multer({ storage: storage });

// Route to add a new car with image upload
router.post('/addcar', upload.single('carImage'), addCar);

// Route to fetch all cars
router.get('/', getAllCars);

// Route to fetch a single car by ID
router.get('/:id', getCarById);

// Route to update a car by ID
router.put('/:id', updateCarById);

// Route to delete a car by ID
router.delete('/:id', deleteCarById);

export { router as CarRouter };