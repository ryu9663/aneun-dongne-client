import { addZoomControler, removeMarkers, makeOtherMarkers } from 'utils/handleMapMarkers';
import { MarkerType, PlaceType } from 'pages/mappage/types';
import { useEffect, useRef } from 'react';
import { PositionType } from './useCurrentPosition';

interface MapParams {
  otherMarkers?: PlaceType[];
  defaultPosition?: PositionType;
  prevMarkers?: MarkerType[];
  setPrevMarkers?: (markers: MarkerType[]) => void;
  defaultMarker?: boolean;
}
const useMap = (mapRef: any, mapParams: MapParams) => {
  const kakao = window.kakao;
  const kakaoMap = useRef();

  const { otherMarkers, defaultPosition, prevMarkers, setPrevMarkers, defaultMarker } = mapParams;

  useEffect(() => {
    if (mapRef.current) {
      console.log(mapRef);
      const container = mapRef.current;
      const center = new kakao.maps.LatLng(
        defaultPosition ? defaultPosition.lat : 37.1597041,
        defaultPosition ? defaultPosition.lon : 128.213384
      );
      const option = {
        center,
        level: 8
      };
      kakaoMap.current = new kakao.maps.Map(container, option);

      if (defaultMarker) {
        const marker = new kakao.maps.Marker({
          position: center
        });

        marker.setMap(kakaoMap.current);
      }
      addZoomControler(kakaoMap.current);
    }
  }, [mapRef, defaultPosition]);

  useEffect(() => {
    if (otherMarkers && setPrevMarkers) {
      prevMarkers && removeMarkers(prevMarkers, setPrevMarkers);

      setPrevMarkers(makeOtherMarkers(kakaoMap.current, otherMarkers));
    }
  }, [otherMarkers]);

  return { map: kakaoMap };
};

export default useMap;
