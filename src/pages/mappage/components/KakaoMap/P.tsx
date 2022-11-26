import React, { useEffect } from 'react';
import { onDragMap } from 'utils/handleMapMarkers';

const P = (props: any) => {
  useEffect(() => {
    if (props.kakaoMap.current) {
      console.log(props.kakaoMap.current);
      props.setPickPoint && onDragMap(props.kakaoMap.current, props.setPickPoint);
    }
  }, [props.pickPoint]);
  return <div>null</div>;
};

export default P;
