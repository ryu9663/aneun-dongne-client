import { PositionType } from '@/pages/Home/index2';
import { create } from 'zustand';

interface PlacesStoreProps {
  pickPoint?: PositionType;
  setPickPoint: (pickPoint?: PositionType) => void;
  radius_KM: number;
  setRadius_KM: (radius?: number) => void;
  numOfPlaces: number;
  setNumOfPlaces: (numOfPlaces?: number) => void;
}
export const usePlacesStore = create<PlacesStoreProps>(set => ({
  pickPoint: undefined,
  setPickPoint: pickPoint => set({ pickPoint }),
  radius_KM: 10,
  setRadius_KM: radius_KM => {
    set({ radius_KM });
  },
  numOfPlaces: 20,
  setNumOfPlaces: numOfPlaces => set({ numOfPlaces })
}));
