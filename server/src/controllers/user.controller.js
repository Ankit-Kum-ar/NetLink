const User = require("../models/user.model");
const cloudinary = require('../config/cloudinary');

const getSuggestedConnections = async (req, res) => {
    try {
        const currentUser = req.user; // This is the current user's connections array

        // Find users who are not in the current user's connections array and don't include the current user.
        const suggestedUsers = await User.find({
            _id: { $nin: [...currentUser.connections, currentUser._id] }
        }).select('name username profilePicture headline').limit(3);

        res.status(200).json({ suggestedUsers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPublicProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'User found successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const ALLOWED_FIELDS = [
            'name',
            'username',
            'email',
            'headline',
            'location',
            'profilePicture',
            'about',
            'skills',
            'bannerImg',
            'experience',
            'education'
        ];

        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) => ALLOWED_FIELDS.includes(update)); 

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        // Update the user's profile and bannerImg using cloudinary
        if (req.body.profilePicture) {
            // Upload the image to cloudinary
            const profilePicture = await cloudinary.uploader.upload(req.body.profilePicture, {
                upload_preset: 'dev_setups'
            });

            req.body.profilePicture = profilePicture.secure_url;
        }
        if (req.body.bannerImg) {
            // Upload the image to cloudinary
            const bannerImg = await cloudinary.uploader.upload(req.body.bannerImg, {
                upload_preset: 'dev_setups'
            });

            req.body.bannerImg = bannerImg.secure_url;
        }

        updates.forEach((update) => req.user[update] = req.body[update]);

        await req.user.save();
        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getSuggestedConnections, getPublicProfile, updateProfile };