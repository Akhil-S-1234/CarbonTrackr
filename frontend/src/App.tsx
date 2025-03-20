import { useState } from 'react';
import CarbonCalculator from './components/CarbonCalculator';
import FootprintDisplay from './components/FootprintDisplay';
import Recommendations from './components/Recommendations';
import CarbonHistory from './components/CarbonHistory';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">CarbonTrackr</h1>
          <p className="text-gray-600">Track and offset your carbon footprint</p>
        </header>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 flex shadow-sm">
            <Button 
              variant={showHistory ? "outline" : "default"}
              onClick={() => setShowHistory(false)}
              className="rounded-r-none"
            >
              Calculator
            </Button>
            <Button 
              variant={showHistory ? "default" : "outline"}
              onClick={() => setShowHistory(true)}
              className="rounded-l-none"
            >
              History
            </Button>
          </div>
        </div>
        
        {!showHistory ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <CarbonCalculator />
            </div>
            <div className="space-y-6">
              <FootprintDisplay />
              <Recommendations />
            </div>
          </div>
        ) : (
          <CarbonHistory />
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default App;