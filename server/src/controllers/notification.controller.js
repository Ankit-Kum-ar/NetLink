const Notification = require("../models/notification.model");

const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .sort({ createdAt: -1 })
            .populate('relatedUser', 'name username profilePicture')
            .populate('relatedPost', 'content image');

        res.status(200).json({
            status: 'success',
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

module.exports = {
    getUserNotifications
}