const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: false,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "itemImages",
    use_filename: true,
    overwrite: true,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;