import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { TravelDetails, CarbonResponse } from '../types/carbon';

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

export const calculateCarbonFootprint = async (travelData: TravelDetails): Promise<CarbonResponse | null> => {
  try {
    if (!travelData.distance || travelData.distance <= 0) {
      toast({
        description: "Please enter a valid distance",
        variant: "destructive",
      });
      return null;
    }

    if (travelData.passengers < 1) {
      toast({
        description: "Please enter at least 1 passenger",
        variant: "destructive",
      });
      return null;
    }

    const response = await axios.post(`${apiBaseUrl}/calculate`, travelData);
    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "An error occurred";
      
    toast({
      description: errorMessage,
      variant: "destructive",
    });
    return null;
  }
};