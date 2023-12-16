import { Loading } from 'pages/Home/Loading';
import styles from './index.module.scss';

export const KakaoMapSkeleton = () => {
  return (
    <div className={styles.map_wrapper}>
      <Loading content="현재 위치를 받아오고 있습니다." />
    </div>
  );
};
