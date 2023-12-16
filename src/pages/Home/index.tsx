import KakaoMap from 'pages/Home/components/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './index.module.scss';
import { useState } from 'react';
import { MarkerType } from './types';
import PlaceList from './components/PlaceList';
import { usePlacesQuery } from 'pages/Home/hooks/usePlacesQuery';
import { usePlacesStore } from 'pages/Home/hooks/usePlacesStore';

export interface PositionType {
  lat: number;
  lon: number;
}

export const Home = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [prevInfo, setPrevInfo] = useState();
  const [prevMarkers, setPrevMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState();
  const [pickPoint, radius, numOfRows] = usePlacesStore(state => [state.pickPoint, state.radius, state.numOfRows]);

  const {
    data: places,
    isLoading,
    isError
  } = usePlacesQuery(
    {
      numOfRows,
      mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
      mapY: pickPoint ? pickPoint.lat : currentPosition?.lat,
      radius
    },
    currentPosition
  );

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
            {
              <PlaceList
                prevInfo={prevInfo}
                setPrevInfo={setPrevInfo}
                places={places}
                map={map}
                isLoading={isLoading}
              />
            }
          </div>
        </>
      )}
    </section>
  );
};
