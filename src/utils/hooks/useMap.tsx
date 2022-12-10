import { addZoomControler, removeMarkers, makeOtherMarkers } from 'utils/handleMapMarkers';
import { MarkerType, PlaceType } from 'pages/mappage/types';
import { useEffect, useRef } from 'react';
import { PositionType } from './useCurrentPosition';

interface MapParams {
  otherMarkers?: PlaceType[];
  currentPosition?: PositionType;
  prevMarkers?: MarkerType[];
  setPrevMarkers?: (markers: MarkerType[]) => void;
}
const useMap = (mapRef: any, mapParams: MapParams) => {
  const kakao = window.kakao;
  const kakaoMap = useRef();

  const { otherMarkers, currentPosition, prevMarkers, setPrevMarkers } = mapParams;
  useEffect(() => {
    if (mapRef.current) {
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
    if (otherMarkers && setPrevMarkers) {
      prevMarkers && removeMarkers(prevMarkers, setPrevMarkers);

      setPrevMarkers(makeOtherMarkers(kakaoMap.current, otherMarkers));
    }
  }, [otherMarkers]);

  return { map: kakaoMap };
};

export default useMap;
