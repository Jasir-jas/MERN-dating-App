const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true
    },
    hobbies: {
        type: [String],
        required: true,
    },
    interest: {
        type: [String],
        required: true,
    },
    smokingHabits: {
        type: String,
        required: true,
    },
    drinkingHabits: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    profile_image_urls: {
        type: [String],
        required: true
    },
    profile_video_urls: {
        type: String,
    },
    bio: { type: String },
    gender: { type: String, required: false },
    location: {
        type: {
            lat: { type: Number },
            lon: { type: Number },
            name: { type: String }
        },
        required: false
    }
});

module.exports = mongoose.model('Profile', profileSchema);