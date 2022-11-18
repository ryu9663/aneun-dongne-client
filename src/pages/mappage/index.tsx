import KakaoMap from 'components/KakaoMap/KakaoMap';
import useCurrentPosition from 'utils/hooks/useCurrentPosition';
import styles from './mappage.module.scss';

export interface PositionType {
  lat: number;
  lon: number;
}
const MapPage = () => {
  const { loading, position } = useCurrentPosition();

  return (
    <section className={styles.wrapper}>{loading ? <div>loading...</div> : <KakaoMap position={position} />}</section>
  );
};

export default MapPage;
