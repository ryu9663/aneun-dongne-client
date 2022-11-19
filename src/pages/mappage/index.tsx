import KakaoMap from 'components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getPlaces } from 'query/queryFn';
import queryKeys from '../../query/queryKeys';
import { useMemo, useState } from 'react';

export interface PositionType {
  lat: number;
  lon: number;
}

const MapPage = () => {
  const { loading: currentPositionLoading, position } = useCurrentPosition();
  const [pickPoint, setPickPoint] = useState<PositionType>();

  const placeParmas = useMemo(
    () => ({
      numOfRows: 50,
      mapX: pickPoint ? pickPoint.lon : position?.lon,
      mapY: pickPoint ? pickPoint.lat : position?.lat,
      radius: 10000
    }),
    [currentPositionLoading, pickPoint]
  );

  const { data: placesData, isLoading } = useQuery({
    queryKey: [queryKeys.PLACES(placeParmas)],
    queryFn: () => getPlaces(placeParmas)
  });

  const places = placesData?.response?.body?.items.item;

  return (
    <section className={styles.wrapper}>
      {isLoading || currentPositionLoading ? (
        <div>loading...</div>
      ) : (
        <KakaoMap
          level={1}
          currentPosition={position}
          places={places}
          pickPoint={pickPoint}
          setPickPoint={setPickPoint}
        />
      )}
      <div>지도 아래 부분에 관광지 목록들이 뜨드록 업데이트 예정</div>
    </section>
  );
};

export default MapPage;
