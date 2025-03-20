import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TravelDetails, CarbonEntry } from '../types/carbon';

interface CarbonState {
  footprint: number | null;
  recommendations: string[];
  travelDetails: TravelDetails | null;
  history: CarbonEntry[];

  setFootprint: (footprint: number) => void;
  setRecommendations: (recommendations: string[]) => void;
  setTravelDetails: (details: TravelDetails) => void;
  saveCurrentToHistory: () => void;
  deleteHistoryEntry: (id: string) => void;
  resetState: () => void;
}

export const useCarbonStore = create<CarbonState>()(
  persist(
    (set, get) => ({
      footprint: null,
      recommendations: [],
      travelDetails: null,

      history: [],

      setFootprint: (footprint) => set({ footprint }),
      setRecommendations: (recommendations) => set({ recommendations }),
      setTravelDetails: (travelDetails) => set({ travelDetails }),

      saveCurrentToHistory: () => {
        const { footprint, recommendations, travelDetails, history } = get();

        if (footprint && travelDetails) {
          const newEntry: CarbonEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            footprint,
            recommendations,
            travelDetails,
          };

          set({
            history: [newEntry, ...history]
          });
        }
      },

      deleteHistoryEntry: (id) => {
        const { history } = get();
        set({
          history: history.filter(entry => entry.id !== id)
        });
      },

      resetState: () => set({
        footprint: null,
        recommendations: [],
        travelDetails: null
      }),
    }),
    {
      name: 'carbon-storage',
    }
  )
);