import { PositionType } from '@/pages/Home';
import KakaoMap from '@/pages/Home/components/KakaoMap';
import PlaceList from '@/pages/Home/components/PlaceList';
import { PlaceListSkeleton } from '@/pages/Home/components/PlaceList/PlaceListSkeleton';
import { usePlacesQuery } from '@/pages/Home/hooks/usePlacesQuery';
import { useQueryParamsStore } from '@/pages/Home/hooks/useQueryParamsStore';
import styles from '../../index.module.scss';

interface HomeWithPositionProps {
  position: PositionType;
}

export const HomeWithPosition = ({ position }: HomeWithPositionProps) => {
  const [pickPoint, radius_KM, numOfPlaces] = useQueryParamsStore(state => [
    state.pickPoint,
    state.radius_KM,
    state.numOfPlaces
  ]);
  const { data: places, isLoading } = usePlacesQuery(
    {
      numOfRows: numOfPlaces,
      mapX: pickPoint ? pickPoint.lon : position?.lon,
      mapY: pickPoint ? pickPoint.lat : position?.lat,
      radius: radius_KM * 1000
    },
    position
  );
  return (
    <>
      <KakaoMap position={position} places={places} isLoading={isLoading} />
      <div className={styles.placelist_wrapper}>
        {isLoading ? <PlaceListSkeleton /> : <PlaceList places={places || []} />}
      </div>
    </>
  );
};
