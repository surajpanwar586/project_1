// server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
const port = 3000;

const MONGO_URI = 'mongodb+srv://suraj:suraj123@cluster0.ruc3ah6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB!'))
    .catch(err => console.error('❌ Database connection error:', err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---

// GET products
app.get('/api/products', (req, res) => {
    fs.readFile('../products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading product data');
        }
        res.json(JSON.parse(data));
    });
});

// POST route for user signup
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup.' });
    }
});

// --- NEW: POST route for user login ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by their email in the database
        const user = await User.findOne({ email: email });
        if (!user) {
            // If no user is found with that email
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        // 2. Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the passwords do not match
            return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
        }

        // 3. If login is successful, send back the user's information (excluding the password)
        res.status(200).json({
            message: 'Login successful!',
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});