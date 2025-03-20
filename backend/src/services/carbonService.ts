import { GeminiService, TransportMode } from './geminiService';

type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

/**
 * Calculate carbon footprint based on distance, mode of transport, passengers, and fuel type using AI
 * @param distance Distance in kilometers
 * @param mode Mode of transport
 * @param passengers Number of passengers (for car, bus, plane)
 * @param fuelType Fuel type (for car only)
 * @returns Carbon footprint in kg CO2e
 */
export const calculateCarbonFootprint = async (
  distance: number,
  mode: TransportMode,
  passengers: number = 1,
  fuelType?: FuelType
): Promise<number> => {
  try {
    const geminiService = GeminiService.getInstance();

    let prompt = `Calculate the carbon footprint in kg CO2e for traveling ${distance} kilometers by ${mode}`;
    
    if (['car', 'bus', 'plane'].includes(mode) && passengers > 1) {
      prompt += ` with ${passengers} passengers`;
    }
    
    if (mode === 'car' && fuelType) {
      prompt += ` using ${fuelType} fuel`;
    }
    
    prompt += `. Please provide only the numerical result (e.g., 23.45) with no additional text or explanation.`;

    const text = await geminiService.generateContent(prompt);
    
    const carbonFootprint = parseFloat(text.trim());
    
    if (isNaN(carbonFootprint) || carbonFootprint <= 0) {
      throw new Error('Invalid carbon footprint calculation from AI');
    }
    
    let finalFootprint = carbonFootprint;
    if (['car', 'bus', 'plane'].includes(mode) && passengers > 1) {
      finalFootprint = carbonFootprint / passengers;
    }
    
    return finalFootprint;
  } catch (error) {
    console.error('Error calculating carbon footprint with AI:', error);
    
    const fallbackEmissionFactors: Record<string, number> = {
      car: 0.192,   
      bus: 0.103,  
      train: 0.041,
      plane: 0.255, 
    };
    
    if (mode === 'car' && fuelType) {
      const fuelTypeFactors: Record<string, number> = {
        petrol: 0.192,
        diesel: 0.171,
        electric: 0.053,
        hybrid: 0.106
      };
      fallbackEmissionFactors.car = fuelTypeFactors[fuelType] || fallbackEmissionFactors.car;
    }
    
    if (['car', 'bus', 'plane'].includes(mode) && passengers > 1) {
      return (distance * fallbackEmissionFactors[mode]) / passengers;
    }
    
    return distance * fallbackEmissionFactors[mode];
  }
};