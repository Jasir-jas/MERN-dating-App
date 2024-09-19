const asyncHandler = require('express-async-handler')
const jobStatus = require('../Models/jobStatus');
const User = require('../Models/User');
const Profie = require('../Models/ProfileDetails')

const userContext = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId).populate('profile').populate('employer')

    if (!user) {
        return res.json({ error: 'User not found' })
    }
    return res.json({
        success: true, user: {
            googleId: user.googleId || null,
            _id: userId,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            profile: user.profile || null,
            employer: user.employer || null,
            relationShipGoal: user.relationShipGoal,
            chooseApp: user.chooseApp,
            userInterest: user.userInterest,
            username: user.username
        }
    })

})

module.exports = { userContext }