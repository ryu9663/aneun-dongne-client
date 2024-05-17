import { useQuery } from '@tanstack/react-query';

import { PlaceParams, PlaceType } from '@/pages/Home/types';
import { getPlaces } from '@/query/queryFn';
import queryKeys from '@/query/queryKeys';
import { PositionType } from '@/pages/Home';

export const usePlacesQuery = (placeParams: PlaceParams, position: PositionType) => {
  //! TODO 여기에서 useQueryParamsStore 호출? 고민해보기
  // const [pickPoint, radius_KM, numOfPlaces] = useQueryParamsStore(state => [..])
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
