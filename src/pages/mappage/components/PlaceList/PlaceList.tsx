import { PlaceType } from 'pages/mappage/types';
import { useState } from 'react';
import { showSelectedPlacesInfo } from 'utils/handleMapMarkers';

import Place from './Place/Place';
import styles from './placelist.module.scss';

interface Props {
  places: PlaceType[];
  map: any;
}
const PlaceList = ({ places, map }: Props) => {
  const [prevInfo, setPrevInfo] = useState();
  const onClickCards = (title: string) => {
    if (prevInfo) {
      //이전 infowindow 사라져야 함.
    }

    const clickedCards = places.find(place => place.title === title);

    if (clickedCards) {
      console.log(showSelectedPlacesInfo([clickedCards], map.current));
      setPrevInfo(showSelectedPlacesInfo([clickedCards], map.current)[0]);
      showSelectedPlacesInfo([clickedCards], map.current)[0].close();
    } else {
      alert('지도에서 찾지 못한 카드입니다. 개발자에게 문의하세요');
    }
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.cards}>
        {places.map(({ title, addr1, firstimage }) => (
          <div key={title + addr1 + firstimage}>
            <Place title={title} addr1={addr1} firstimage={firstimage} onClick={onClickCards} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlaceList;
