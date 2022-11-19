import { useEffect, useRef, useState } from 'react';
import styles from './kakaomap.module.scss';
import { PositionType } from '../../pages/mappage/index';

import { addZoomControler, onDragMap, setOtherMarkers } from './handler';
import { PlaceType } from 'pages/mappage/types';

export interface Props {
  currentPosition?: PositionType;
  level?: number;
  places?: PlaceType[];
  pickPoint?: PositionType;
  setPickPoint: (position?: PositionType) => void;
}

const KakaoMap = ({ currentPosition, places, pickPoint, setPickPoint, level }: Props) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
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
      const kakaoMap = new kakao.maps.Map(container, option);

      setMap(kakaoMap);
    }
  }, [mapRef]);

  useEffect(() => {
    if (map) {
      addZoomControler(map);
      setPickPoint && onDragMap(map, setPickPoint);
    }
    if (places) setOtherMarkers(map, places);
  }, [map]);

  return (
    <>
      <div className="map-experiment">&nbsp;&nbsp;{'마커를 클릭하시면 해당 문화재 검색창으로 이동합니다.'}</div>
      <article ref={mapRef} className={styles.map} id={styles.map}></article>
    </>
  );
};

export default KakaoMap;
