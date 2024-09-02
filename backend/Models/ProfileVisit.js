const mongoose = require('mongoose');

const ProfileVisitSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true  // Index for faster queries
    },
    viewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true  // Index for faster queries
    },
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Profile',
    //     required: true
    // },
    ownerEmail: {
        type: String,
        require: true
    },
    viewDate: {
        type: Date,
        default: Date.now
    }
});

const ProfileVisit = mongoose.model('ProfileVisit', ProfileVisitSchema);

module.exports = ProfileVisit;
