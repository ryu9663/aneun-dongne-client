import { PositionType } from 'pages/Home';
import { create } from 'zustand';

interface PlacesStoreProps {
  pickPoint?: PositionType;
  setPickPoint: (pickPoint?: PositionType) => void;
  radius: number;
  setRadius: (radius?: number) => void;
  numOfRows: number;
  setNumOfRows: (numOfRows?: number) => void;
}
export const usePlacesStore = create<PlacesStoreProps>(set => ({
  pickPoint: undefined,
  setPickPoint: pickPoint => set({ pickPoint }),
  radius: 10000,
  setRadius: radius => {
    set({ radius });
  },
  numOfRows: 20,
  setNumOfRows: numOfRows => set({ numOfRows })
}));
