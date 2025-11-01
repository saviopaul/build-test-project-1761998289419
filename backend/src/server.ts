import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

export const prisma = new PrismaClient();

app.use(express.json());

// CORS - Basic example, consider more robust solution for production
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for simplicity in this test project
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Test Project Backend API is running!');
});

app.use('/api/items', itemRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma client disconnected.');
  process.exit(0);
});
