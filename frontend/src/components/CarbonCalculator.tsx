import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCarbonStore } from '../store/carbonStore';
import { calculateCarbonFootprint } from '../services/carbonApiService';
import { TravelDetails, TransportMode, FuelType } from '../types/carbon';

const CarbonCalculator: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    setFootprint,
    setRecommendations,
    setTravelDetails,
    saveCurrentToHistory
  } = useCarbonStore();

  const [travelData, setTravelData] = useState<TravelDetails>({
    distance: 0,
    mode: 'car',
    passengers: 1,
    fuelType: 'petrol',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTravelData(prev => ({
      ...prev,
      [name]: ['distance', 'passengers'].includes(name) ? parseFloat(value) : value,
    }));
  };

  const handleModeChange = (value: string) => {
    setTravelData(prev => {
      const newData = {
        ...prev,
        mode: value as TransportMode,
      };

      // Reset fuelType if not car
      if (value !== 'car') {
        delete newData.fuelType;
      } else if (!newData.fuelType) {
        newData.fuelType = 'petrol';
      }

      return newData;
    });
  };

  const handleFuelTypeChange = (value: string) => {
    setTravelData(prev => ({
      ...prev,
      fuelType: value as FuelType,
    }));
  };

  const handleCalculateFootprint = async () => {
    setIsLoading(true);

    try {
      const result = await calculateCarbonFootprint(travelData);

      if (result) {
        setFootprint(result.carbonFootprint);
        setRecommendations(result.recommendations);
        setTravelDetails(travelData);

        // Save to history
        saveCurrentToHistory();

        toast({
          description: "Carbon footprint calculated successfully",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showPassengerInput = ['car', 'bus', 'plane'].includes(travelData.mode);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calculate Your Travel Carbon Footprint</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="distance">Distance (km)</Label>
            <Input
              id="distance"
              name="distance"
              type="number"
              placeholder="Enter distance in kilometers"
              value={travelData.distance || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mode">Mode of Transport</Label>
            <Select value={travelData.mode} onValueChange={handleModeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select transport mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="plane">Plane</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showPassengerInput && (
            <div className="grid gap-2">
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Input
                id="passengers"
                name="passengers"
                type="number"
                min="1"
                placeholder="Enter number of passengers"
                value={travelData.passengers || ''}
                onChange={handleChange}
              />
            </div>
          )}

          {travelData.mode === 'car' && (
            <div className="grid gap-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select value={travelData.fuelType} onValueChange={handleFuelTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            onClick={handleCalculateFootprint}
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Footprint"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;