const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    // Get token from headers
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Check if user exists in the database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { verifyToken };