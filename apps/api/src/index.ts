import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB, ensureDbConnection } from './shared/db.js';
import { simulatedAuthMiddleware } from './shared/authMiddleware.js';
import { User, LandParcel, Notice } from './models/index.js';
import { seedDatabase } from './shared/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests (local dev & production Vercel)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Role'],
  })
);
app.use(express.json());

// Simulated auth middleware attaching mock role context
app.use(simulatedAuthMiddleware);

// --- Root Endpoints (instant check, no DB dependency) ---
app.get(['/', '/api'], (_req: Request, res: Response) => {
  res.json({
    status: 'Good',
    message: 'Api is running !',
  });
});

// --- Health Check Endpoints ---
app.get(['/api/health', '/health'], async (_req: Request, res: Response) => {
  let isConnected = mongoose.connection.readyState === 1;
  if (!isConnected) {
    const conn = await connectDB();
    isConnected = conn !== null && mongoose.connection.readyState === 1;
  }

  res.status(isConnected ? 200 : 503).json({
    status: isConnected ? 'ok' : 'degraded',
    database: isConnected ? 'connected' : 'disconnected',
    service: 'BhumiLink API',
    timestamp: new Date().toISOString(),
  });
});

// --- Auth Context Endpoint ---
app.get(['/api/auth/me', '/auth/me'], (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
});

// --- Domain Data Endpoints (Requires Database) ---

// Public Notices
app.get(['/api/notices', '/notices'], ensureDbConnection, async (_req: Request, res: Response) => {
  try {
    const notices = await Notice.find().sort({ published_at: -1 }).limit(10);
    res.json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Land Parcels (with filter support)
app.get(['/api/parcels', '/parcels'], ensureDbConnection, async (req: Request, res: Response) => {
  try {
    const { mouza, dag, khatian } = req.query;
    const filter: Record<string, any> = {};
    if (mouza) filter.mouza = new RegExp(String(mouza), 'i');
    if (dag) filter.dag = String(dag);
    if (khatian) filter.khatian = String(khatian);

    const parcels = await LandParcel.find(filter).limit(20);
    res.json({
      success: true,
      count: parcels.length,
      data: parcels,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// System Stats
app.get(['/api/stats', '/stats'], ensureDbConnection, async (_req: Request, res: Response) => {
  try {
    const [totalParcels, totalNotices, totalUsers] = await Promise.all([
      LandParcel.countDocuments(),
      Notice.countDocuments(),
      User.countDocuments(),
    ]);
    res.json({
      success: true,
      data: { totalParcels, totalNotices, totalUsers },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Standalone Server Startup (for local development) ---
async function startServer() {
  const conn = await connectDB();
  if (conn) {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('[Database] Database is empty, auto-seeding demo records...');
        await seedDatabase(false);
      }
    } catch (err) {
      console.warn('[Database] Auto-seed check skipped:', err);
    }
  }

  app.listen(PORT, () => {
    console.log(`BhumiLink API server running on port ${PORT}`);
  });
}

// In local execution, boot HTTP listener; in serverless (e.g. Vercel), export app
if (!process.env.VERCEL) {
  startServer();
}

export default app;
export { app };
