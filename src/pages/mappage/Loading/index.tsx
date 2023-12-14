import styles from './index.module.scss';

export const Loading = ({ content }: any) => {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.loading_wrapper_spinner}>{content}</div>
    </div>
  );
};
