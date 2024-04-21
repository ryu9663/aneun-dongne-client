import { useSuspenseQuery } from '@tanstack/react-query';

import { PlaceParams, PlaceType } from '@/pages/Home/types';
import { getPlaces } from '@/query/queryFn';
import queryKeys from '@/query/queryKeys';

export const usePlacesQuery = (placeParams: PlaceParams) => {
  const query = useSuspenseQuery({
    queryKey: queryKeys.PLACES(placeParams),
    queryFn: async () => await getPlaces(placeParams),
    select: data => {
      return data.response.body.items.item as PlaceType[] | undefined;
    }
    // enabled: !!currentPosition
  });
  return query;
};
