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
      Marker: vi.fn().mockImplementation((marker: { title: string }) => {
        const _map = document.querySelector('#_map_4d7d48');

        const markerImgWrapper = document.createElement('div');
        const markerImg = document.createElement('img');
        markerImg.setAttribute('src', 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png');
        markerImg.setAttribute('role', 'presentation');
        markerImgWrapper.appendChild(markerImg);

        markerImgWrapper.addEventListener('mouseover', () => {
          const infoWindow = document.createElement('div');
          infoWindow.classList.add('_info_1p1je_1');
          infoWindow.textContent = marker.title;
          // ! markerIngWrapper 하위는 아니지만 테스트 목적은 infowWindow확인이라 편의상 markerImgWrapper 하위에 넣음
          markerImgWrapper.appendChild(infoWindow);
        });
        _map?.appendChild(markerImgWrapper);

        markerImgWrapper.addEventListener('mouseout', () => {
          const infoWindow = document.querySelector('._info_1p1je_1');
          if (infoWindow) {
            infoWindow.remove();
          } else {
            throw new Error('마커에 마우스를 올렸는데 infoWindow가 안생긴 것 같음');
          }
        });
        _map?.appendChild(markerImgWrapper);
      }),

      event: {
        // addListener: vi.fn()
        addListener: vi.fn().mockImplementation((target: 'marker' | 'map', eventName: string, callback: any) => {
          if (eventName === 'mouseover' || target === 'marker') {
            document.createElement('div').addEventListener('mouseover', callback);
          }
        })
      }
    }
  };

  (globalThis as any).kakao = kakao as any;

  const originalImage = global.Image;
  global.Image = class extends originalImage {
    constructor(width?: number, height?: number) {
      super(width, height);
      setTimeout(() => this.onload(), 10); // onload 시뮬레이션
    }
    onload = vi.fn();
  };

  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
