const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const ProfileVisit = require('../Models/ProfileVisit');
const mongoose = require('mongoose');

const individualProfileGetBackend = asyncHandler(async (req, res) => {
    const { profileId, userId } = req.query;
    console.log('ProfileId reached:', profileId, 'userId:', userId);

    if (!mongoose.Types.ObjectId.isValid(profileId) || !mongoose.Types.ObjectId.isValid(userId)) {
        console.log('Invalid profileId or userId');
        return res.status(400).json({ error: 'Invalid profileId or userId' });
    }

    const profile = await User.findById(profileId).populate('profile').populate('employer');
    if (!profile) {
        console.log('Profile not found');
        return res.status(404).json({ error: 'Profile not found' });
    }

    if (profileId !== userId) {
        await ProfileVisit.findOneAndUpdate(
            {
                ownerId: profileId,
                viewerId: userId,
                ownerEmail: profile.email
            },
            { $set: { viewDate: new Date() } },
            { upsert: true, new: true }
        );
        console.log(`User ${userId} viewed profile ${profileId}`);
    }

    res.json({ success: true, profile });
});

module.exports = { individualProfileGetBackend };