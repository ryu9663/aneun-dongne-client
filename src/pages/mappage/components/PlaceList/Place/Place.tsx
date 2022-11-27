import styles from './place.module.scss';

interface Props {
  title: string;
  addr1: string;
  firstimage: string;
  onMouseEnter: (map: any) => void;
}

const Place = ({ title, addr1, firstimage, onMouseEnter }: Props) => {
  return (
    <div className={styles.wrapper} onMouseEnter={() => onMouseEnter(title)}>
      <span className={styles.wrapper_title}>{title}</span>
      <img className={styles.wrapper_img} src={firstimage} alt={title} />
      <p className={styles.addr1}>{addr1}</p>
    </div>
  );
};

export default Place;
