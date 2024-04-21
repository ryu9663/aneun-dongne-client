// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { server } from '@/__mocks__/server';
import '@testing-library/jest-dom';
import { mockNavigatorGeolocation } from './utils/test/mockNavigatorGeolocation';
import { vi } from 'vitest';

beforeAll(() => {
  mockNavigatorGeolocation();

  const initZoomLevel = 3;
  const setLevel = vi.fn();
  const getLevel = vi.fn();
  const LatLng = vi.fn();
  const kakao = {
    maps: {
      Map: vi.fn().mockReturnValue({
        setLevel,
        getLevel: getLevel.mockReturnValue(initZoomLevel),
        addControl: vi.fn()
      }),
      LatLng,
      Size: vi.fn(),
      ZoomControl: vi.fn().mockImplementation(() => {
        return {};
      }),
      InfoWindow: vi.fn(),
      MarkerImage: vi.fn(),
      Marker: vi.fn(),
      event: {
        addListener: vi.fn()
      }
    }
  };

  (globalThis as any).kakao = kakao as any;

  const originalImage = global.Image;
  global.Image = class extends originalImage {
    constructor(width?: number, height?: number) {
      super(width, height);
      setTimeout(() => this.onload(), 100); // onload 시뮬레이션
    }
    onload = vi.fn();
  };

  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
