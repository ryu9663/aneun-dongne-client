import { PositionType } from '@/pages/Home';
import { HomeView } from '@/pages/Home/components/HomeView';
import { usePlacesQuery } from '@/pages/Home/hooks/usePlacesQuery';
import { usePlacesStore } from '@/pages/Home/hooks/usePlacesStore';

interface HomeWithPositionProps {
  position: PositionType;
}

export const HomeWithPosition = ({ position }: HomeWithPositionProps) => {
  const [pickPoint, radius_KM, numOfPlaces] = usePlacesStore(state => [
    state.pickPoint,
    state.radius_KM,
    state.numOfPlaces
  ]);
  const { data: places } = usePlacesQuery({
    numOfRows: numOfPlaces,
    mapX: pickPoint ? pickPoint.lon : position?.lon,
    mapY: pickPoint ? pickPoint.lat : position?.lat,
    radius: radius_KM * 1000
  });
  return <HomeView places={places} position={position} />;
};
