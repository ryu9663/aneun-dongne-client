/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { PositionType } from '../../index';
import { onDragMap } from '../../../../utils/handleMapMarkers';
import { MarkerType, PlaceType } from 'pages/Home/types';
import useMap from 'utils/hooks/useMap';
import { Loading } from 'pages/Home/Loading';

export interface Props {
  currentPosition?: PositionType;
  places?: PlaceType[];
  pickPoint?: PositionType;
  setPickPoint?: (position?: PositionType) => void;
  setMap: (map: any) => void;
  prevMarkers?: MarkerType[];
  setPrevMarkers?: (markers: MarkerType[]) => void;
  isError: boolean;
  isLoading: boolean;
}

const KakaoMap = ({
  currentPosition,
  places,
  pickPoint,
  setPickPoint,
  setMap,
  prevMarkers,
  setPrevMarkers,
  isError,
  isLoading
}: Props) => {
  const mapRef = useRef(null);

  const { map: kakaoMap } = useMap(mapRef, {
    otherMarkers: places,
    defaultPosition: currentPosition,
    prevMarkers,
    setPrevMarkers
  });

  useEffect(() => setMap(kakaoMap), [kakaoMap]);

  useEffect(() => {
    if (kakaoMap.current) {
      setPickPoint && onDragMap(kakaoMap.current, setPickPoint);
    }
  }, [pickPoint]);

  if (isError) return <div>error</div>;
  return (
    <article className={styles.map_wrapper}>
      {isLoading && <Loading content="주변 관광지들을 탐색중입니다." />}
      <div ref={mapRef} className={styles.map} id={styles.map}>
        <h2 className={styles.map_experiment}>
          &nbsp;&nbsp;{'지도를 드래그하면 10km 주변에 위치한 관광지들을 검색합니다.'}
        </h2>
      </div>
    </article>
  );
};

export default KakaoMap;