import { useEffect, useMemo, useRef } from 'react';
import styles from './kakaomap.module.scss';
import { PositionType } from '../../index';

import { onDragMap } from '../../../../utils/handleMapMarkers';
import { MarkerType, PlaceType } from 'pages/mappage/types';
import { useQuery } from '@tanstack/react-query';
import queryKeys from 'query/queryKeys';
import { getPlaces } from 'query/queryFn';
import useMap from 'utils/hooks/useMap';
import { Loading } from 'pages/mappage/Loading/Loading';

export interface Props {
  currentPosition?: PositionType;
  places?: PlaceType[];
  setPlaces: (places: PlaceType[]) => void;
  pickPoint?: PositionType;
  setPickPoint?: (position?: PositionType) => void;
  setMap: (map: any) => void;
  prevMarkers?: MarkerType[];
  setPrevMarkers?: (markers: MarkerType[]) => void;
}

const KakaoMap = ({
  currentPosition,
  setPlaces,
  pickPoint,
  setPickPoint,
  setMap,
  prevMarkers,
  setPrevMarkers
}: Props) => {
  const mapRef = useRef(null);
  //!
  const placeParmas = useMemo(
    () => ({
      numOfRows: 50,
      mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
      mapY: pickPoint ? pickPoint.lat : currentPosition?.lat,
      radius: 10000
    }),
    [pickPoint]
  );

  const { data, isLoading } = useQuery([queryKeys.PLACES(placeParmas)], () => getPlaces(placeParmas));
  //!

  const placesData = data?.response?.body?.items.item;

  const { map: kakaoMap } = useMap(mapRef, {
    otherMarkers: placesData,
    defaultPosition: currentPosition,
    prevMarkers,
    setPrevMarkers,
    defaultMarker: true
  });
  useEffect(() => setMap(kakaoMap), [kakaoMap]);
  useEffect(() => {
    setPlaces(placesData);
  }, [placesData]);

  useEffect(() => {
    if (kakaoMap.current) {
      setPickPoint && onDragMap(kakaoMap.current, setPickPoint);
    }
  }, [pickPoint]);

  return (
    <>
      <article className={styles.wrapper}>
        {isLoading && <Loading content="주변 관광지들을 탐색중입니다." />}
        <div ref={mapRef} className={styles.map} id={styles.map}>
          <div className={styles.map_experiment}>
            &nbsp;&nbsp;{'지도를 드래그하면 10km 주변에 위치한 관광지들을 검색합니다.'}
          </div>
        </div>
      </article>
    </>
  );
};

export default KakaoMap;
