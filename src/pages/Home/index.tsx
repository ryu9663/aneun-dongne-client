import KakaoMap from '@/pages/Home/components/KakaoMap';
import useCurrentPosition from '@/utils//hooks/useCurrentPosition';
import styles from './index.module.scss';
import { useState } from 'react';
import PlaceList from './components/PlaceList';
import { usePlacesQuery } from '@/pages/Home/hooks/usePlacesQuery';
import { usePlacesStore } from '@/pages/Home/hooks/usePlacesStore';
import { KakaoMapSkeleton } from '@/pages/Home/components/KakaoMap/KakaoMapSkeleton';

export interface PositionType {
  lat: number;
  lon: number;
}

export const Home = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [map, setMap] = useState();
  const [pickPoint, radius_KM, numOfPlaces] = usePlacesStore(state => [
    state.pickPoint,
    state.radius_KM,
    state.numOfPlaces
  ]);

  const {
    data: places,
    isLoading,
    isError
  } = usePlacesQuery(
    {
      numOfRows: numOfPlaces,
      mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
      mapY: pickPoint ? pickPoint.lat : currentPosition?.lat,
      radius: radius_KM * 1000
    },
    currentPosition
  );
  return (
    <section className={styles.wrapper}>
      <>
        <div className={styles.kakaomap_wrapper}>
          {currentPositionLoading ? (
            <KakaoMapSkeleton />
          ) : (
            <KakaoMap
              isError={isError}
              isLoading={isLoading}
              currentPosition={currentPosition}
              places={places}
              setMap={setMap}
            />
          )}
        </div>
        <div className={styles.placelist_wrapper}>
          {<PlaceList places={places} map={map} isLoading={currentPositionLoading || isLoading} />}
        </div>
      </>
    </section>
  );
};
