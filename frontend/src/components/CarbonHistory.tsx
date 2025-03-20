import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCarbonStore} from '../store/carbonStore';
import { CarbonEntry, TransportMode, FuelType } from '../types/carbon';

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

const getTransportModeLabel = (mode: TransportMode): string => {
  const labels: Record<TransportMode, string> = {
    car: 'Car',
    bus: 'Bus',
    train: 'Train',
    plane: 'Plane'
  };
  return labels[mode] || mode;
};

const getFuelTypeLabel = (fuelType?: FuelType): string => {
  if (!fuelType) return 'N/A';
  
  const labels: Record<FuelType, string> = {
    petrol: 'Petrol',
    diesel: 'Diesel',
    electric: 'Electric',
    hybrid: 'Hybrid'
  };
  return labels[fuelType] || fuelType;
};

interface HistoryItemProps {
  entry: CarbonEntry;
  onDelete: (id: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ entry, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="mb-4 border rounded-lg overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="font-medium">{formatDate(entry.date)}</p>
          <p className="text-sm text-gray-500">
            {getTransportModeLabel(entry.travelDetails.mode)} • {entry.travelDetails.distance} km • {entry.footprint.toFixed(2)} kg CO2e
          </p>
        </div>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(entry.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div>
              <p className="text-gray-500">Mode:</p>
              <p>{getTransportModeLabel(entry.travelDetails.mode)}</p>
            </div>
            <div>
              <p className="text-gray-500">Distance:</p>
              <p>{entry.travelDetails.distance} km</p>
            </div>
            <div>
              <p className="text-gray-500">Passengers:</p>
              <p>{entry.travelDetails.passengers}</p>
            </div>
            {entry.travelDetails.mode === 'car' && (
              <div>
                <p className="text-gray-500">Fuel Type:</p>
                <p>{getFuelTypeLabel(entry.travelDetails.fuelType)}</p>
              </div>
            )}
          </div>
          
          <div className="mb-2">
            <p className="text-gray-500 text-sm">Carbon Footprint:</p>
            <p className="text-lg font-bold">{entry.footprint.toFixed(2)} kg CO2e</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Recommendations:</p>
            <div className="space-y-2">
              {entry.recommendations.map((recommendation, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                  {recommendation}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CarbonHistory: React.FC = () => {
  const { history, deleteHistoryEntry } = useCarbonStore();
  
  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calculation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">
            <p>No previous calculations found</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calculation History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {history.map(entry => (
            <HistoryItem 
              key={entry.id} 
              entry={entry} 
              onDelete={deleteHistoryEntry}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonHistory;