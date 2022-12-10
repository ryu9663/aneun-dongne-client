import KakaoMap from 'pages/mappage/components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';
import { useState } from 'react';
import { MarkerType, PlaceType } from './types';
import PlaceList from './components/PlaceList/PlaceList';

export interface PositionType {
  lat: number;
  lon: number;
}

const MapPage = () => {
  const { loading: currentPositionLoading, position: currentPosition } = useCurrentPosition();
  const [pickPoint, setPickPoint] = useState<PositionType>();
  const [places, setPlaces] = useState<PlaceType[]>();
  const [prevInfo, setPrevInfo] = useState();
  const [prevMarkers, setPrevMarkers] = useState<MarkerType[]>([]);
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
            prevMarkers={prevMarkers}
            setPrevMarkers={setPrevMarkers}
          />

          {places && (
            <PlaceList
              prevInfo={prevInfo}
              setPrevInfo={setPrevInfo}
              places={places}
              map={map}
              prevMarkers={prevMarkers}
              setPrevMarkers={setPrevMarkers}
            />
          )}
        </>
      )}
    </section>
  );
};

export default MapPage;
