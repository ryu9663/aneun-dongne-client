import KakaoMap from 'pages/mappage/components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';
import { useState } from 'react';
import { PlaceType } from './types';
import PlaceList from './components/PlaceList/PlaceList';

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
