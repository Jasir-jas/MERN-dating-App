const asyncHandler = require('express-async-handler');
const FriendRequest = require('../Models/FriendRequest');

const getAcceptedReqBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const profileId = req.query.profileId;

    console.log('Current User ID:', userId);

    if (profileId) {
        const friendRequest = await FriendRequest.findOne({
            $or: [
                { senderId: userId, receiverId: profileId },
                { senderId: profileId, receiverId: userId }
            ]
        });

        console.log('Friend Request:', friendRequest);

        if (friendRequest) {
            res.json({ success: true, status: friendRequest.status });
        } else {
            res.json({ success: true, status: 'none' });
        }
    }
    else {
        console.log('Fetching all accepted requests for ReceiverId:', userId);

        const acceptedRequests = await FriendRequest.find({
            receiverId: userId,
            status: 'accepted'
        }).populate({
            path: 'senderId',
            select: 'name',
            populate: {
                path: 'profile',
                select: 'profile_image_urls'
            }
        });
        console.log('Accepted Requests:', acceptedRequests);
        res.json({ success: true, acceptedRequests });
    }
});

module.exports = { getAcceptedReqBackend };