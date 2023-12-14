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

export interface PositionType {
  lat: number;
  lon: number;
}

export const Home = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [pickPoint, setPickPoint] = useState<PositionType>();
  const [prevInfo, setPrevInfo] = useState();
  const [prevMarkers, setPrevMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState();

  //!
  const placeParmas = useMemo(
    () => ({
      numOfRows: 20,
      mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
      mapY: pickPoint ? pickPoint.lat : currentPosition?.lat,
      radius: 10000
    }),
    [currentPosition?.lat, currentPosition?.lon, pickPoint]
  );
  const {
    data: places,
    isLoading,
    isError
  } = useQuery([queryKeys.PLACES(placeParmas)], () => getPlaces(placeParmas), {
    select: data => {
      return data.response.body.items.item as PlaceType[];
    },
    onSuccess: items => {
      console.log(items);

      const imgSrcs = items.map(item => item.firstimage);
      preloadImages(imgSrcs, 200, 100);
    },
    enabled: !!currentPosition
  });

  //!
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
              pickPoint={pickPoint}
              setPickPoint={setPickPoint}
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
