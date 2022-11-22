import { addZoomControler, setOtherMarkers } from 'components/KakaoMap/handler';
import { useEffect, useRef } from 'react';

const useMap = (mapRef: any, otherMarkers?: any) => {
  const kakao = window.kakao;
  const kakaoMap = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const container = mapRef.current;
      const option = {
        center: new kakao.maps.LatLng(37.1597041, 128.213384),

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
