import express from 'express';
import { calculateFootprintHandler } from '../controllers/carbonController';

const router = express.Router();

router.post('/calculate', calculateFootprintHandler);

export { router as calculateRoutes };