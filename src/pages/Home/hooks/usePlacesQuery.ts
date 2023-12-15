import { useQuery } from '@tanstack/react-query';
import { PositionType } from 'pages/Home';
import { usePlacesStore } from 'pages/Home/hooks/usePlacesStore';
import { PlaceType } from 'pages/Home/types';
import { getPlaces } from 'query/queryFn';
import queryKeys from 'query/queryKeys';
import { useEffect } from 'react';
import { preloadImages } from 'utils/preloadImage';

export const usePlacesQuery = (currentPosition?: PositionType) => {
  const [pickPoint, placeParams, setPlaceParams] = usePlacesStore(state => [
    state.pickPoint,
    state.placeParams,
    state.setPlaceParams
  ]);

  useEffect(() => {
    if (currentPosition) {
      setPlaceParams({
        ...placeParams,
        mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
        mapY: pickPoint ? pickPoint.lat : currentPosition?.lat
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition, pickPoint]);

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
