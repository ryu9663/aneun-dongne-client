import { infoWindowGenerator, photoWindowGenerator } from 'utils/InfoWindowGenerator';

import { PlaceType } from 'pages/mappage/types';
import { PositionType } from '../../utils/hooks/useCurrentPosition';

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
  kakao.maps.event.addListener(map, 'zoom_changed', () => {});
};

export const setOtherMarkers = (map: any, places: PlaceType[]) => {
  const OtherMarkerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  try {
    places
      .map(({ title, mapy, mapx, firstimage }) => ({
        hoverBox: photoWindowGenerator(title, firstimage),
        latlng: new kakao.maps.LatLng(parseFloat(mapy), parseFloat(mapx)),
        title
      }))

      .forEach(place => {
        const infowindow = new kakao.maps.InfoWindow({
          content: place.hoverBox
        });

        const marker = new kakao.maps.Marker({
          map,
          position: place.latlng,
          title: place.hoverBox,
          image: new kakao.maps.MarkerImage(OtherMarkerImageSrc, new kakao.maps.Size(24, 35))
        });
        console.log('kkk');
        kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
        kakao.maps.event.addListener(marker, 'click', () =>
          window.open(`https://www.google.com/search?q=${place.title}`)
        );
      });
  } catch (err) {
    console.log(err);
  }
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
