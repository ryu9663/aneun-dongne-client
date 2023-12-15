import { PositionType } from 'pages/Home';
import { PlaceParams } from 'pages/Home/types';
import { create } from 'zustand';

interface PlacesStoreProps {
  pickPoint?: PositionType;
  setPickPoint: (pickPoint?: PositionType) => void;
  placeParams: PlaceParams;
  setPlaceParams: (placeParmas: PlaceParams) => void;
}
export const usePlacesStore = create<PlacesStoreProps>(set => ({
  pickPoint: undefined,
  setPickPoint: pickPoint => set({ pickPoint }),
  placeParams: {
    numOfRows: 20,
    mapX: undefined,
    mapY: undefined,
    radius: 20000
  },
  setPlaceParams: placeParams => set({ placeParams })
}));
