import { MutableRefObject } from 'react';
import { create } from 'zustand';

interface MapStore {
  mapInfo: MutableRefObject<null>;
  setMapInfo: (map: MutableRefObject<null>) => void;
}

export const useMapStore = create<MapStore>(set => ({
  mapInfo: { current: null },
  setMapInfo: mapInfo => set({ mapInfo })
}));
