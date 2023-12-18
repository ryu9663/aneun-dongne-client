import { PlaceSkeleton } from 'pages/Home/components/PlaceList/Place/PlaceSkeleton';
import styles from './index.module.scss';
import { useImageLoaded } from 'utils/hooks/useImageLoaded';

interface PlaceProps {
  title: string;
  firstimage: string;
  onMouseLeave: (title: string) => void;
  onMouseEnter: (title: string) => void;
}

const Place = ({ title, firstimage, onMouseEnter, onMouseLeave }: PlaceProps) => {
  const imageLoaded = useImageLoaded(firstimage);

  return (
    <>
      {imageLoaded ? (
        <button
          className={styles.card_wrapper}
          onMouseEnter={() => onMouseEnter(title)}
          onMouseLeave={() => onMouseLeave(title)}
        >
          <>
            <span className={styles.card_title}>{title}</span>

            <img
              className={styles.card_img}
              src={firstimage || '/images/no-image.png'}
              alt={firstimage ? title : '관광공사에 관광지의 사진이 등록되지 않았습니다.'}
            />
            <a
              href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${title}`}
              target="_blank"
              rel="noreferrer"
            >
              {title} 검색
            </a>
          </>
        </button>
      ) : (
        <PlaceSkeleton />
      )}
    </>
  );
};

export default Place;
