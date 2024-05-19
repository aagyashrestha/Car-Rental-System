import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body; // Add role to destructuring

  try {
    // Check if the user already exists with the provided email
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ status: 'user_exists', message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with role included
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role, // Include the role
    });

    // Save the new user to the database
    await newUser.save();
    
    // Return success response
    return res.json({ status: 'success', message: 'Record registered' });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body; // Add role to destructuring

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: 'User is not registered' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ status: false, message: 'Password is incorrect' });
    }

    // Check role stored in the user document
    if (role === user.role) {
      // Redirect accordingly based on the role
      if (role === 'user') {
        return res.json({ status: true, message: 'Login successful', role: 'user', redirectTo: '/home' });
      } else if (role === 'admin') {
        return res.json({ status: true, message: 'Login successful', role: 'admin', redirectTo: '/cars' });
      } else {
        return res.status(400).json({ status: false, message: 'Role is incorrect' });
      }
    } else {
      return res.status(400).json({ status: false, message: 'Role is incorrect' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
});


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'User not registered' });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: '5m',
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'np03cs4s230086@heraldcollege.edu.np',
        pass: 'nrjl pvau jrkl rczo',
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, '%2E');
    var mailOptions = {
      from: 'np03cs4s230086@heraldcollege.edu.np',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: 'Error sending email' });
      } else {
        return res.json({ status: true, message: 'Email sent' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/contact', async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    const token = jwt.sign({ email }, process.env.KEY, {
      expiresIn: '5m',
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'np03cs4s230086@heraldcollege.edu.np',
        pass: 'nrjl pvau jrkl rczo',
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, '%2E');
    
    // Define recipients arrays for the first and second email
    const recipients1 = [email]; // Assuming email1 is defined elsewhere
    const recipients2 = ['aagya.shrestha12@gmail.com'];

    // First email options
    var mailOptions1 = {
      from: 'np03cs4s230086@heraldcollege.edu.np',
      to: recipients1,
      subject: 'You have sent your issue to us',
      text: 'We will get back to you regarding your issue as soon as possible.',
    };

    // Second email options
    var mailOptions2 = {
      from: 'np03cs4s230086@heraldcollege.edu.np',
      to: recipients2,
      subject: subject, // Use provided subject from request body
      text: text, // Use provided text from request body
    };

    // Send the first email
    transporter.sendMail(mailOptions1, function (error, info) {
      if (error) {
        return res.json({ message: 'Error sending email' });
      } else {
        // Send the second email after the first one is sent
        transporter.sendMail(mailOptions2, function (error, info) {
          if (error) {
            return res.json({ message: 'Error sending email' });
          } else {
            return res.json({ status: true, message: 'Emails sent' });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
    return res.json({ status: true, message: 'Password updated' });
  } catch (error) {
    console.error('Error:', error);
    return res.json('Invalid token');
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: 'No token' });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (error) {
    console.error('Error:', error);
    return res.json(error);
  }
};

router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: 'Authorized' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true });
});

export { router as UserRouter };