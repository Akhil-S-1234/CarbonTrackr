export type TransportMode = 'car' | 'bus' | 'train' | 'plane';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

export interface TravelDetails {
    distance: number;
    mode: TransportMode;
    passengers: number;
    fuelType?: FuelType;
}

export interface CarbonResponse {
    carbonFootprint: number;
    recommendations: string[];
}

export interface CarbonEntry {
    id: string;
    date: string;
    footprint: number;
    recommendations: string[];
    travelDetails: TravelDetails;
}