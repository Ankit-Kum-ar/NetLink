const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must not be more than 50 characters long']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must not be more than 50 characters long']
    },
    email : {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please provide a valid email address');
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not strong enough');
            }
        }
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bannerImg: {
        type: String,
        default: ''
    },
    headline: {
        type: String,
        default: 'NetLink User'
    },
    location: {
        type: String,
        default: 'Earth'
    },
    about: {
        type: String,
        default: 'Hi, I am using NetLink'
    },
    skills: {
        type: [String],
        default: []
    },
    exprerience: [{ // This is method to create subdocument in mongoose schema. This is an array of objects where each object is a subdocument with its own properties and schema definition.
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    education: [{
        school: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
    }],
    connections: [{ // This is a method to create a reference to another document in mongoose schema. This is an array of objects where each object is a reference to another document.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;