import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';

// Support .env in apps/api directory or repository root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bhumilink';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'bhumilink';

// Cache connection promise across serverless invocations
let cachedPromise: Promise<typeof mongoose | null> | null = null;

/**
 * Mask credentials in MongoDB connection string for safe logging.
 */
export function sanitizeMongoUri(uri: string): string {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
}

/**
 * Connect to MongoDB with connection reuse for serverless and containerized environments.
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  // 1. If connection is already established, return existing instance immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // 2. If a connection attempt is in-flight, await the existing promise to avoid parallel handshakes
  if (cachedPromise) {
    return cachedPromise;
  }

  // 3. Initiate connection and cache the promise
  const sanitizedUri = sanitizeMongoUri(MONGODB_URI);
  console.log(`[Database] Connecting to MongoDB: ${sanitizedUri} (Database: ${MONGODB_DB_NAME})...`);

  cachedPromise = mongoose
    .connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      bufferCommands: false,
    })
    .then((conn) => {
      console.log(`[Database] MongoDB connected successfully to ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    })
    .catch((err: any) => {
      cachedPromise = null;
      console.error(`[Database] MongoDB connection error: ${err.name || 'Error'} - ${err.message || err}`);
      return null;
    });

  return cachedPromise;
}

/**
 * Disconnect from MongoDB (used during graceful shutdown or CLI scripts).
 */
export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    cachedPromise = null;
    console.log('[Database] MongoDB disconnected.');
  }
}

/**
 * Middleware for routes that require database connectivity.
 * Awaits connection readiness without blocking unrelated endpoints.
 */
export async function ensureDbConnection(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const conn = await connectDB();
    if (!conn || mongoose.connection.readyState !== 1) {
      res.status(503).json({
        status: 'error',
        message: 'Database connection is temporarily unavailable. Please retry shortly.',
      });
      return;
    }
    next();
  } catch {
    res.status(503).json({
      status: 'error',
      message: 'Failed to establish database connection.',
    });
  }
}

// Lifecycle listeners
mongoose.connection.on('error', (err) => {
  console.error('[Database] Connection event error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  cachedPromise = null;
  console.warn('[Database] Connection event: disconnected.');
});
