import dotenv from 'dotenv';
import { seedDatabase } from '../src/shared/seedData.js';

dotenv.config();

seedDatabase(true)
  .then((success) => {
    if (!success) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Seed script encountered an error:', err);
    process.exit(1);
  });
