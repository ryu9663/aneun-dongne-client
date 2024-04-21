import axios from 'axios';
import { PlaceParams } from '../pages/Home/types';

export const getPlaces = async (params: PlaceParams): Promise<any> => {
  const { numOfRows, mapX, mapY, radius } = params;
  console.log(params);
  const data: Promise<any> = await axios
    .get(
      `${import.meta.env.VITE_APP_TOUR_API_URL}/locationBasedList1?ServiceKey=${
        import.meta.env.VITE_APP_TOUR_API_KEY
      }&_type=json`,
      {
        params: {
          MobileOS: 'ETC',
          MobileApp: 'TourAPI3.0_Guide',
          numOfRows,
          // areaCode:33,
          // sigunguCode:7,
          //! contentTypeId : 12:관광지,14:문화시설,15:행사,25:여행코스,28:레포츠,32:숙박,38:쇼핑,39:식당,
          contentTypeId: 12,
          // * 대분류 : 인문
          // cat1:'A02',
          //* 중분류 : 역사지구
          // cat2:'A0201',
          //*좌표,반경
          // mapX: pickPoint[1],
          // mapY: pickPoint[0],
          mapX,
          mapY,
          //! 반경 몇m??
          radius,
          //*
          arrange: 'A', // 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
          listYN: 'Y' // 목록구분(Y=목록, N=개수)
        },
        headers: { 'content-type': 'application/json' }
      }
    )

    .then(res => res.data)

    .catch(err => console.log(err));
  console.log(data);
  return data;
};
