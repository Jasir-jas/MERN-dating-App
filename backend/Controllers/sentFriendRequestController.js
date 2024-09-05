const asyncHandler = require('express-async-handler')
const FriendRequest = require('../Models/FriendRequest');

const sentRequestBackend = asyncHandler(async (req, res) => {
    const { receiverId } = req.body
    const senderId = req.user._id

    const existingRequest = await FriendRequest.findOne({
        $or: [
            { senderId, receiverId, status: 'pending' },
            { senderId: receiverId, receiverId: senderId, status: 'pending' }
        ]
    });
    if (existingRequest) {
        return res.json({ error: 'A friend request has already been sent or receive.' });
    }
    const sentRequest = new FriendRequest({ receiverId, senderId })
    await sentRequest.save()
    res.json({ success: true, message: 'Request sent' })
})

const GetSentRequestBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const sentRequests = await FriendRequest.find({ senderId: userId })
        .populate({
            path: 'receiverId',
            select: 'name email',
            populate: {
                path: 'profile',
                select: 'profile_image_urls'
            }
        }).sort({ createdAt: -1 })
    res.json({ success: true, sentRequests })
})

const removeRequestBackend = asyncHandler(async (req, res) => {
    const { receiverId } = req.body
    const senderId = req.user._id
    console.log('ReceiverId Reached:', receiverId);
    await FriendRequest.findOneAndDelete({ senderId, receiverId })
    res.json({ success: true, message: 'Removed' })
})

module.exports = { sentRequestBackend, GetSentRequestBackend, removeRequestBackend }