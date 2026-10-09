import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './shared/db.js';
import { simulatedAuthMiddleware } from './shared/authMiddleware.js';
import { User } from './models/User.js';
import { seedDatabase } from './shared/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simulated auth middleware
app.use(simulatedAuthMiddleware);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'BhumiLink API',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
});

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

startServer();
