import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarbonStore } from '../store/carbonStore';

const FootprintDisplay: React.FC = () => {
  const { footprint } = useCarbonStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Carbon Footprint</CardTitle>
      </CardHeader>
      <CardContent>
        {footprint ? (
          <div className="text-center">
            <p className="text-3xl font-bold">{footprint.toFixed(2)} kg CO2e</p>
            <p className="text-sm text-gray-500 mt-2">
              This is the estimated carbon dioxide equivalent emissions from your travel.
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Calculate your footprint to see results</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FootprintDisplay;