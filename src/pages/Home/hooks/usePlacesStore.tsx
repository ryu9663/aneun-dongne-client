import { PositionType } from 'pages/Home';
import { create } from 'zustand';

interface PlacesStoreProps {
  pickPoint?: PositionType;
  setPickPoint: (pickPoint?: PositionType) => void;
  radius_KM: number;
  setRadius_KM: (radius?: number) => void;
  numOfRows: number;
  setNumOfRows: (numOfRows?: number) => void;
}
export const usePlacesStore = create<PlacesStoreProps>(set => ({
  pickPoint: undefined,
  setPickPoint: pickPoint => set({ pickPoint }),
  radius_KM: 10,
  setRadius_KM: radius_KM => {
    set({ radius_KM });
  },
  numOfRows: 20,
  setNumOfRows: numOfRows => set({ numOfRows })
}));
