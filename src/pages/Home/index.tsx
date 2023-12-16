import KakaoMap from 'pages/Home/components/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './index.module.scss';
import { useState } from 'react';
import { MarkerType } from './types';
import PlaceList from './components/PlaceList';
import { usePlacesQuery } from 'pages/Home/hooks/usePlacesQuery';
import { usePlacesStore } from 'pages/Home/hooks/usePlacesStore';
import { KakaoMapSkeleton } from 'pages/Home/components/KakaoMap/KakaoMapSkeleton';

export interface PositionType {
  lat: number;
  lon: number;
}

export const Home = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [prevInfo, setPrevInfo] = useState();
  const [prevMarkers, setPrevMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState();
  const [pickPoint, radius_KM, numOfRows] = usePlacesStore(state => [
    state.pickPoint,
    state.radius_KM,
    state.numOfRows
  ]);

  const {
    data: places,
    isLoading,
    isError
  } = usePlacesQuery(
    {
      numOfRows,
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
              prevMarkers={prevMarkers}
              setPrevMarkers={setPrevMarkers}
            />
          )}
        </div>
        <div className={styles.placelist_wrapper}>
          {
            <PlaceList
              prevInfo={prevInfo}
              setPrevInfo={setPrevInfo}
              places={places}
              map={map}
              isLoading={currentPositionLoading || isLoading}
            />
          }
        </div>
      </>
    </section>
  );
};
