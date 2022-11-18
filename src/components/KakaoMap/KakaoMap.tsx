import { useEffect, useRef } from 'react';
import styles from './kakaomap.module.scss';
import { PositionType } from '../../pages/mappage/index';
import { infoWindowGenerator } from 'utils/InfoWindowGenerator';

interface Props {
  position?: PositionType;
  level?: number;
}
const KakaoMap = ({ position }: Props) => {
  const mapRef = useRef(null);
  const kakao = window.kakao;
  console.log(kakao);
  const openInfoWindow = (map: any, marker: any) => {
    const infoWindow = new kakao.maps.InfoWindow({
      content: infoWindowGenerator('내위치')
    });
    infoWindow.open(map, marker);
  };

  const addZoomControler = (map: any) => {
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  };

  useEffect(() => {
    console.log(kakao);
    if (position && kakao) {
      const container = mapRef.current;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(position.lat, position.lon)
      });
      const options = {
        center: new kakao.maps.LatLng(position.lat, position.lon),
        level: 3,
        marker
      };
      const map = new kakao.maps.Map(container, options);
      marker.setMap(map);
      addZoomControler(map);
      openInfoWindow(map, marker);
    }
  }, [position]);

  return <article ref={mapRef} className={styles.map} id={styles.map}></article>;
};

export default KakaoMap;
