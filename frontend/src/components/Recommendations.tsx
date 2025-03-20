import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarbonStore } from '../store/carbonStore';

const Recommendations: React.FC = () => {
  const { recommendations } = useCarbonStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations && recommendations.length > 0 ? (
          <div className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md">
                <p>{recommendation}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Calculate your footprint to get personalized recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Recommendations;