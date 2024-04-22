import useCurrentPosition from '@/utils//hooks/useCurrentPosition';
import styles from './index.module.scss';
import { KakaoMapSkeleton } from '@/pages/Home/components/KakaoMap/KakaoMapSkeleton';
import { HomeWithPosition } from '@/pages/Home/components/HomeWithPosition';
import { CustomSuspense } from '@/components/CustomSuspense';

export interface PositionType {
  lat: number;
  lon: number;
}

export const Home = () => {
  const { loading, position } = useCurrentPosition();

  return (
    <section className={styles.wrapper}>
      <div className={styles.kakaomap_wrapper}>
        <CustomSuspense loading={loading} fallback={<KakaoMapSkeleton />}>
          {position && <HomeWithPosition position={position} />}
        </CustomSuspense>
      </div>
    </section>
  );
};
