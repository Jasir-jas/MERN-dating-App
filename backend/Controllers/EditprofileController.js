const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const Profile = require('../Models/ProfileDetails');
const upload = require('../config/Cloudinary')

const EditProfileBackend = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        name,
        username,
        email,
        mobile,
        bio,
        profile_image_urls,
        profile_video_urls
    } = req.body;

    console.log('Edit Data reached:', name, username, email, mobile, bio, profile_image_urls, profile_video_urls);

    const user = await User.findById(userId).populate('profile');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    // Check if the user has an associated profile
    if (!user.profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    const profile = user.profile;

    // Update profile fields
    profile.bio = bio || profile.bio;

    if (profile_image_urls && Array.isArray(profile_image_urls)) {
        profile.profile_image_urls = profile_image_urls.filter(url => url); // Remove empty strings
    }

    if (profile_video_urls) {
        profile.profile_video_urls = profile_video_urls;
    }

    // Save the updated profile and user
    await profile.save();
    await user.save();

    res.json({
        success: true,
        message: 'Profile successfully updated',
        user
    });
});

module.exports = { EditProfileBackend };

