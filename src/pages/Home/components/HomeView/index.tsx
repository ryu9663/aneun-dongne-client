import { PositionType } from '@/pages/Home';
import KakaoMap from '@/pages/Home/components/KakaoMap';
import PlaceList from '@/pages/Home/components/PlaceList';
import { PlaceType } from '@/pages/Home/types';
import styles from '../../index.module.scss';
import { useState } from 'react';
import { PlaceListSkeleton } from '@/pages/Home/components/PlaceList/PlaceListSkeleton';

interface HomeViewProps {
  position?: PositionType;
  places?: PlaceType[];
  isLoading: boolean;
}
const kakao = window.kakao;

export const HomeView = ({ position, places, isLoading }: HomeViewProps) => {
  const [map, setMap] = useState<typeof kakao.maps.Map | null>(null);

  return (
    <>
      <KakaoMap position={position} places={places} setMap={setMap} isLoading={isLoading} />
      <div className={styles.placelist_wrapper}>
        {isLoading ? <PlaceListSkeleton /> : <PlaceList places={places || []} map={map} />}
      </div>
    </>
  );
};
