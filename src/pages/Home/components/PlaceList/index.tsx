import { PlaceType } from '@/pages/Home/types';
import { useState } from 'react';
import { removeInfo, showSelectedPlaceInfoOnMap } from '@/utils/handleMapMarkers';

import Place from './Place';
import styles from './index.module.scss';
import { DragSlider } from 'junyeol-components';
import { usePlacesStore } from '@/pages/Home/hooks/usePlacesStore';

interface Props {
  places: PlaceType[];
  map: any;
}
const PlaceList = ({ places, map }: Props) => {
  const [prevInfo, setPrevInfo] = useState();
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
    <div className={styles.placelist_wrapper}>
      {places.length ? (
        <DragSlider>
          {places.map(({ title, addr1, firstimage }) => (
            <Place
              title={title}
              firstimage={firstimage}
              onMouseEnter={onHoverCard}
              key={title + addr1 + firstimage}
              onMouseLeave={onUnHoverCard}
            />
          ))}
        </DragSlider>
      ) : (
        <div className={styles.no_result}>주변에 {radius_KM}km 이내에 관광지가 없습니다.</div>
      )}
    </div>
  );
};

export default PlaceList;
