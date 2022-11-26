import { useEffect, useMemo, useRef } from 'react';
import styles from './kakaomap.module.scss';
import { PositionType } from '../../pages/mappage/index';

import { onDragMap } from './handler';
import { PlaceType } from 'pages/mappage/types';
import { useQuery } from '@tanstack/react-query';
import queryKeys from 'query/queryKeys';
import { getPlaces } from 'query/queryFn';
import useMap from 'utils/hooks/useMap';

export interface Props {
  currentPosition?: PositionType;

  places?: PlaceType[];
  pickPoint?: PositionType;
  setPickPoint: (position?: PositionType) => void;
}

const KakaoMap = ({ currentPosition, pickPoint, setPickPoint }: Props) => {
  const mapRef = useRef(null);
  //! TODO : 쿼리를 포함하는 useMap 훅을 하나 만들거나, 지금처럼 data를 useMap안에 넣던가
  const placeParmas = useMemo(
    () => ({
      numOfRows: 50,
      mapX: pickPoint ? pickPoint.lon : currentPosition?.lon,
      mapY: pickPoint ? pickPoint.lat : currentPosition?.lat,
      radius: 10000
    }),
    [pickPoint]
  );

  const { data: placesData, isLoading } = useQuery({
    queryKey: [queryKeys.PLACES(placeParmas)],
    queryFn: () => getPlaces(placeParmas)
  });

  const places = placesData?.response?.body?.items.item;
  //!
  const { map: kakaoMap } = useMap(mapRef, places, currentPosition);

  useEffect(() => {
    if (kakaoMap.current) setPickPoint && onDragMap(kakaoMap.current, setPickPoint);
  }, [kakaoMap]);

  return (
    <>
      <>
        {isLoading && <span>주변 관광지들을 탐색중입니다.</span>}
        <div className="map-experiment">&nbsp;&nbsp;{'마커를 클릭하시면 해당 문화재 검색창으로 이동합니다.'}</div>
        <article ref={mapRef} className={styles.map} id={styles.map}></article>
      </>
    </>
  );
};

export default KakaoMap;
