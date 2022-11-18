import { useEffect, useState } from 'react';

export interface PositionType {
  lat: number;
  lon: number;
}
const useCurrentPosition = () => {
  const [position, setPosition] = useState<PositionType>();
  useEffect(() => {
    // 랜더링 횟수를 알기위한 콘솔
    console.log('hihi');
    navigator.geolocation.watchPosition(
      position => {
        console.log('신호표시용 콘솔', position);
        setPosition({ ...position, ...{ lat: position.coords.latitude, lon: position.coords.longitude } });
      },
      () => console.log('sorry no positiion available')
    );
  }, []);
  return { loading: !position, position };
};

export default useCurrentPosition;
