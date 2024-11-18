import 'dotenv/config';
import sharp from 'sharp';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const FileService = {
  async upload(filePath: string) {
    return await cloudinary.uploader.upload(filePath, { folder: 'next-ecommerce-app-images' });
  },
  compressImage(image: Buffer, size: number) {
    const builder = sharp(image);
    builder.resize(size);
    builder.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      force: true,
      quality: 80,
    });
    return builder.toBuffer();
  },
};

export default FileService;
