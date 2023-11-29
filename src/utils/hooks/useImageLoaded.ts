import { useEffect, useState } from 'react';

export const useImageLoaded = (src?: string) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const imageElement = new Image();
    imageElement.src = src || '/images/no-image.png';
    imageElement.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);
  return imageLoaded;
};
