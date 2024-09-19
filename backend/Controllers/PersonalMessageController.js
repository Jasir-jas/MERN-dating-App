const asyncHandler = require('express-async-handler');
const User = require('../Models/User');

const fetchMessageProfileBackend = asyncHandler(async (req, res) => {
    const { profileId } = req.query

    const user = await User.findById({ _id: profileId })
    const profileName = user.name
    res.json({ success: true, profileName })



})
module.exports = { fetchMessageProfileBackend }