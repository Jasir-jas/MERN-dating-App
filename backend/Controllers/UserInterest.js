const User = require('../Models/User')
const asyncHandler = require('express-async-handler')

const UserInterest = asyncHandler(async (req, res) => {
    const { userInterest } = req.body
    if (!userInterest) {
        return res.json({ error: 'User Interest is required' })
    }
    const userId = req.user._id

    const user = await User.findByIdAndUpdate(userId, { userInterest },
        { new: true, runValidators: true })

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, user, message: 'User Interest Saved' })
})

module.exports = { UserInterest }