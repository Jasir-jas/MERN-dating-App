const Profile = require('../Models/ProfileDetails');
const asyncHandler = require('express-async-handler');
const User = require('../Models/User');



const UserHomeProfilesBackend = asyncHandler(async (req, res) => {
    const loggedInUser = req.user; // Assuming you're using middleware to set the logged-in user

    // Step 1: Find users excluding the logged-in user
    let users = await User.find({
        _id: { $ne: loggedInUser._id }  // Exclude the logged-in user
    })
        .populate({
            path: 'profile',
            select: 'gender age profile_image_urls bio location',  // Select fields from profile
        })
        .populate({
            path: 'employer',
            select: 'type jobTitle companyName designation location',  // Select fields from employer
        })
        .exec();

    let filteredUsers;
    if (loggedInUser.userInterest === 'MEN') {
        filteredUsers = users.filter(user => user.profile && user.profile.gender === 'male');
    } else if (loggedInUser.userInterest === 'WOMEN') {
        filteredUsers = users.filter(user => user.profile && user.profile.gender === 'female');
    } else {
        // If userInterest is 'BOTH', no need to filter
        filteredUsers = users;
    }
    // console.log('Profiles:', filteredUsers);

    // Step 3: Send the filtered profiles as response
    res.status(200).json({ success: true, profiles: filteredUsers });

})
module.exports = { UserHomeProfilesBackend }