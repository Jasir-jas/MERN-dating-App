const asyncHandler = require('express-async-handler');
const Profile = require('../Models/ProfileDetails')
const User = require('../Models/User')



const Uploads = asyncHandler(async (req, res) => {
    const files = req.files;
    const fileUrls = [];

    if (!files || Object.keys(files).length === 0) {
        throw new Error("No files uploaded");
    }

    for (let key in files) {
        // If files[key] is not an array, convert it to an array
        const fileArray = Array.isArray(files[key]) ? files[key] : [files[key]];

        fileArray.forEach(file => {
            fileUrls.push(file.path);
        });
    }

    res.json({
        success: true,
        message: "Files successfully uploaded",
        fileUrls
    });
});


const validateProfileData = (data) => {
    const { age, dateofbirth, hobbies, interest, qualification, smokingHabits, drinkingHabits, profile_image_urls, profile_video_urls } = data;

    if (!age || !dateofbirth || !hobbies || !interest || !qualification || !smokingHabits || !drinkingHabits || !profile_image_urls || !profile_video_urls) {
        return { error: "All fields are required" };
    }
    return null;
};


const ProfileDetails = asyncHandler(async (req, res) => {
    const validationError = validateProfileData(req.body);
    if (validationError) {
        return res.status(400).json(validationError);
    }

    const { age, dateofbirth, hobbies, interest, qualification, smokingHabits, drinkingHabits, profile_image_urls, profile_video_urls } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const profile = new Profile({
            userId,
            age,
            dateofbirth,
            hobbies,
            interest,
            qualification,
            smokingHabits,
            drinkingHabits,
            profile_image_urls,
            profile_video_urls,
            email: user.email,
        });
        await profile.save();
        
        user.profile = profile._id
        await user.save()

        return res.json({ success: true, message: "Profile added successfully", profile });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message, details: error.errors });
        } else {
            return res.status(500).json({ error: "Server error, please try again later" });
        }
    }
});

module.exports = { Uploads, ProfileDetails };