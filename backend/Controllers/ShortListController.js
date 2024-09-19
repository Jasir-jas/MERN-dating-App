const asyncHandler = require('express-async-handler')
const ShortList = require('../Models/ShortList');

const ShortListBackend = asyncHandler(async (req, res) => {
    const { profileId } = req.body
    const userId = req.user._id

    const existUser = await ShortList.findOne({ userId: userId, shortListedUserId: profileId })
    if (existUser) {
        return res.json({ error: 'Alredy ShortListed' })
    }
    const shortList = new ShortList({
        userId,
        shortListedUserId: profileId
    })
    await shortList.save()
    return res.json({ success: true, message: 'ShortListed successfully' })
})

const getShortlistedBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const shortlistedProfiles = await ShortList.find({
        userId: userId
    }).populate({
        path: 'shortListedUserId',
        select: 'name',
        populate: ({
            path: 'profile',
            select: 'profile_image_urls'
        })
    })
    res.json({ success: true, shortlistedProfiles })
})

const removeShortlistBackend = asyncHandler(async (req, res) => {
    const { profileId } = req.body
    const userId = req.user._id

    const removeShortList = await ShortList.findOneAndDelete({
        shortListedUserId: profileId,
        userId
    })
    if (removeShortList) {
        return res.json({ success: true, message: 'Short list profile removed' })
    } else {
        return res.json({ error: 'Profile not found' })

    }
})

const getShortListedByBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const shortListedBy = await ShortList.find({
        shortListedUserId: userId
    }).populate({
        path: 'userId',
        select: 'name',
        populate: {
            path: 'profile',
            select: 'profile_image_urls'
        }
    });
    res.json({ success: true, shortListedBy });
});

module.exports = { ShortListBackend, getShortlistedBackend, removeShortlistBackend, getShortListedByBackend }