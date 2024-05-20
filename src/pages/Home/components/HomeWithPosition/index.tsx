import { PositionType } from '@/pages/Home';
import KakaoMap from '@/pages/Home/components/KakaoMap';
import PlaceList from '@/pages/Home/components/PlaceList';
import { PlaceListSkeleton } from '@/pages/Home/components/PlaceList/PlaceListSkeleton';
import { usePlacesQuery } from '@/pages/Home/hooks/usePlacesQuery';
import styles from '../../index.module.scss';

interface HomeWithPositionProps {
  position: PositionType;
}

export const HomeWithPosition = ({ position }: HomeWithPositionProps) => {
  const { data: places, isLoading } = usePlacesQuery(position);
  return (
    <>
      <KakaoMap position={position} places={places} isLoading={isLoading} />
      <div className={styles.placelist_wrapper}>
        {isLoading ? <PlaceListSkeleton /> : <PlaceList places={places || []} />}
      </div>
    </>
  );
};
