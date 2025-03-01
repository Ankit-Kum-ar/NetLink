const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { getUserNotifications } = require('../controllers/notification.controller');

const notificationRouter = express.Router();

notificationRouter.get('/', verifyToken, getUserNotifications);

module.exports = notificationRouter;