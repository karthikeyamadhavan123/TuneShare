const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


// Define the User schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long'],
    },
    Songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
    Comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
   
}); // Add createdAt and updatedAt timestamps

const User = mongoose.model('User', UserSchema);
module.exports = User;

// Create and export the User model

