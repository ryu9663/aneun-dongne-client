import { infoWindowGenerator, mapInfoWindowGenerator } from '@/utils/infoGenerator';
import { MarkerType, PlaceType } from '@/pages/Home/types';
import { PositionType } from './hooks/useCurrentPosition';
import { OTHER_MARKER_IMAGE } from '@/utils/constant';
import { detectDevice } from '@/utils/detectDevice';

const device = detectDevice();

export const openInfoWindow = (map: any, marker: any) => {
  const infowindow = new window.kakao.maps.InfoWindow({
    content: infoWindowGenerator('내위치')
  });
  infowindow.open(map, marker);
};

export const addZoomControler = (map: any) => {
  const zoomControl = new window.kakao.maps.ZoomControl();
  map.addControl(zoomControl);
};

export const makeMarkers = (map: any, places: PlaceType[]): MarkerType[] => {
  let openedInfoWindow: any = null;

  const markers = places
    .map(({ title, mapy, mapx, firstimage, contentid }) => ({
      hoverBox: mapInfoWindowGenerator(title, firstimage || '/images/no-image.png'),
      latlng: new window.kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
      title,
      contentid
    }))

    .map(place => {
      const infowindow = new window.kakao.maps.InfoWindow({
        content: place.hoverBox
      });

      const marker: MarkerType = new window.kakao.maps.Marker({
        map,
        position: place.latlng,
        title: place.hoverBox,
        image: new window.kakao.maps.MarkerImage(OTHER_MARKER_IMAGE, new window.kakao.maps.Size(24, 35))
      });

      new window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
      new window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
      new window.kakao.maps.event.addListener(map, 'bounds_changed', () => device === 'PC' && infowindow.close());
      new window.kakao.maps.event.addListener(marker, 'click', () => {
        if (device === 'PC') {
          window.open(
            `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${place.title}`
          );
        } else {
          // 이전에 열려있던 infowindow가 있다면 닫기
          if (openedInfoWindow) {
            openedInfoWindow.close();
          }

          // 현재 infowindow 열기
          infowindow.open(map, marker);

          // 열려 있는 infowindow 업데이트
          openedInfoWindow = infowindow;
        }
      });
      return marker;
    });
  return markers;
};
export const showSelectedPlaceInfoOnMap = (selectedPlace: PlaceType[], map: any) => {
  //타입지정
  const markers = selectedPlace
    .map(({ title, mapy, mapx, firstimage }) => ({
      hoverBox: mapInfoWindowGenerator(title, firstimage || '/images/no-image.png'),
      latlng: new window.kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
      title
    }))

    .map(place => {
      const infowindow = new window.kakao.maps.InfoWindow({
        content: place.hoverBox
      });

      const marker = new window.kakao.maps.Marker({
        map,
        position: place.latlng,
        title: place.hoverBox,
        image: new window.kakao.maps.MarkerImage(OTHER_MARKER_IMAGE, new window.kakao.maps.Size(24, 35))
      });
      marker.setMap(null);
      infowindow.open(map, marker);
      return infowindow;
    });

  return markers[0];
};

export const removeMarkers = (markers: any[]) => {
  //markerType필요함

  markers.forEach(marker => marker.setMap(null)); //setMap이 들어가있는지 타입검사 필요
};
export const getMarkersInfowindow = (places: PlaceType[]) => {
  const infowindow = places
    .map(({ title, mapy, mapx, firstimage }) => ({
      hoverBox: mapInfoWindowGenerator(title, firstimage || '/images/no-image.png'),
      latlng: new window.kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
      title
    }))

    .map(place => {
      const infowindow = new window.kakao.maps.InfoWindow({
        content: place.hoverBox
      });

      return infowindow;
    });

  return infowindow[0];
};
export const removeInfo = (infowindow: { close: () => void }) => {
  infowindow.close();
};

export const onDragMap = (map: any, setPickPoint: (position?: PositionType) => void) => {
  new window.kakao.maps.event.addListener(map, 'dragend', () => {
    const latlng = map.getCenter();

    setPickPoint({ lat: latlng.Ma, lon: latlng.La });
  });
};

/** 스타일관련임. 뭔지 보고싶으면 이거 주석하고 마커에 5초간 호버해보셈 */
export const removeImageTitle = () => {
  const allImgsWithPresentationRole = document.querySelectorAll('img[role="presentation"]');
  allImgsWithPresentationRole.forEach(img => {
    img.removeAttribute('title');
  });
};
