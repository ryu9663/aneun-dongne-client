import { useEffect, useRef } from 'react';
import styles from './kakaomap.module.scss';
import { PositionType } from '../../pages/mappage/index';

import { addZoomControler, openInfoWindow, setOtherMarkers } from './handler';
import { PlaceType } from 'pages/mappage/types';

export interface Props {
  position?: PositionType;
  level?: number;

  places?: PlaceType[];
}

const KakaoMap = ({ position, places }: Props) => {
  const mapRef = useRef(null);
  const kakao = window.kakao;

  useEffect(() => {
    if (position && kakao) {
      const container = mapRef.current;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.lat, position.lon)
      });
      const options = {
        center: new kakao.maps.LatLng(position.lat, position.lon),
        level: 8,
        marker
      };

      const map = new kakao.maps.Map(container, options);
      marker.setMap(map);
      addZoomControler(map);
      openInfoWindow(map, marker);
      places && setOtherMarkers(map, places);
    }
  }, [position, places]);

  return <article ref={mapRef} className={styles.map} id={styles.map}></article>;
};

export default KakaoMap;
