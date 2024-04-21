import { PositionType } from '@/pages/Home';
import KakaoMap from '@/pages/Home/components/KakaoMap';
import PlaceList from '@/pages/Home/components/PlaceList';
import { PlaceType } from '@/pages/Home/types';
import styles from '../../index.module.scss';
import { useState } from 'react';

interface HomeViewProps {
  position?: PositionType;
  places?: PlaceType[];
}
const kakao = window.kakao;

export const HomeView = ({ position, places }: HomeViewProps) => {
  const [map, setMap] = useState<typeof kakao.maps.Map | null>(null);

  return (
    <>
      <KakaoMap position={position} places={places} setMap={setMap} />
      <div className={styles.placelist_wrapper}>
        <PlaceList places={places || []} map={map} />
      </div>
    </>
  );
};
