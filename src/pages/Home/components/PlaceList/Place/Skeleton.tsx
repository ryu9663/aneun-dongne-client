import styles from './Skeleton.module.scss';
export const Skeleton = () => {
  return (
    <div className={styles['skeleton-container']}>
      <div className={styles['skeleton-box']}></div>
    </div>
  );
};
