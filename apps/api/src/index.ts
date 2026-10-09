import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simulated auth middleware
app.use((req: Request, _res: Response, next) => {
  const role = req.headers['x-role'] || 'citizen';
  (req as any).user = {
    role,
    name: `Demo ${role}`,
  };
  next();
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'BhumiLink API',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`BhumiLink API server running on port ${PORT}`);
});
