import { useEffect, useState } from 'react';

export interface PositionType {
  lat: number;
  lon: number;
}
const useCurrentPosition = () => {
  const [position, setPosition] = useState<PositionType>();

  useEffect(() => {
    if (sessionStorage.getItem('lat') && sessionStorage.getItem('lon')) {
      setPosition({ lat: Number(sessionStorage.getItem('lat')), lon: Number(sessionStorage.getItem('lon')) });
      return;
    }
    navigator.geolocation.watchPosition(
      position => {
        sessionStorage.setItem('lat', String(position.coords.latitude));
        sessionStorage.setItem('lon', String(position.coords.longitude));
        setPosition({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => console.log('sorry no positiion available')
    );
  }, []);
  return { loading: !position, position };
};

export default useCurrentPosition;
