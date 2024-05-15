import { PlaceType } from '@/pages/Home/types';
import { useState } from 'react';
import { removeInfo, showSelectedPlaceInfoOnMap } from '@/utils/handleMapMarkers';

import Place from './Place';
import styles from './index.module.scss';
import { DragSlider } from 'junyeol-components';
import { useQueryParamsStore } from '@/pages/Home/hooks/useQueryParamsStore';
import { useMapStore } from '@/pages/Home/hooks/useMapStore';
import { flushSync } from 'react-dom';

interface Props {
  places: PlaceType[];
}
const PlaceList = ({ places }: Props) => {
  const [prevInfo, setPrevInfo] = useState();
  const [radius_KM] = useQueryParamsStore(state => [state.radius_KM]);
  const mapInfo = useMapStore(state => state.mapInfo);

  const onUnHoverCard = () => {
    if (prevInfo) {
      removeInfo(prevInfo);
    }
  };

  const onHoverCard = (title: string) => {
    const hoveredCard = places?.find(place => place.title === title);

    if (hoveredCard) {
      const matchedInfo = showSelectedPlaceInfoOnMap([hoveredCard], mapInfo.current);
      flushSync(() => {
        setPrevInfo(matchedInfo);
      });
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
