/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { PositionType } from '../../index';
import { PlaceType } from '@/pages/Home/types';
import useMap from '@/utils//hooks/useMap';
import { SearchOption } from '@/pages/Home/components/KakaoMap/SearchOption';
import { usePlacesStore } from '@/pages/Home/hooks/usePlacesStore';
import { Loading } from '@/pages/Home/Loading';

export interface Props {
  position?: PositionType;
  places?: PlaceType[];
  setMap: (map: any) => void;
  isLoading: boolean;
}

const KakaoMap = ({ position, places, setMap, isLoading }: Props) => {
  const mapRef = useRef(null);

  const { map: kakaoMap } = useMap(mapRef, {
    places,
    position
  });

  const [radius_KM, numOfPlaces] = usePlacesStore(state => [state.radius_KM, state.numOfPlaces]);

  useEffect(() => setMap(kakaoMap), [kakaoMap]);

  return (
    <article className={styles.map_wrapper}>
      {isLoading && <Loading content="주변 관광지들을 탐색중입니다." />}
      <div ref={mapRef} className={styles.map} id={styles.map} data-testid="kakao-map">
        <h2 className={styles.map_experiment}>
          &nbsp;&nbsp;{`지도를 드래그하면 ${radius_KM}km 주변에 위치한 관광지들을 ${numOfPlaces}개 검색합니다.`}
        </h2>
        <SearchOption />
      </div>
    </article>
  );
};

export default KakaoMap;
