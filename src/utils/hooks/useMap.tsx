import { addZoomControler, removeMarkers, makeOtherMarkers } from 'utils/handleMapMarkers';
import { MarkerType, PlaceType } from 'pages/mappage/types';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
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

  const { otherMarkers, defaultPosition, prevMarkers, setPrevMarkers, defaultMarker = false } = mapParams;
  const center = new kakao.maps.LatLng(
    defaultPosition ? defaultPosition.lat : 37.1597041,
    defaultPosition ? defaultPosition.lon : 128.213384
  );
  const option = {
    center,
    level: 8
  };

  useEffect(() => {
    //파란마커 없는 상황
    if (mapRef.current && !defaultMarker) {
      const container = mapRef.current;

      kakaoMap.current = new kakao.maps.Map(container, option);

      addZoomControler(kakaoMap.current);
    }
  }, [mapRef]);

  useEffect(() => {
    //파란마커가 필요한 상황
    if (defaultMarker && mapRef.current) {
      const container = mapRef.current;

      kakaoMap.current = new kakao.maps.Map(container, option);

      addZoomControler(kakaoMap.current);
      const marker = new kakao.maps.Marker({
        position: center
      });
      marker.setMap(kakaoMap.current);
    }
  }, [defaultPosition, mapRef]);

  useEffect(() => {
    if (otherMarkers && setPrevMarkers) {
      prevMarkers && removeMarkers(prevMarkers, setPrevMarkers);

      setPrevMarkers(makeOtherMarkers(kakaoMap.current, otherMarkers));
    }
  }, [otherMarkers]);

  return { map: kakaoMap };
};

export default useMap;
