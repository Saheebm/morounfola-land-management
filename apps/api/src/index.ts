import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './shared/db.js';
import { simulatedAuthMiddleware } from './shared/authMiddleware.js';

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
  await connectDB();
  app.listen(PORT, () => {
    console.log(`BhumiLink API server running on port ${PORT}`);
  });
}

startServer();
