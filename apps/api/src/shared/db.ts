// ============================= Required ===============================
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion, ObjectId, type Db, type Collection } from 'mongodb';

// Support .env in apps/api directory or repository root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

// ================== Mongo URI and Mongo Client ==============================
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bhumilink';
const dbName = process.env.MONGODB_DB_NAME || 'bhumilink';

/**
 * Mask credentials in MongoDB connection string for safe logging.
 */
export function sanitizeMongoUri(rawUri: string): string {
  return rawUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
}

// Global cached client instance for Vercel serverless invocation reuse
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let database: Db | null = null;

export function getMongoClient(): MongoClient {
  if (!client) {
    if (!process.env.MONGODB_URI) {
      console.warn(
        '[Database Warning] MONGODB_URI is not set. Defaulting to local fallback mongodb://127.0.0.1:27017/bhumilink. In production Vercel, set MONGODB_URI in Project Settings.'
      );
    }
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  return client;
}

// ====================== Connecting to MongoDB ============================
export async function connectDB(): Promise<Db> {
  if (database) {
    return database;
  }

  const mongoClient = getMongoClient();

  if (!clientPromise) {
    const sanitized = sanitizeMongoUri(uri);
    console.log(`[Database] Connecting to MongoDB: ${sanitized} (Database: ${dbName})...`);

    clientPromise = mongoClient
      .connect()
      .then(async (c) => {
        const db = c.db(dbName);
        await db.command({ ping: 1 });
        console.log('Successfully connected to MongoDB!');
        database = db;
        return c;
      })
      .catch((error) => {
        clientPromise = null;
        database = null;
        console.error('MongoDB connection failed:', error.message);
        throw error;
      });
  }

  await clientPromise;
  database = mongoClient.db(dbName);
  return database;
}

export async function disconnectDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    clientPromise = null;
    database = null;
    console.log('[Database] MongoDB connection closed.');
  }
}

// ====================== BhumiLink Collections ============================
export const COLLECTIONS = {
  USERS: 'users',
  LAND_PARCELS: 'landparcels',
  CSRS_RECORDS: 'csrsrecords',
  DEEDS: 'deeds',
  DEED_DOCUMENTS: 'deeddocuments',
  DIGITAL_DOLILS: 'digitaldolils',
  MUTATIONS: 'mutations',
  RSBS_UPDATES: 'rsbsupdates',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  LAND_TAX_RECORDS: 'landtaxrecords',
  NOTICES: 'notices',
  AUDIT_LOGS: 'auditlogs',
} as const;

export function getCollections(db: Db) {
  return {
    users: db.collection(COLLECTIONS.USERS),
    landParcels: db.collection(COLLECTIONS.LAND_PARCELS),
    csrsRecords: db.collection(COLLECTIONS.CSRS_RECORDS),
    deeds: db.collection(COLLECTIONS.DEEDS),
    deedDocuments: db.collection(COLLECTIONS.DEED_DOCUMENTS),
    digitalDolils: db.collection(COLLECTIONS.DIGITAL_DOLILS),
    mutations: db.collection(COLLECTIONS.MUTATIONS),
    rsbsUpdates: db.collection(COLLECTIONS.RSBS_UPDATES),
    payments: db.collection(COLLECTIONS.PAYMENTS),
    notifications: db.collection(COLLECTIONS.NOTIFICATIONS),
    landTaxRecords: db.collection(COLLECTIONS.LAND_TAX_RECORDS),
    notices: db.collection(COLLECTIONS.NOTICES),
    auditLogs: db.collection(COLLECTIONS.AUDIT_LOGS),
  };
}

export { client, ObjectId, ServerApiVersion, type Db, type Collection };
