import express from "express";
import bcryt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
        return res.json({ status: true, message: 'Login successful', role: 'user', redirectTo: '/' });
      } else if (role === 'admin') {
        return res.json({ status: true, message: 'Login successful', role: 'admin', redirectTo: '/admin' });
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


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "np03cs4s230086@heraldcollege.edu.np",
        pass: "eivz yzut hbaa prag",
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: "np03cs4s230086@heraldcollege.edu.np",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcryt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json("invalid token");
  }
});

const verifyUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ status: false, message: "no token" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      next()
  
    } catch (err) {
      return res.json(err);
    }
  };
  


router.get("/verify",verifyUser, (req, res) => {
    return res.json({status: true, message: "authorized"})
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})


export { router as UserRouter };
