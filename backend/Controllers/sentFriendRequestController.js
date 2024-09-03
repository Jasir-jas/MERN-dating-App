const asyncHandler = require('express-async-handler')
const FriendRequest = require('../Models/FriendRequest');

const sentRequestBackend = asyncHandler(async (req, res) => {
    const { receiverId } = req.body
    const senderId = req.user._id

    const alreadySent = await FriendRequest.findOne({ senderId, receiverId })
    if (alreadySent) {
        return res.json({ error: 'Request already sented' })
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