import express from 'express';
import multer from 'multer';
import { createBooking } from '../controller/bookingController.js';

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

router.post('/create', upload.single('citizenshipFile'), createBooking);

export { router as BookingRouter };
