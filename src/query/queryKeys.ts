import { PlaceParams } from '../pages/Home/types';

const PLACES = 'places';
const PLACE = 'place';
const queryKeys = {
  PLACES: (params: PlaceParams) => [PLACES, params.mapX || 0, params.mapY || 0, params.radius] as const,
  PLACE: (contentId: string) => [PLACE, contentId] as const
};

export default queryKeys;
