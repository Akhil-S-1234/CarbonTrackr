import { GeminiService, TransportMode } from './geminiService';

type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

/**
 * Get AI-generated recommendations for reducing carbon footprint
 * @param distance Distance in kilometers
 * @param mode Mode of transport
 * @param carbonFootprint Calculated carbon footprint
 * @param passengers Number of passengers (for car, bus, plane)
 * @param fuelType Fuel type (for car only)
 * @returns Array of recommendations
 */
export const getRecommendations = async (
  distance: number,
  mode: TransportMode,
  carbonFootprint: number,
  passengers: number = 1,
  fuelType?: FuelType
): Promise<string[]> => {
  try {
    const geminiService = GeminiService.getInstance();

    let prompt = `I traveled ${distance} kilometers by ${mode} which produced ${carbonFootprint.toFixed(2)} kg of CO2e`;
    
    if (['car', 'bus', 'plane'].includes(mode) && passengers > 0) {
      prompt += ` with ${passengers} passenger${passengers > 1 ? 's' : ''}`;
    }
    
    if (mode === 'car' && fuelType) {
      prompt += ` using a ${fuelType} vehicle`;
    }
    
    prompt += `. Give me 3 specific and actionable recommendations to reduce my carbon footprint for similar trips in the future. Keep each recommendation under 2 sentences and focus on practical advice. Avoid bold characters.`;

    const text = await geminiService.generateContent(prompt);
    
    const recommendations = text
      .split(/\d+\./)
      .filter(Boolean)
      .map((rec: string) => rec.trim());
    
    return recommendations;
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    
    const fallbackRecommendations = [
      `Consider using public transport instead of ${mode} to reduce emissions.`,
      'Offset your carbon emissions through certified carbon offset programs.',
      'Plan your trips more efficiently to reduce total distance traveled.',
    ];
    
    return fallbackRecommendations;
  }
};