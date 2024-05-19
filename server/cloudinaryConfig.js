// cloudinaryConfig.js

import cloudinary from 'cloudinary';

// Configure Cloudinary with your Cloudinary credentials
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

export default cloudinary;
