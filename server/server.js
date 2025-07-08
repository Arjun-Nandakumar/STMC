require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize users.json if it doesn't exist
async function initUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    // Initialize with admin user from .env
    const adminUser = {
      username: process.env.ADMINUSR,
      password: await bcrypt.hash(process.env.ADMINPWD, 10)
    };
    const initialUsers = [adminUser];
    await fs.writeFile(USERS_FILE, JSON.stringify(initialUsers, null, 2));
  }
}

// 🟢 ENQUIRY Route (unchanged)
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

// 🟢 LOGIN Route (updated to use users.json and bcrypt)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = JSON.parse(await fs.readFile(USERS_FILE));
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🟢 REGISTER Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const users = JSON.parse(await fs.readFile(USERS_FILE));
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🟢 Root Route (unchanged)
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// 🟢 Start server and initialize users file
app.listen(PORT, async () => {
  await initUsersFile();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});