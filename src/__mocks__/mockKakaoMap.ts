/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';

type Listener = (...args: any[]) => void;
type ListenerMap = Record<string, Listener[]>;

const createListeners = (): ListenerMap => ({});

const emit = (target: { __listeners?: ListenerMap }, eventName: string, ...args: any[]) => {
  target.__listeners?.[eventName]?.forEach(listener => listener(...args));
};

const createInfoWindow = (content?: string) => {
  let element: HTMLDivElement | null = null;

  return {
    content,
    open: vi.fn().mockImplementation((_map: any, marker?: { __element?: HTMLElement | null }) => {
      element?.remove();

      element = document.createElement('div');
      element.classList.add('_info_1p1je_1');
      element.innerHTML = content || '';

      marker?.__element?.appendChild(element);
    }),
    close: vi.fn().mockImplementation(() => {
      element?.remove();
      element = null;
    })
  };
};

const createMap = (container: HTMLElement) => ({
  __container: container,
  __listeners: createListeners(),
  setLevel: vi.fn(),
  getLevel: vi.fn().mockReturnValue(3),
  addControl: vi.fn(),
  getCenter: vi.fn().mockReturnValue({ Ma: 37.4737835, La: 126.9637296 })
});

const createMarker = (options: { map?: any; title: string }) => {
  const wrapper = document.createElement('div');
  const image = document.createElement('img');
  image.setAttribute('src', 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png');
  image.setAttribute('role', 'presentation');
  wrapper.appendChild(image);

  const marker = {
    title: options.title,
    __listeners: createListeners(),
    __element: wrapper,
    setMap: vi.fn().mockImplementation((map: any | null) => {
      if (map?.__container) {
        map.__container.appendChild(wrapper);
      } else {
        wrapper.remove();
      }
    })
  };

  wrapper.addEventListener('mouseover', () => emit(marker, 'mouseover'));
  wrapper.addEventListener('mouseout', () => emit(marker, 'mouseout'));
  wrapper.addEventListener('click', () => emit(marker, 'click'));

  if (options.map) {
    marker.setMap(options.map);
  }

  return marker;
};

export const mockKakaoMap = () => {
  const kakao = {
    maps: {
      Map: vi.fn().mockImplementation((container: HTMLElement) => createMap(container)),
      LatLng: vi.fn(),
      Size: vi.fn(),
      ZoomControl: vi.fn().mockImplementation(() => ({})),
      InfoWindow: vi.fn().mockImplementation(({ content }: { content?: string }) => createInfoWindow(content)),
      MarkerImage: vi.fn(),
      Marker: vi.fn().mockImplementation((marker: { map?: any; title: string }) => createMarker(marker)),
      event: {
        addListener: vi
          .fn()
          .mockImplementation((target: { __listeners?: ListenerMap }, eventName: string, callback: Listener) => {
            if (!target.__listeners) {
              target.__listeners = createListeners();
            }

            if (!target.__listeners[eventName]) {
              target.__listeners[eventName] = [];
            }

            target.__listeners[eventName].push(callback);

            return {
              remove: () => {
                target.__listeners![eventName] = target.__listeners![eventName].filter(
                  listener => listener !== callback
                );
              }
            };
          })
      }
    }
  };

  (globalThis as any).kakao = kakao as any;
};
