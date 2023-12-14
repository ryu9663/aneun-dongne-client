import { PlaceParams } from '../pages/Home/types';

const PLACES = 'places';
const queryKeys = {
  PLACES: (params: PlaceParams) =>
    [PLACES, params.mapX || 0, params.mapY || 0, params.radius, params.numOfRows] as const
};

export default queryKeys;
