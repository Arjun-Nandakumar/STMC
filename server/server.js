// server/server.js

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle booking/enquiry
app.post('/enquiry', (req, res) => {
  const { service, timestamp } = req.body;

  // Create transporter using Yahoo SMTP
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to same admin
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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
