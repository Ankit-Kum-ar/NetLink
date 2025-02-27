const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recipient is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['like', 'comment', 'connectionAccepted'],
            message: 'Invalid type'
        }
    },
    relatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Related user is required']
    },
    relatedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;