import dns from 'node:dns';
import mongoose from 'mongoose';

const CONNECTION_TIMEOUT_MS = 15000;

const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl?.trim()) {
    throw new Error('Required environment variable MONGO_URL is not set.');
  }

  let timeoutId;

  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);

    await Promise.race([
      mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 5000,
      }),
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          const error = new Error(
            `MongoDB connection timed out after ${CONNECTION_TIMEOUT_MS} ms.`,
          );
          error.name = 'MongoDBConnectionTimeoutError';
          reject(error);
        }, CONNECTION_TIMEOUT_MS);
      }),
    ]);

    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    const errorCode =
      error &&
      typeof error === 'object' &&
      ('code' in error) &&
      (typeof error.code === 'string' || typeof error.code === 'number')
        ? `, code ${error.code}`
        : '';

    console.error(
      `MongoDB connection failed (${errorName}${errorCode}). Check DNS/network access, MongoDB Atlas IP access, cluster status, and credentials. MONGO_URL is not logged.`,
    );
    throw new Error('Server startup aborted because MongoDB is unavailable.', {
      cause: error,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

export default connectMongoDB;