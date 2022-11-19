import KakaoMap from 'components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getPlaces } from 'query/queryFn';
import queryKeys from '../../query/queryKeys';
import { useMemo } from 'react';
import { PlaceType } from './types';

export interface PositionType {
  lat: number;
  lon: number;
}

const MapPage = () => {
  const { loading: currentPositionLoading, position } = useCurrentPosition();

  const placeParmas = useMemo(
    () => ({
      numOfRows: 50,
      mapX: position?.lon,
      mapY: position?.lat,
      radius: 10000
    }),
    [currentPositionLoading]
  );

  const { data: placesData, isLoading } = useQuery({
    queryKey: [queryKeys.PLACES(placeParmas)],
    queryFn: () => getPlaces(placeParmas)
  });
  console.log(placesData?.response?.body?.items.item);

  const getPlacesMarkerInfo = (places?: PlaceType[]) =>
    places?.map(({ addr1, mapx, mapy }) => ({ title: addr1, lat: parseFloat(mapy), lon: parseFloat(mapx) }));
  const otherMarkers = getPlacesMarkerInfo(placesData?.response?.body?.items.item);
  return (
    <section className={styles.wrapper}>
      {isLoading || currentPositionLoading ? (
        <div>loading...</div>
      ) : (
        <KakaoMap position={position} otherMarkers={otherMarkers} />
      )}
    </section>
  );
};

export default MapPage;
