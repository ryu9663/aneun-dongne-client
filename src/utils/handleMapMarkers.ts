import { infoWindowGenerator, mapInfoWindowGenerator } from 'utils/infoGenerator';
import { MarkerType, PlaceType } from 'pages/Home/types';
import { PositionType } from './hooks/useCurrentPosition';
import { OTHER_MARKER_IMAGE } from 'utils/constant';

const kakao = window.kakao;

export const openInfoWindow = (map: any, marker: any) => {
  const infowindow = new kakao.maps.InfoWindow({
    content: infoWindowGenerator('내위치')
  });
  infowindow.open(map, marker);
};

export const addZoomControler = (map: any) => {
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl);
};

export const makeOtherMarkers = (map: any, places: PlaceType[]): MarkerType[] => {
  const markers = places
    .map(({ title, mapy, mapx, firstimage, contentid }) => ({
      hoverBox: mapInfoWindowGenerator(title, firstimage || '/images/no-image.png'),
      latlng: new kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
      title,
      contentid
    }))

    .map(place => {
      const infowindow = new kakao.maps.InfoWindow({
        content: place.hoverBox
      });

      const marker: MarkerType = new kakao.maps.Marker({
        map,
        position: place.latlng,
        title: place.hoverBox,
        image: new kakao.maps.MarkerImage(OTHER_MARKER_IMAGE, new kakao.maps.Size(24, 35))
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
      kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
      kakao.maps.event.addListener(marker, 'click', () =>
        window.open(
          `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${place.title}`
        )
      );
      return marker;
    });
  return markers;
};
export const showSelectedPlacesInfo = (selectedPlace: PlaceType[], map: any) => {
  //타입지정
  const markers = selectedPlace
    .map(({ title, mapy, mapx, firstimage }) => ({
      hoverBox: mapInfoWindowGenerator(title, firstimage || '/images/no-image.png'),
      latlng: new kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
      title
    }))

    .map(place => {
      const infowindow = new kakao.maps.InfoWindow({
        content: place.hoverBox
      });

      const marker = new kakao.maps.Marker({
        map,
        position: place.latlng,
        title: place.hoverBox,
        image: new kakao.maps.MarkerImage(OTHER_MARKER_IMAGE, new kakao.maps.Size(24, 35))
      });
      marker.setMap(null);
      infowindow.open(map, marker);
      return infowindow;
    });

  return markers[0];
};

export const removeMarkers = (markers: any[], setPrevMarkers: any) => {
  //markerType필요함

  markers.forEach(marker => marker.setMap(null)); //setMap이 들어가있는지 타입검사 필요
  // setPrevMarkers([]);
};
export const getMarkersInfowindow = (places: PlaceType[], map: any) => {
  const infowindow = places
    .map(({ title, mapy, mapx, firstimage }) => ({
      hoverBox: mapInfoWindowGenerator(title, firstimage || '/images/no-image.png'),
      latlng: new kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
      title
    }))

    .map(place => {
      const infowindow = new kakao.maps.InfoWindow({
        content: place.hoverBox
      });

      return infowindow;
    });

  return infowindow[0];
};
export const removeInfo = (infowindow: { close: () => void }) => {
  infowindow.close();
};

// onClick은 쓰이진 않지만 우선 남겨둠
export const onKakaoMapClick = (map: any, setPickPoint: (position?: PositionType) => void) => {
  kakao.maps.event.addListener(map, 'click', (e: { latLng: any }) => {
    const latlng = { lat: e.latLng.Ma, lon: e.latLng.La };

    setPickPoint(latlng);
  });
};

export const onDragMap = (map: any, setPickPoint: (position?: PositionType) => void) => {
  kakao.maps.event.addListener(map, 'dragend', () => {
    const latlng = map.getCenter();

    setPickPoint({ lat: latlng.Ma, lon: latlng.La });
  });
};

export const removeImageTitle = () => {
  const allImgsWithPresentationRole = document.querySelectorAll('img[role="presentation"]');
  allImgsWithPresentationRole.forEach(img => {
    img.removeAttribute('title');
  });
};
