import { PlaceType } from 'pages/Home/types';
import { useEffect } from 'react';
import { removeInfo, showSelectedPlacesInfo } from 'utils/handleMapMarkers';

import Place from './Place';
import styles from './index.module.scss';
import { DragSlider } from 'junyeol-components';

interface Props {
  places: PlaceType[];
  //! TODO : any
  map: any;
  prevInfo: any;
  setPrevInfo: any;

  //!
}
const PlaceList = ({ places, map, prevInfo, setPrevInfo }: Props) => {
  const onHoverCard = (title: string) => {
    if (prevInfo) {
      removeInfo(prevInfo);
    }

    const clickedCards = places.find(place => place.title === title);

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
    <div className={styles.wrapper}>
      <DragSlider hasCloudyArea>
        {places.map(({ title, addr1, firstimage, contentid }) => (
          <Place title={title} firstimage={firstimage} onMouseEnter={onHoverCard} key={title + addr1 + firstimage} />
        ))}
      </DragSlider>
    </div>
  );
};

export default PlaceList;