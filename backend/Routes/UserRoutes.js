const router = require('express').Router()
const { Uploads, ProfileDetails } = require('../Controllers/Profile')
const { RegisterUser, LoginUser } = require('../Controllers/UserController')
const { JobStatusBackend } = require('../Controllers/jobStatusController')
const { RelationShipGoals, ChooseApp } = require('../Controllers/relationShipController')
const { userContext } = require('../Controllers/ContextController')
const upload = require('../config/Cloudinary')
const authentication = require('../Middleware/Authentication')
const { UserInterest } = require('../Controllers/UserInterest')
const { EditProfileBackend } = require('../Controllers/EditprofileController')
const { ChangePasswordBackend } = require('../Controllers/ChangePasswordController')
const { UserHomeProfilesBackend } = require('../Controllers/UserHomeProfilesController')
const { individualProfileGetBackend } = require('../Controllers/IndividualProfileGetController')
const { visitprofilesBackend } = require('../Controllers/VisitProfileController')
const { sentRequestBackend, GetSentRequestBackend } = require('../Controllers/sentFriendRequestController')




router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.post('/upload', authentication, upload.any(), Uploads);
router.post('/profileDetails', authentication, ProfileDetails)
router.post('/job-status', authentication, JobStatusBackend)
router.post('/relation-status', authentication, RelationShipGoals)
router.post('/choose-app', authentication, ChooseApp)
router.post('/userInterest', authentication, UserInterest)
router.post('/edit-profile', authentication, EditProfileBackend)
router.post('/edit-password', authentication, ChangePasswordBackend)
router.post('/sent-friendRequest', authentication, sentRequestBackend)




router.get('/me', authentication, userContext)
router.get('/fetch-allusers', authentication, UserHomeProfilesBackend)
router.get('/get-profile', authentication, individualProfileGetBackend)
router.get('/getVisit-profiles', authentication, visitprofilesBackend)
router.get('/get-sentRequest', authentication, GetSentRequestBackend)






module.exports = router