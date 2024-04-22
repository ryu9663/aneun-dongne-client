import { PlaceSkeleton } from '@/pages/Home/components/PlaceList/Place/PlaceSkeleton';
import { useRef } from 'react';
import styles from './PlaceListSkeleton.module.scss';

export const PlaceListSkeleton = () => {
  const skeletonWrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={skeletonWrapperRef} className={styles.placelist_skeleton_wrapper}>
      {new Array(Math.floor((skeletonWrapperRef.current?.clientWidth || 2000) / 100)).fill(0).map((_, i) => (
        <PlaceSkeleton key={i} />
      ))}
    </div>
  );
};
