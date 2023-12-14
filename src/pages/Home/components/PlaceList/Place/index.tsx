import { Skeleton } from 'pages/Home/components/PlaceList/Place/Skeleton';
import styles from './index.module.scss';
import { useImageLoaded } from 'utils/hooks/useImageLoaded';

interface Props {
  title: string;
  addr1: string;
  firstimage: string;
  onMouseEnter: (map: any) => void;
  contentId: string;
}

const Place = ({ title, addr1, firstimage, onMouseEnter, contentId }: Props) => {
  const imageLoaded = useImageLoaded(firstimage);

  return (
    <div className={styles.wrapper}>
      <span className={styles.wrapper_title}>{title}</span>
      {imageLoaded ? (
        <img
          className={styles.wrapper_img}
          src={firstimage || '/images/no-image.png'}
          alt={firstimage ? title : '관광공사에 관광지의 사진이 등록되지 않았습니다.'}
        />
      ) : (
        <Skeleton />
      )}
      <p className={styles.addr1}>{addr1}</p>
      <a
        className={styles.wrapper_button}
        onMouseEnter={() => onMouseEnter(title)}
        rel="noreferrer"
        target="_blank"
        href={`/detailpage/${contentId}`}
      >
        자세히보기
      </a>
    </div>
  );
};

export default Place;
