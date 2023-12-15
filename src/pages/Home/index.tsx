import KakaoMap from 'pages/Home/components/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './index.module.scss';
import { useMemo, useState } from 'react';
import { MarkerType, PlaceType } from './types';
import PlaceList from './components/PlaceList';
import { useQuery } from '@tanstack/react-query';
import queryKeys from 'query/queryKeys';
import { preloadImages } from 'utils/preloadImage';
import { getPlaces } from 'query/queryFn';
import { usePlacesQuery } from 'pages/Home/hooks/usePlacesQuery';

export interface PositionType {
  lat: number;
  lon: number;
}

export const Home = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [prevInfo, setPrevInfo] = useState();
  const [prevMarkers, setPrevMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState();

  const { data: places, isLoading, isError } = usePlacesQuery(currentPosition);

  return (
    <section className={styles.wrapper}>
      {currentPositionLoading ? (
        <div>현재 위치를 불러오는 중입니다.</div>
      ) : (
        <>
          <div className={styles.kakaomap_wrapper}>
            <KakaoMap
              isError={isError}
              isLoading={isLoading}
              currentPosition={currentPosition}
              places={places}
              setMap={setMap}
              prevMarkers={prevMarkers}
              setPrevMarkers={setPrevMarkers}
            />
          </div>
          <div className={styles.placelist_wrapper}>
            {places && <PlaceList prevInfo={prevInfo} setPrevInfo={setPrevInfo} places={places} map={map} />}
          </div>
        </>
      )}
    </section>
  );
};
