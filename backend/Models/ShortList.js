const mongoose = require('mongoose')

const ShortListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shortListedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ShortListSchema.index({ userId: 1, shortListedUserId: 1 }, { unique: true });

ShortListSchema.pre('save', function (next) {
    if (this.userId.equals(this.shortListedUserId)) {
        throw new Error('User cannot shortlist themselves.');
    }
    next();
});

module.exports = mongoose.model('Shortlist', ShortListSchema);
