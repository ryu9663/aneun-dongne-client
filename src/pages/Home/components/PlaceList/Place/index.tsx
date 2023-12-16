import { Skeleton } from 'pages/Home/components/PlaceList/Place/Skeleton';
import styles from './index.module.scss';
import { useImageLoaded } from 'utils/hooks/useImageLoaded';

interface PlaceProps {
  title: string;
  firstimage: string;
  onMouseEnter: (title: string) => void;
}

const Place = ({ title, firstimage, onMouseEnter }: PlaceProps) => {
  const imageLoaded = useImageLoaded(firstimage);

  return (
    <button className={styles.card_wrapper} onMouseEnter={() => onMouseEnter(title)}>
      <span className={styles.card_title}>{title}</span>
      {imageLoaded ? (
        <a
          href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={styles.card_img}
            src={firstimage || '/images/no-image.png'}
            alt={firstimage ? title : '관광공사에 관광지의 사진이 등록되지 않았습니다.'}
          />
        </a>
      ) : (
        <Skeleton />
      )}
    </button>
  );
};

export default Place;
