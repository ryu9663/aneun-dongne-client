import { debounce } from 'lodash-es';
import { useEffect, useState, RefObject } from 'react';

const useHasScroll = (sliderRef: RefObject<HTMLDivElement>) => {
  const [hasScroll, setHasScroll] = useState<boolean>(true);
  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    setHasScroll(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);

    const handleWindowResize = debounce(() => {
      if (sliderRef.current) {
        setHasScroll(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);
      }
    }, 500);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return hasScroll;
};

export default useHasScroll;
