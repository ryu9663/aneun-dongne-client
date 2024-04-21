import useCurrentPosition from '@/utils//hooks/useCurrentPosition';
import styles from './index.module.scss';
import { KakaoMapSkeleton } from '@/pages/Home/components/KakaoMap/KakaoMapSkeleton';
import { HomeWithPosition } from '@/pages/Home/components/HomeWithPosition';
import { CustomSuspense } from '@/components/CustomSuspense';
import { Suspense } from 'react';
import { Loading } from '@/pages/Home/Loading';

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
          <Suspense fallback={<Loading content="주변 관광지들을 탐색중입니다." />}>
            {position && <HomeWithPosition position={position} />}
          </Suspense>
        </CustomSuspense>
      </div>
    </section>
  );
};
