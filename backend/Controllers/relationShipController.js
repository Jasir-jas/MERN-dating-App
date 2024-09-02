const asyncHandler = require('express-async-handler')
const User = require('../Models/User');
const Profile = require('../Models/ProfileDetails');

const RelationShipGoals = asyncHandler(async (req, res) => {
    const { relationShipGoal, gender, location } = req.body;
    console.log("Status:", relationShipGoal, gender, location);
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(userId, { relationShipGoal }, { new: true });

    let locationData;
    if (typeof location === 'string') {
        locationData = { location: { name: location } };
    } else if (location && location.name) {
        locationData = {
            location: {
                lat: location.lat,
                lon: location.lon,
                name: location.name
            }
        };
    }
    const profile = await Profile.findOneAndUpdate(
        { userId: userId },
        { gender, ...locationData },
        { new: true }
    );

    if (!profile) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    return res.json({ success: true, message: 'Saved', user, profile });
});

const ChooseApp = asyncHandler(async (req, res) => {
    const { chooseApp } = req.body
    console.log("Status:", chooseApp);
    const userId = req.user._id

    const user = await User.findByIdAndUpdate(userId, { chooseApp }, { new: true })
    console.log('Saved the status');
    return res.json({ success: true, message: 'Saved', user })
})

module.exports = { RelationShipGoals, ChooseApp }