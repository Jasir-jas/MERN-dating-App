const asyncHandler = require('express-async-handler');
const FriendRequest = require('../Models/FriendRequest');

const FetchFriendsBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const friends = await FriendRequest.find({
        $or: [
            { senderId: userId, status: 'accepted' },
            { receiverId: userId, status: 'accepted' },
        ]
    }).populate({
        path: 'senderId',
        select: 'name',
        populate: ({
            path: 'profile',
            selecet: 'profile_image_urls'
        })
    }).populate({
        path: 'receiverId',
        select: 'name',
        populate: ({
            path: 'profile',
            select: 'profile_image_urls'
        })
    })
    // console.log('friends:', friends);

    if (!friends || friends.length === 0) {
        return res.status(404).json({ message: 'No friends found' });
    }
    const friendProfile = friends.map(friendRequest => {
        if (friendRequest.senderId.equals(userId)) {
            return {
                friends: friendRequest.receiverId,
                // profile_image_urls: friendRequest.receiverId.profile.profile_image_urls,
            }
        } else {
            return {
                friends: friendRequest.senderId,
                // profile_image_urls: friendRequest.senderId.profile.profile_image_urls,
            };
        }
    })
    console.log('FriendsProfile:', friendProfile);
    res.status(200).json({ success: true, friends: friendProfile });
})
module.exports = { FetchFriendsBackend }