import { PlaceType } from '@/pages/Home/types';
import { useRef, useState } from 'react';
import { removeInfo, showSelectedPlaceInfoOnMap } from '@/utils/handleMapMarkers';

import Place from './Place';
import styles from './index.module.scss';
import { DragSlider } from 'junyeol-components';
import { PlaceSkeleton } from '@/pages/Home/components/PlaceList/Place/PlaceSkeleton';
import { usePlacesStore } from '@/pages/Home/hooks/usePlacesStore';

interface Props {
  places?: PlaceType[];
  map: any;
  isLoading: boolean;
}
const PlaceList = ({ places, map, isLoading }: Props) => {
  const [prevInfo, setPrevInfo] = useState();
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [radius_KM] = usePlacesStore(state => [state.radius_KM]);

  const onUnHoverCard = () => {
    if (prevInfo) {
      removeInfo(prevInfo);
    }
  };

  const onHoverCard = (title: string) => {
    const clickedCards = places?.find(place => place.title === title);

    if (clickedCards) {
      setPrevInfo(showSelectedPlaceInfoOnMap([clickedCards], map.current));
    } else {
      alert('지도에서 찾지 못한 카드입니다. 개발자에게 문의하세요');
    }
  };

  return (
    <div className={styles.wrapper} ref={WrapperRef}>
      <DragSlider hasCloudyArea hideScrollbar={isLoading}>
        {isLoading ? (
          <div data-testid="placelist-skeleton-ui">
            {new Array(Math.floor((WrapperRef.current?.clientWidth || 2000) / 200)).fill(0).map((_, i) => (
              <PlaceSkeleton key={i} />
            ))}
          </div>
        ) : (
          places?.map(({ title, addr1, firstimage }) => (
            <Place
              title={title}
              firstimage={firstimage}
              onMouseEnter={onHoverCard}
              key={title + addr1 + firstimage}
              onMouseLeave={onUnHoverCard}
            />
          )) || <span>{radius_KM}KM 내에 관광지가 없습니다.</span>
        )}
      </DragSlider>
    </div>
  );
};

export default PlaceList;
