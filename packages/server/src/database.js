import mongoose from 'mongoose';

// TEMPFIX: As suggested on https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true);

export const connect = async () => {
  const {
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_AUTH = 'admin',
    MONGO_DATABASE = 'moviecast-api',
    MONGO_USER = null,
    MONGO_PASS = null
  } = process.env;

  const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_AUTH}`;

  // Connect to mongo db using mongoose
  await mongoose.connect(uri, { dbName: MONGO_DATABASE, user: MONGO_USER, pass: MONGO_PASS, useNewUrlParser: true });

  console.info(`Connected to ${uri}`);
}

export const disconnect = async () => {
  mongoose.disconnect();
}