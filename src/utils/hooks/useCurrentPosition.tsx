import { useEffect, useState } from 'react';

export interface PositionType {
  lat: number;
  lon: number;
}
const useCurrentPosition = () => {
  const [position, setPosition] = useState<PositionType>();

  useEffect(() => {
    navigator.geolocation.watchPosition(
      position => {
        setPosition({ ...position, ...{ lat: position.coords.latitude, lon: position.coords.longitude } });
      },
      () => console.log('sorry no positiion available')
    );
  }, []);
  return { loading: !position, position };
};

export default useCurrentPosition;
