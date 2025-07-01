// server/server.js

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy users for login
const USERS = [
  { username: process.env.ADMINUSR, password: process.env.ADMINPWD },
  { username: process.env.LOGIN1, password: process.env.PWD1 }
];

// 🟢 ENQUIRY Route
app.post('/enquiry', (req, res) => {
  const { service, timestamp } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Service Enquiry',
    text: `A user is enquiring more information for the service: ${service}\n\nTime: ${timestamp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      res.status(500).send('Email failed');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent');
    }
  });
});

// 🟢 LOGIN Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

// 🟢 Root Route (optional health check)
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// 🟢 Start server once
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});