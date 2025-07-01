require('dotenv').config();

// In your transporter config:
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}

// server/server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/send-ENQUIREing', (req, res) => {
  const { service, timestamp } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'stmconsult@yahoo.com',
    to: 'stmconsult@yahoo.com', // Admin or recipient email
    subject: 'New Service ENQUIREing Request',
    text: `A user ENQUIREed a service: ${service}\n\nTime: ${timestamp}`
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
