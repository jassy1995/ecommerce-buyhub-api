import {
  CopyObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import 'dotenv/config';
import sharp from 'sharp';
import axios from 'axios';

const region = process.env.AWS_REGION!;
const bucketName = process.env.S3_BUCKET_NAME!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const accessKeyId = process.env.AWS_ACCESS_KEY!;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const FileService = {
  async upload(file: Express.Multer.File, key: string) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3.send(command);
    return key;
  },
  async delete(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3.send(command);
  },
  async rename(oldKey: string, newKey: string) {
    const command = new CopyObjectCommand({
      Bucket: bucketName,
      CopySource: `${bucketName}/${oldKey}`,
      Key: newKey,
    });
    await s3.send(command);
    await this.delete(oldKey);
    return newKey;
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
  async getImageBufferFromLink(url: string) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      return Buffer.from(response.data);
    } catch (error) {
      return null;
    }
  },
};

export default FileService;
