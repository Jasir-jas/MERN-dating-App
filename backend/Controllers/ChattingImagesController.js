const asyncHandler = require('express-async-handler');
const chatImageUpload = require('../config/ChatImageCloudinary'); // Cloudinary config path

// POST route to upload message images
const ChattingImageUploadBackend = [
    asyncHandler(async (req, res, next) => {
        req.isMessageImage = true; // Set this flag for message uploads
        next();
    }),
    chatImageUpload.single('attachments'),
    asyncHandler(async (req, res) => {
        // Handle the response after the image is uploaded
        if (req.file) {
            res.json({
                success: true,
                imageUrl: req.file.path,
                publicId: req.file.filename // Include the public_id for potential future use
            });
        } else {
            res.status(400).json({ success: false, message: 'Image upload failed' });
        }
    })
];

module.exports = { ChattingImageUploadBackend };