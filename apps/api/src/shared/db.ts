import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Support .env in apps/api directory or repository root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bhumilink';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'bhumilink';

let isConnected = false;

/**
 * Mask credentials in MongoDB connection string for safe logging.
 */
export function sanitizeMongoUri(uri: string): string {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    const sanitizedUri = sanitizeMongoUri(MONGODB_URI);
    console.log(`[Database] Connecting to MongoDB: ${sanitizedUri} (Database: ${MONGODB_DB_NAME})...`);

    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });

    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err: any) {
    isConnected = false;
    // Log non-sensitive error message only
    console.error(`[Database] MongoDB connection error: ${err.name || 'Error'} - ${err.message || err}`);
    return null;
  }
}

export async function disconnectDB(): Promise<void> {
  if (isConnected || mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] MongoDB disconnected.');
  }
}

// Lifecycle listeners
mongoose.connection.on('error', (err) => {
  console.error('[Database] Connection event error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[Database] Connection event: disconnected.');
});
