import { vi } from 'vitest';

export const mockKakaoMap = () => {
  const kakao = {
    maps: {
      Map: vi.fn().mockReturnValue({
        setLevel: vi.fn(),
        getLevel: vi.fn().mockReturnValue(3),
        addControl: vi.fn()
      }),
      LatLng: vi.fn(),
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
        addListener: vi.fn().mockImplementation((target: 'marker' | 'map', eventName: string, callback: any) => {
          if (eventName === 'mouseover' || target === 'marker') {
            document.createElement('div').addEventListener('mouseover', callback);
          }
        })
      }
    }
  };
  (globalThis as any).kakao = kakao as any;
};
