const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const ProfileVisit = require('../Models/ProfileVisit');
const FriendRequest = require('../Models/FriendRequest');
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


// const checkFriendRequestStatusBackend = asyncHandler(async (req, res) => {
//     const { profileId } = req.params; // Assuming profileId is sent as a URL parameter
//     const userId = req.user._id;

//     // Check if there is an accepted friend request between the users
//     const friendRequest = await FriendRequest.findOne({
//         $or: [
//             { senderId: userId, receiverId: profileId, status: 'accepted' },
//             { senderId: profileId, receiverId: userId, status: 'accepted' }
//         ]
//     });
//     console.log('Friend Request:', friendRequest);

//     if (friendRequest) {
//         return res.json({ success: true, requestAccepted: true });
//     }
//     res.json({ success: true, requestAccepted: false });

// });

module.exports = { individualProfileGetBackend };