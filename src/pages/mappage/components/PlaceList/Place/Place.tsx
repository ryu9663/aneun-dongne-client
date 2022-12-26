import styles from './place.module.scss';
import { StyledLink } from 'utils/StyledLink';

interface Props {
  title: string;
  addr1: string;
  firstimage: string;
  onMouseEnter: (map: any) => void;
  contentId: string;
}

const Place = ({ title, addr1, firstimage, onMouseEnter, contentId }: Props) => {
  return (
    <StyledLink to={`/detailpage/${contentId}`}>
      <div className={styles.wrapper} onMouseEnter={() => onMouseEnter(title)}>
        <span className={styles.wrapper_title}>{title}</span>
        <img
          className={styles.wrapper_img}
          src={firstimage || '/images/no-image.png'}
          alt={firstimage ? title : '관광공사에 관광지의 사진이 등록되지 않았습니다.'}
        />
        <p className={styles.addr1}>{addr1}</p>
      </div>
    </StyledLink>
  );
};

export default Place;
