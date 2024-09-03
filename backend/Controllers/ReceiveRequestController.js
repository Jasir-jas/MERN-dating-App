const asyncHandler = require('express-async-handler')
const FriendRequest = require('../Models/FriendRequest');

const getReceiveRequestBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const receiveRequests = await FriendRequest.find({ receiverId: userId }).populate({
        path: 'senderId',
        select: 'name',
        populate: {
            path: 'profile',
            select: 'profile_image_urls'
        }
    }).sort({ createdAt: -1 })
    res.json({ success: true, receiveRequests })
})

const AcceptRequestBackend = asyncHandler(async (req, res) => {
    const { senderId } = req.body;
    const userId = req.user._id;
    console.log('SenderId here:', senderId, 'And:', userId);

    const acceptRequest = await FriendRequest.findOne({
        senderId: senderId,
        receiverId: userId,
        status: 'pending'
    });

    if (acceptRequest) {
        acceptRequest.status = 'accepted';
        await acceptRequest.save();

        console.log('Friend Request accepted');
        return res.json({ success: true, message: 'Friend Request accepted' });
    } else {
        return res.json({ error: 'Invalid or already processed request.' });
    }
});

module.exports = { getReceiveRequestBackend, AcceptRequestBackend }