/* eslint-disable react-hooks/exhaustive-deps */
import {
  addZoomControler,
  removeMarkers,
  makeMarkers,
  addDragEndListener,
  removeImageTitle
} from '@/utils/handleMapMarkers';
import { MarkerType, PlaceType } from '@/pages/Home/types';
import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { PositionType } from './useCurrentPosition';
import { useQueryParamsStore } from '@/pages/Home/hooks/useQueryParamsStore';

interface MapParams {
  places?: PlaceType[];
  position?: PositionType;
}
interface LatLng {
  La: number; // 위도
  Ma: number; // 경도
}

const useMap = (mapRef: MutableRefObject<null>, { places, position }: MapParams) => {
  const kakao = window.kakao;
  const kakaoMap = useRef(null);
  const prevMarkersRef = useRef<MarkerType[]>([]);
  const setPickPoint = useQueryParamsStore(state => state.setPickPoint);

  const lat = position ? position.lat : 37.1597041;
  const lon = position ? position.lon : 128.213384;

  const center: LatLng = useMemo(() => new kakao.maps.LatLng(lat, lon), [lat, lon]);

  const option = {
    center,
    level: 8
  };

  const initializeMapAndAddZoomControl = () => {
    if (mapRef.current) {
      const container = mapRef.current;
      kakaoMap.current = new kakao.maps.Map(container, option);
      addZoomControler(kakaoMap.current);
      addDragEndListener(kakaoMap.current, setPickPoint);
    }
  };

  const updateMarkers = () => {
    prevMarkersRef.current.length && removeMarkers(prevMarkersRef.current);
    const newMarkers = makeMarkers(kakaoMap.current, places || []);
    prevMarkersRef.current = newMarkers;
  };

  useEffect(() => {
    initializeMapAndAddZoomControl();
  }, [kakao.maps.Map, mapRef]);

  useEffect(() => {
    updateMarkers();
    removeImageTitle();
  }, [places]);

  return { map: kakaoMap };
};

export default useMap;
