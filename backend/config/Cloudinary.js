require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        const extension = file.mimetype.split('/')[1];
        const folder = file.mimetype.startsWith('video') ? 'profile_videos' : 'profile_pics';


        return {
            folder: folder,
            format: extension,
            public_id: `${file.originalname.split('.')[0]}_${Date.now()}`, // Added timestamp to avoid naming conflicts
            resource_type: 'auto',
        };
    }
});

const upload = multer({ storage });

module.exports = upload;