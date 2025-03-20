import { Request, Response } from 'express';
import { calculateCarbonFootprint } from '../services/carbonService';
import { getRecommendations } from '../services/recommendationService';

/**
 * Handle carbon footprint calculation request
 * @param req Express request object
 * @param res Express response object
 * @returns HTTP response with carbon footprint and recommendations
 */
export const calculateFootprintHandler = async (req: Request, res: Response) => {
  try {
    const { distance, mode, passengers, fuelType } = req.body;
    
    if (!distance || !mode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (['car', 'bus', 'plane'].includes(mode) && (!passengers || passengers < 1)) {
      return res.status(400).json({ error: 'Valid passenger count required for this transport mode' });
    }
    
    if (mode === 'car' && !fuelType) {
      return res.status(400).json({ error: 'Fuel type required for car transport' });
    }
    
    const carbonFootprint = await calculateCarbonFootprint(distance, mode, passengers, fuelType);
    
    const recommendations = await getRecommendations(distance, mode, carbonFootprint, passengers, fuelType);
    
    return res.json({
      carbonFootprint,
      recommendations,
    });
  } catch (error) {
    console.error('Error calculating carbon footprint:', error);
    return res.status(500).json({ error: 'Server error' });
    
  }
};