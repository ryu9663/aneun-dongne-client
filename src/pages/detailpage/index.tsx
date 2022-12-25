import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import queryKeys from 'query/queryKeys';
import { getPlaceInfo } from 'query/queryFn';
import styles from './detailpage.module.scss';
import { useEffect, useRef, useState } from 'react';
import useMap from 'utils/hooks/useMap';

const DetailPage = () => {
  const [defaultPosition, setDefaultPosition] = useState({ lat: 37, lon: 127 });
  const params = useParams();
  const mapRef = useRef(null);

  const { contentId } = params as { contentId: string };

  const { data, isLoading } = useQuery([queryKeys.PLACE(contentId)], () => getPlaceInfo(contentId));
  useEffect(() => {
    if (data) {
      setDefaultPosition({ lat: data.mapy, lon: data.mapx });
    }
  }, [data]);
  useMap(mapRef, { defaultMarker: true, defaultPosition });
  if (isLoading) return <div>loading..</div>;
  else
    return (
      <section className={styles.wrapper}>
        <div className={styles.wrapper_info}>
          <span className={styles.wrapper_info_addr1}>{data.addr1}</span>
          <span className={styles.wrapper_info_title}>{data.title}</span>
          <img
            className={styles.wrapper_info_firstimage}
            src={data.firstimage}
            alt={data.title}
            width={823}
            height={483}
          />
          <p className={styles.wrapper_info_overview}>{data.overview.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}</p>
          <div ref={mapRef} className={styles.map} id={styles.map}>
            <div className={styles.map_experiment}></div>
          </div>
        </div>
      </section>
    );
};

export default DetailPage;
