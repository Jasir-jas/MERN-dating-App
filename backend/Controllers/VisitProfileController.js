const VisitProfiles = require('../Models/ProfileVisit')
const asyncHandler = require('express-async-handler')

const visitprofilesBackend = asyncHandler(async (req, res) => {
    const ownerId = req.user._id

    const visit = await VisitProfiles.find({ ownerId })
        .populate({
            path: 'viewerId',
            select: 'name email',
            populate: {
                path: 'profile',  // Populate profile subdocument
                select: 'profile_image_urls',
            },
        })
        .sort({ viewDate: -1 })
    res.json({ success: true, visitedProfiles: visit })

})
module.exports = { visitprofilesBackend }