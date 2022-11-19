import { PlaceParams } from '../pages/mappage/types';

const PLACES = 'places';

const queryKeys = {
  PLACES: (params: PlaceParams) => [PLACES, params.mapX || 0, params.mapY || 0, params.radius] as const
};

export default queryKeys;
