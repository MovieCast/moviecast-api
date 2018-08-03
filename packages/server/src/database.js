import mongoose from 'mongoose';
import { URL } from 'url';

export const connect = async () => {
  const {
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_DATABASE = 'moviecast-api',
    MONGO_USER = null,
    MONGO_PASS = null
  } = process.env;

  const uri = new URL(`mongodb://${MONGO_USER || ''}:${MONGO_PASS || ''}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`);

  // Connect to mongo db using mongoose
  await mongoose.connect(uri.href);
  console.info(`Connected to ${uri.href}`);
}

export const disconnect = async () => {
  mongoose.disconnect();
}