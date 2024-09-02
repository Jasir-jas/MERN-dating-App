const asyncHandler = require('express-async-handler')
const jobStatus = require('../Models/jobStatus');
const User = require('../Models/User');

const JobStatusBackend = asyncHandler(async (req, res) => {
    const { type, companyName, designation, location, jobTitle, expertiseLevel } = req.body
    console.log("Employee Data:", type, companyName, designation, location, jobTitle, expertiseLevel);

    if (type === 'employer' && (!companyName || !designation || !location)) {
        return res.json({ error: 'All fields are required' })
    }
    if (type === 'jobSeeker' && (!jobTitle || !expertiseLevel)) {
        return res.json({ error: 'All fields are required' })
    }
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
        console.log('User Not found');
        return res.json({ error: 'User not Found' })
    }

    const savedJobStatus = new jobStatus({
        userId: user,
        email: user.email,
        type,
        companyName,
        designation,
        location,
        jobTitle,
        expertiseLevel
    })
    await savedJobStatus.save()

    user.employer = savedJobStatus._id
    await user.save()

    console.log(('Job Status Saved'));
    return res.json({ success: true, message: 'Job Status Saved', savedJobStatus })
})
module.exports = { JobStatusBackend }