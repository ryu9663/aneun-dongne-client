import styles from './PlaceSkeleton.module.scss';
export const PlaceSkeleton = () => {
  return (
    <div className={styles.card_wrapper} data-testid={'placelist-skeleton-ui'}>
      <div className={styles.card_loading}>
        <div className={styles['card_loading_title']} />
        <div className={styles['card_loading_img']} />
      </div>
    </div>
  );
};
