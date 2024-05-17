import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ status: 'user_exists', message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    
    return res.status(201).json({ status: 'success', message: 'Record registered' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User is not registered' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ status: false, message: 'Password is incorrect' });
    }

    if (role !== user.role) {
      return res.status(400).json({ status: false, message: 'Role is incorrect' });
    }

    const redirectTo = role === 'admin' ? '/admin' : '/';
    return res.json({ status: true, message: 'Login successful', role, redirectTo });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not registered' });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'np03cs4s230086@heraldcollege.edu.np',
        pass: 'your-email-password', // Replace with actual password or use environment variables
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, '%2E');
    const mailOptions = {
      from: 'np03cs4s230086@heraldcollege.edu.np',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        return res.json({ status: true, message: 'Email sent' });
      }
    });
  } catch (error) {
    console.error('Error during forgot password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/contact', async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    const token = jwt.sign({ email }, process.env.KEY, { expiresIn: '5m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'np03cs4s230086@heraldcollege.edu.np',
        pass: 'your-email-password', // Replace with actual password or use environment variables
      },
    });

    const mailOptions1 = {
      from: 'np03cs4s230086@heraldcollege.edu.np',
      to: email,
      subject: 'You have sent your issue to us',
      text: 'We will get back to you regarding your issue as soon as possible.',
    };

    const mailOptions2 = {
      from: 'np03cs4s230086@heraldcollege.edu.np',
      to: 'aagya.shrestha12@gmail.com',
      subject,
      text,
    };

    transporter.sendMail(mailOptions1, (error, info) => {
      if (error) {
        console.error('Error sending first email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        transporter.sendMail(mailOptions2, (error, info) => {
          if (error) {
            console.error('Error sending second email:', error);
            return res.status(500).json({ message: 'Error sending email' });
          } else {
            return res.json({ status: true, message: 'Emails sent' });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error during contact:', error);
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

    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return res.json({ status: true, message: 'Password updated' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: 'No token provided' });
    }

    const decoded = await jwt.verify(token, process.env.KEY);
    req.user = decoded; // Optionally store the decoded user info in req.user
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }
};

router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: 'Authorized' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true, message: 'Logged out successfully' });
});

export { router as UserRouter };
