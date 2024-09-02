const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        unique: true,
        sparse: true  // Make the index sparse
    },
    password: { type: String },
    googleId: { type: String },
    photo: String,
    token: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    relationShipGoal: {
        type: String,
        enum: ['shortTerm', 'longTerm']
    },
    chooseApp: {
        type: String,
        enum: ['Dating', 'Matrimony']
    },
    userInterest: {
        type: String,
        enum: ['MEN', 'WOMEN', 'BOTH']
    },
    username: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Add a pre-save hook to validate required fields based on authentication type
userSchema.pre('save', function (next) {
    if (this.googleId) {
        // For Google-authenticated users, password and mobile are not required
        this.password = undefined;
        this.mobile = undefined;  // Set mobile to undefined
    } else {
        // For regular users, password and mobile are required
        if (!this.password) {
            return next(new Error('Password is required for non-Google users'));
        }
        if (!this.mobile) {
            return next(new Error('Mobile number is required for non-Google users'));
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
