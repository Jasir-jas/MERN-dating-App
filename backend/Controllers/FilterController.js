const asyncHandler = require('express-async-handler');
const Profile = require('../Models/ProfileDetails');
const User = require('../Models/User');


const FilterQualificationBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find the current user's profile directly by their ID
    const userProfile = await Profile.findOne({ userId: userId }).populate({
        path: 'userId',
        select: 'name gender userInterest'
    })
    if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
    }
    const userInterest = userProfile.userId.userInterest
    let genderFilter
    if (userInterest === 'MEN') {
        genderFilter = { gender: 'MEN' }
    } else if (userInterest === 'WOMEN') {
        genderFilter = { gender: 'WOMEN' }
    } else if (userInterest === 'BOTH') {
        genderFilter = { gender: { $in: ['MEN', 'WOMEN'] } }
    }

    const profiles = await Profile.find({
        qualification: { $regex: new RegExp('^' + userProfile.qualification + '$', 'i') },
        userId: { $ne: userId }
    }).populate({
        path: 'userId',
        select: 'name gender'
    })
    res.status(200).json({ FilterQualifications: profiles, success: true });
});

module.exports = { FilterQualificationBackend };
