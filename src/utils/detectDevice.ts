import { isBrowser, isMobile } from 'react-device-detect';

export const detectDevice = () => {
  if (isBrowser) {
    return 'PC';
  } else if (isMobile) {
    return 'Mobile';
  } else return 'Tablet';
};
