import { PlaceType } from 'pages/Home/types';
import { useEffect, useRef } from 'react';
import { removeInfo, showSelectedPlacesInfo } from 'utils/handleMapMarkers';

import Place from './Place';
import styles from './index.module.scss';
import { DragSlider } from 'junyeol-components';
import { PlaceSkeleton } from 'pages/Home/components/PlaceList/Place/PlaceSkeleton';
import { usePlacesStore } from 'pages/Home/hooks/usePlacesStore';

interface Props {
  places?: PlaceType[];
  //! TODO : any
  map: any;
  prevInfo: any;
  setPrevInfo: any;

  //!
  isLoading: boolean;
}
const PlaceList = ({ places, map, prevInfo, setPrevInfo, isLoading }: Props) => {
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [radius_KM] = usePlacesStore(state => [state.radius_KM]);

  const onUnHoverCard = () => {
    if (prevInfo) {
      removeInfo(prevInfo);
    }
  };
  const onHoverCard = (title: string) => {
    if (prevInfo) {
      removeInfo(prevInfo);
    }

    const clickedCards = places?.find(place => place.title === title);

    if (clickedCards) {
      setPrevInfo(showSelectedPlacesInfo([clickedCards], map.current));
    } else {
      alert('지도에서 찾지 못한 카드입니다. 개발자에게 문의하세요');
    }
  };

  useEffect(() => {
    return () => {
      prevInfo && removeInfo(prevInfo);
    };
  }, [prevInfo]);

  return (
    <div className={styles.wrapper} ref={WrapperRef}>
      <DragSlider hasCloudyArea hideScrollbar={isLoading}>
        {isLoading ? (
          <>
            {new Array(Math.floor((WrapperRef.current?.clientWidth || 2000) / 200)).fill(0).map((_, i) => (
              <PlaceSkeleton key={i} />
            ))}
          </>
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
