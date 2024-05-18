import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRouter } from './routes/user.js'
import {BookingRouter} from './routes/bookingRouter.js'
import { CarRouter } from './routes/CarsRoutes.js';
import paypal from '@paypal/checkout-server-sdk';

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)
app.use('/booking', BookingRouter);
app.use('/cars', CarRouter);

const clientId = 'AYLMRe0K5vC5nDAxcc_qTjRVtaNREd0JFWkS8Vb4ZuGa9QrZjagJA2fSKXvSQp8ibG20i860TcnfbRRZ';
const clientSecret = 'EGJr29EWrpVG9qer58KIX20jQM1N6_n_1x8ztHYY4GVFWub4u1FSTSBVqVkjv4mzML8A9ZBapB00rijX';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

app.post('/capture-payment', async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    // You can handle the capture response here
    console.log('Capture successful:', capture);
    res.status(200).json({ success: true, capture });
  } catch (err) {
    console.error('Capture failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
