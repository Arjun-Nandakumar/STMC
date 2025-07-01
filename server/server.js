// server/server.js

require('dotenv').config(); // <-- Make sure this is at the very top

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/send-booking', (req, res) => {
  const { service, timestamp } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER, // <-- Use env variable
      pass: process.env.EMAIL_PASS  // <-- Use env variable
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,      // <-- Use env variable
    to: process.env.EMAIL_USER,        // <-- Use env variable
    subject: 'New Service Booking Request',
    text: `A user booked a service: ${service}\n\nTime: ${timestamp}`
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

app.listen(5000, () => console.log('Server running on port 5000'));
