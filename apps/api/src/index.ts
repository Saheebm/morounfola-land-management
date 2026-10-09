// ============================= Required ===============================
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB, COLLECTIONS } from './shared/db.js';
import { simulatedAuthMiddleware } from './shared/authMiddleware.js';

dotenv.config();

// =============== Initial Ports and Connections =============================
const app = express();
const port = process.env.PORT || 5000;

// ====================== Middleware ===================================
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Role'],
  })
);
app.use(express.json());
app.use(simulatedAuthMiddleware);

// ============================ Test API ===================================
app.get(['/', '/api'], (_req: Request, res: Response) => {
  res.json({
    status: 'Good',
    message: 'Api is running !',
  });
});

// ====================== Health Check ======================================
app.get(['/api/health', '/health'], async (_req: Request, res: Response) => {
  try {
    const database = await connectDB();
    await database.command({ ping: 1 });

    res.json({
      status: 'ok',
      database: 'connected',
      service: 'BhumiLink API',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'degraded',
      database: 'disconnected',
      service: 'BhumiLink API',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ====================== Auth Context ======================================
app.get(['/api/auth/me', '/auth/me'], (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
});

// ====================== Public Notices ====================================
app.get(['/api/notices', '/notices'], async (_req: Request, res: Response) => {
  try {
    const database = await connectDB();
    const noticesCollection = database.collection(COLLECTIONS.NOTICES);

    const notices = await noticesCollection
      .find({})
      .sort({ published_at: -1 })
      .limit(10)
      .toArray();

    res.json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error: any) {
    console.error('Failed to fetch notices:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== Land Parcels ======================================
app.get(['/api/parcels', '/parcels'], async (req: Request, res: Response) => {
  try {
    const { mouza, dag, khatian } = req.query;
    const filter: Record<string, any> = {};
    if (mouza) filter.mouza = new RegExp(String(mouza), 'i');
    if (dag) filter.dag = String(dag);
    if (khatian) filter.khatian = String(khatian);

    const database = await connectDB();
    const landParcelsCollection = database.collection(COLLECTIONS.LAND_PARCELS);

    const parcels = await landParcelsCollection
      .find(filter)
      .limit(20)
      .toArray();

    res.json({
      success: true,
      count: parcels.length,
      data: parcels,
    });
  } catch (error: any) {
    console.error('Failed to fetch parcels:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== System Stats ======================================
app.get(['/api/stats', '/stats'], async (_req: Request, res: Response) => {
  try {
    const database = await connectDB();
    const [totalParcels, totalNotices, totalUsers] = await Promise.all([
      database.collection(COLLECTIONS.LAND_PARCELS).countDocuments(),
      database.collection(COLLECTIONS.NOTICES).countDocuments(),
      database.collection(COLLECTIONS.USERS).countDocuments(),
    ]);

    res.json({
      success: true,
      data: { totalParcels, totalNotices, totalUsers },
    });
  } catch (error: any) {
    console.error('Failed to fetch stats:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ====================== Connecting to MongoDB & Server Startup =============
async function run() {
  try {
    await connectDB();
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message);
  }

  // Standalone server execution for local development
  if (!process.env.VERCEL) {
    app.listen(port, () => {
      console.log(`BhumiLink API server running on port ${port}`);
    });
  }
}

run();

// Export app for Vercel serverless functions
export default app;
export { app };
