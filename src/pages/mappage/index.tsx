import KakaoMap from 'components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';
import { useState } from 'react';

export interface PositionType {
  lat: number;
  lon: number;
}

const MapPage = () => {
  const { loading: currentPositionLoading, position } = useCurrentPosition();
  const [pickPoint, setPickPoint] = useState<PositionType>();

  return (
    <section className={styles.wrapper}>
      {currentPositionLoading ? (
        <div>현재 위치를 불러오는 중입니다.</div>
      ) : (
        <KakaoMap currentPosition={position} pickPoint={pickPoint} setPickPoint={setPickPoint} />
      )}
      <div>지도 아래 부분에 관광지 목록들이 뜨드록 업데이트 예정</div>
    </section>
  );
};

export default MapPage;
