// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { calculateRoutes } from './routes/calculate';
import morgan from 'morgan'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.use('/api', calculateRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('CarbonTrackr API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});