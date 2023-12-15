import { useQuery } from '@tanstack/react-query';
import { PositionType } from 'pages/Home';
import { PlaceParams, PlaceType } from 'pages/Home/types';
import { getPlaces } from 'query/queryFn';
import queryKeys from 'query/queryKeys';
import { preloadImages } from 'utils/preloadImage';

export const usePlacesQuery = (placeParams: PlaceParams, currentPosition?: PositionType) => {
  const query = useQuery([queryKeys.PLACES(placeParams)], () => getPlaces(placeParams), {
    select: data => {
      return data.response.body.items.item as PlaceType[] | undefined;
    },
    onSuccess: items => {
      if (items) {
        const imgSrcs = items.map(item => item.firstimage);
        preloadImages(imgSrcs, 200, 100);
      }
    },
    enabled: !!currentPosition
  });

  return query;
};
