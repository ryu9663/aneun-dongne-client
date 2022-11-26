import KakaoMap from 'pages/mappage/components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { PlaceParams, PlaceType } from './types';
import PlaceList from './components/PlaceList/PlaceList';
import { Loading } from './Loading/Loading';
import P from './components/KakaoMap/P';
import { useQuery } from '@tanstack/react-query';
import queryKeys from 'query/queryKeys';
import { getPlaces } from 'query/queryFn';

export interface PositionType {
  lat: number;
  lon: number;
}

const MapPage = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [pickPoint, setPickPoint] = useState<PositionType>();
  const [places, setPlaces] = useState<PlaceType[]>();

  const [map, setMap] = useState();
  return (
    <section className={styles.wrapper}>
      {currentPositionLoading ? (
        <div>현재 위치를 불러오는 중입니다.</div>
      ) : (
        <>
          <KakaoMap
            currentPosition={currentPosition}
            pickPoint={pickPoint}
            setPickPoint={setPickPoint}
            places={places}
            setPlaces={setPlaces}
            setMap={setMap}
          />

          {places && <PlaceList places={places} map={map} />}
        </>
      )}
    </section>
  );
};

export default MapPage;
