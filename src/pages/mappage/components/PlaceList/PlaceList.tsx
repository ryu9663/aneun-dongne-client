import { MarkerType, PlaceType } from 'pages/mappage/types';
import { useEffect } from 'react';
import { removeInfo, showSelectedPlacesInfo } from 'utils/handleMapMarkers';

import Place from './Place/Place';
import styles from './placelist.module.scss';

interface Props {
  places: PlaceType[];
  map: any;
  prevMarkers?: MarkerType[];
  setPrevMarkers?: (markers: MarkerType[]) => void;
  prevInfo: any;
  setPrevInfo: any;
}
const PlaceList = ({ places, map, prevMarkers, prevInfo, setPrevInfo, setPrevMarkers }: Props) => {
  const onHoverCards = (title: string) => {
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
  }, []);

  return (
    <section className={styles.wrapper}>
      <button onClick={() => {}}>a</button>
      <button
        onClick={() =>
          prevMarkers && (prevMarkers as any).forEach((marker: { setMap: (arg0: null) => any }) => marker.setMap(null))
        }
      >
        b
      </button>
      <div className={styles.cards}>
        {places.map(({ title, addr1, firstimage }) => (
          <div key={title + addr1 + firstimage}>
            <Place title={title} addr1={addr1} firstimage={firstimage} onMouseEnter={onHoverCards} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlaceList;
