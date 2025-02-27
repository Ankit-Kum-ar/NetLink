const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { getSuggestedConnections, getPublicProfile, updateProfile } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/suggestions', verifyToken, getSuggestedConnections);
userRouter.get('/:username', verifyToken, getPublicProfile);
userRouter.patch('/profile', verifyToken, updateProfile);

module.exports = userRouter;