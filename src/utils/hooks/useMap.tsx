/* eslint-disable react-hooks/exhaustive-deps */
import { addZoomControler, removeMarkers, makeMarkers, removeImageTitle, onDragMap } from '@/utils/handleMapMarkers';
import { MarkerType, PlaceType } from '@/pages/Home/types';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
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
  const [prevMarkers, setPrevMarkers] = useState<MarkerType[]>([]);
  const [pickPoint, setPickPoint] = useQueryParamsStore(state => [state.pickPoint, state.setPickPoint]);

  const lat = position ? position.lat : 37.1597041;
  const lon = position ? position.lon : 128.213384;

  const center: LatLng = useMemo(() => new kakao.maps.LatLng(lat, lon), [lat, lon]);

  const option = {
    center,
    level: 8
  };

  useEffect(() => {
    const initializeMapAndAddZoomControl = () => {
      if (mapRef.current) {
        const container = mapRef.current;
        kakaoMap.current = new kakao.maps.Map(container, option);
        addZoomControler(kakaoMap.current);
      }
    };

    initializeMapAndAddZoomControl();
  }, [kakao.maps.Map, mapRef]);

  useEffect(() => {
    const updateMarkers = () => {
      const newMarkers = makeMarkers(kakaoMap.current, places || []);
      setPrevMarkers(newMarkers);
    };

    updateMarkers();
  }, [places]);

  useEffect(() => {
    const handlePickPointChange = () => {
      if (kakaoMap.current) {
        prevMarkers && removeMarkers(prevMarkers);
        onDragMap(kakaoMap.current, setPickPoint);
      }
    };

    handlePickPointChange();
  }, [pickPoint]);

  removeImageTitle();
  return { map: kakaoMap };
};

export default useMap;
