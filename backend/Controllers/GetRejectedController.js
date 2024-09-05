const asyncHandler = require('express-async-handler');
const FriendRequest = require('../Models/FriendRequest');

const getRejectedReqBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id
    console.log('ReceiverId:', userId);

    const rejectedRequest = await FriendRequest.find({
        receiverId: userId,
        status: 'rejected'
    }).populate({
        path: 'senderId',
        select: 'name',
        populate: {
            path: 'profile',
            select: 'profile_image_urls'
        }
    })
    console.log('rejected Request:', rejectedRequest);
    res.json({ success: true, rejectedRequest })
})

module.exports = { getRejectedReqBackend }
