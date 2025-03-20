import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Shared service for Google Gemini AI integration
 */
export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;
  private model: any;

  private constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  }

  /**
   * Get the singleton instance of GeminiService
   */
  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  /**
   * Generate content using Gemini AI
   * @param prompt The prompt to send to the AI
   * @returns The text response from the AI
   */
  public async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating content with Gemini AI:', error);
      throw error;
    }
  }
}

export type TransportMode = 'car' | 'bus' | 'train' | 'plane';