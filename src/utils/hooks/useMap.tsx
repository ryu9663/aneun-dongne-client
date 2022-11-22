import { addZoomControler, setOtherMarkers } from 'components/KakaoMap/handler';
import { PlaceType } from 'pages/mappage/types';
import { useEffect, useRef } from 'react';
import { PositionType } from './useCurrentPosition';

const useMap = (mapRef: any, otherMarkers?: PlaceType[], currentPosition?: PositionType) => {
  const kakao = window.kakao;
  const kakaoMap = useRef();

  useEffect(() => {
    if (mapRef.current) {
      console.log(currentPosition);
      const container = mapRef.current;
      const center = new kakao.maps.LatLng(
        currentPosition ? currentPosition.lat : 37.1597041,
        currentPosition ? currentPosition.lon : 128.213384
      );
      const option = {
        center,
        level: 8
      };
      kakaoMap.current = new kakao.maps.Map(container, option);
      addZoomControler(kakaoMap.current);
    }
  }, [mapRef]);
  useEffect(() => {
    if (otherMarkers) setOtherMarkers(kakaoMap.current, otherMarkers);
  }, [otherMarkers]);

  return { map: kakaoMap };
};

export default useMap;
