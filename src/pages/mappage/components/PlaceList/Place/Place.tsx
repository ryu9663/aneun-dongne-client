import styles from './place.module.scss';

interface Props {
  title: string;
  addr1: string;
  firstimage: string;
  onClick: (map: any) => void;
}

const Place = ({ title, addr1, firstimage, onClick }: Props) => {
  return (
    <button onClick={() => onClick(title)}>
      <div className={styles.wrapper}>
        <span className={styles.wrapper_title}>{title}</span>
        <img className={styles.wrapper_img} src={firstimage} alt={title} />
        <p className={styles.addr1}>{addr1}</p>
      </div>
    </button>
  );
};

export default Place;
