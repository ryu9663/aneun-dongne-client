import { useEffect, useMemo, useRef } from 'react';
import styles from './kakaomap.module.scss';
import { PositionType } from '../../pages/mappage/index';

import { addZoomControler, onDragMap, setOtherMarkers } from './handler';
import { PlaceType } from 'pages/mappage/types';
import { useQuery } from '@tanstack/react-query';
import queryKeys from 'query/queryKeys';
import { getPlaces } from 'query/queryFn';

export interface Props {
  currentPosition?: PositionType;

  places?: PlaceType[];
  pickPoint?: PositionType;
  setPickPoint: (position?: PositionType) => void;
}

// const KakaoMap = ({ currentPosition, places, pickPoint, setPickPoint}: Props) => {
const KakaoMap = ({ currentPosition, pickPoint, setPickPoint }: Props) => {
  const mapRef = useRef(null);
  const kakaoMap = useRef();
  const kakao = window.kakao;

  useEffect(() => {
    if (currentPosition) {
      const container = mapRef.current;
      const option = {
        center: new kakao.maps.LatLng(
          pickPoint ? pickPoint.lat : currentPosition?.lat,
          pickPoint ? pickPoint.lon : currentPosition?.lon
        ),
        level: 8
      };
      kakaoMap.current = new kakao.maps.Map(container, option);
      addZoomControler(kakaoMap.current);
      setPickPoint && onDragMap(kakaoMap.current, setPickPoint);
    }
  }, [mapRef]);

  //! TODO : 쿼리를 포함하는 useMap 훅을 하나 만들어야함
  const placeParmas = useMemo(
    () => ({
      numOfRows: 50,
      mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
      mapY: pickPoint ? pickPoint.lat : currentPosition?.lat,
      radius: 10000
    }),
    [pickPoint]
  );

  const { data: placesData } = useQuery({
    queryKey: [queryKeys.PLACES(placeParmas)],
    queryFn: () => getPlaces(placeParmas)
  });

  const places = placesData?.response?.body?.items.item;
  //!

  useEffect(() => {
    if (places) setOtherMarkers(kakaoMap.current, places);
  }, [places]);

  return (
    <>
      <div className="map-experiment">&nbsp;&nbsp;{'마커를 클릭하시면 해당 문화재 검색창으로 이동합니다.'}</div>
      <article ref={mapRef} className={styles.map} id={styles.map}></article>
    </>
  );
};

export default KakaoMap;
