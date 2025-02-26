const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if any field is empty
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check length of password
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Hash the password before saving it to the database.
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            name,
            username,
            email,
            password: hashPassword
        });

        // Create a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Send the token as a cookie
        res.cookie('token', token, {
            httpOnly: true, // This prevents client side JavaScript from reading the cookie 
            secure: process.env.NODE_ENV === 'production', // This makes sure the cookie is only set in a https secure connection 
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'strict' // The cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites.
        });

        // Send back the user details
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    res.send('Login');
}

const logout = async (req, res) => {
    res.send('Logout');
}

module.exports = { signup, login, logout };
