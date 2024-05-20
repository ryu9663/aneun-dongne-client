import { useQuery } from '@tanstack/react-query';

import { PlaceParams, PlaceType } from '@/pages/Home/types';
import { getPlaces } from '@/query/queryFn';
import queryKeys from '@/query/queryKeys';
import { PositionType } from '@/pages/Home';
import { useQueryParamsStore } from '@/pages/Home/hooks/useQueryParamsStore';

export const usePlacesQuery = (position: PositionType) => {
  const [pickPoint, radius_KM, numOfPlaces] = useQueryParamsStore(state => [
    state.pickPoint,
    state.radius_KM,
    state.numOfPlaces
  ]);

  const placeParams: PlaceParams = {
    numOfRows: numOfPlaces,
    mapX: pickPoint ? pickPoint.lon : position?.lon,
    mapY: pickPoint ? pickPoint.lat : position?.lat,
    radius: radius_KM * 1000
  };

  const query = useQuery({
    queryKey: queryKeys.PLACES(placeParams),
    queryFn: async () => await getPlaces(placeParams),
    select: data => {
      return data.response.body.items.item as PlaceType[] | undefined;
    },
    enabled: !!position
  });
  return query;
};
