const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// TODO (stretch-goal): Check if setting 'secure: true' fixes Cloudinary image delete issue
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: false,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'itemImages',
    use_filename: true,
    overwrite: true,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
