const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chatting_images',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        public_id: (req, file) => `chat_${Date.now()}_${file.originalname.split('.')[0]}`
    }
});

const chatImageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

module.exports = chatImageUpload;