/* eslint-disable react-hooks/exhaustive-deps */
import { addZoomControler, removeMarkers, makeOtherMarkers, removeImageTitle } from 'utils/handleMapMarkers';
import { MarkerType, PlaceType } from 'pages/Home/types';
import { useEffect, useMemo, useRef } from 'react';
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
  const center = useMemo(
    () =>
      new kakao.maps.LatLng(
        defaultPosition ? defaultPosition.lat : 37.1597041,
        defaultPosition ? defaultPosition.lon : 128.213384
      ),
    [defaultPosition, kakao.maps.LatLng]
  );
  const option = useMemo(
    () => ({
      center,
      level: 8
    }),
    [center]
  );

  useEffect(() => {
    //파란마커 없는 상황
    if (mapRef.current && !defaultMarker) {
      const container = mapRef.current;
      kakaoMap.current = new kakao.maps.Map(container, option);

      addZoomControler(kakaoMap.current);
    }
  }, [defaultMarker, kakao.maps.Map, mapRef, option]);

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
    if (setPrevMarkers) {
      prevMarkers && removeMarkers(prevMarkers, setPrevMarkers);
      setPrevMarkers(makeOtherMarkers(kakaoMap.current, otherMarkers || []));
    }
  }, [otherMarkers]);

  removeImageTitle();
  return { map: kakaoMap };
};

export default useMap;
