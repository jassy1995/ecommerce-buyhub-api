import mongoose from 'mongoose';
import logger from '../lib/logger';

const schema = new mongoose.Schema(
  {
    shortName: { type: String, required: true },
    fullName: { type: String, required: true },
  },
  {
    timestamps: false,
  }
);

const Size = mongoose.model('Size', schema);

Size.syncIndexes().catch((e: any) => logger.error(e));

export default Size;
