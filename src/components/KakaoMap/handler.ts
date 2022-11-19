import { infoWindowGenerator } from 'utils/InfoWindowGenerator';
import { OtherMarkersType } from './KakaoMap';

const kakao = window.kakao;

export const openInfoWindow = (map: any, marker: any) => {
  const infoWindow = new kakao.maps.InfoWindow({
    content: infoWindowGenerator('내위치')
  });
  infoWindow.open(map, marker);
};

export const addZoomControler = (map: any) => {
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
};

export const setOtherMarkers = (map: any, otherMarkers: OtherMarkersType[]) => {
  const OtherMarkerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  try {
    otherMarkers
      .map(({ title, lat, lon }) => ({
        title,
        latlng: new kakao.maps.LatLng(lat, lon)
      }))

      .forEach(otherMarker => {
        new kakao.maps.Marker({
          map,
          position: otherMarker.latlng,
          title: otherMarker.title,
          image: new kakao.maps.MarkerImage(OtherMarkerImageSrc, new kakao.maps.Size(24, 35))
        });
      });
  } catch (err) {
    console.log(err);
  }
};
