import mongoose from 'mongoose';
import { URL } from 'url';

export const connect = async () => {
  const {
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_AUTH = 'admin',
    MONGO_DATABASE = 'moviecast-api',
    MONGO_USER = null,
    MONGO_PASS = null
  } = process.env;

  const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

  // Connect to mongo db using mongoose
  await mongoose.connect(uri, { authdb: MONGO_AUTH, dbName: MONGO_DATABASE, user: MONGO_USER, pass: MONGO_PASS });
  console.info(`Connected to ${uri}`);
}

export const disconnect = async () => {
  mongoose.disconnect();
}