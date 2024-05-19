import { vi } from 'vitest';

export const mockNavigatorGeolocation = () => {
  const clearWatchMock = vi.fn();
  const getCurrentPositionMock = vi.fn();
  const watchPositionMock = vi.fn();

  const geolocation = {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    writable: true,
    value: geolocation
  });
  Object.defineProperty(global.navigator, 'permissions', {
    writable: true,
    value: {
      query: vi.fn().mockImplementation(() => Promise.resolve({ state: 'granted' }))
    }
  });

  return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
};
