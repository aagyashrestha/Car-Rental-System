import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.json({ status: true, message: 'Record registered' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'User is not registered' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ status: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
    const recipients1 = [email]; // Assuming email is defined 
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