import styles from './Skeleton.module.scss';
export const Skeleton = () => {
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card_loading}>
        <div className={styles['card_loading_title']} />

        <div className={styles['card_loading_img']} />
      </div>
    </div>
  );
};
