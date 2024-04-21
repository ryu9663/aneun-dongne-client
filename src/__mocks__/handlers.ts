import { response1, response2 } from '@/__mocks__/constant';
import { http, HttpResponse } from 'msw';

const API_URL = `${import.meta.env.VITE_APP_TOUR_API_URL}/locationBasedList1`;

export const handlers = [
  http.get(API_URL, ({ request }) => {
    const url = new URL(request.url);
    const _type = url.searchParams.get('_type');
    const mapX = url.searchParams.get('mapX');
    const mapY = url.searchParams.get('mapY');
    const radius = url.searchParams.get('radius');
    const numOfRows = url.searchParams.get('numOfRows');

    if (
      _type === 'json' &&
      mapX === '126.9637296' &&
      mapY === '37.4737835' &&
      radius === '10000' &&
      numOfRows === '20'
    ) {
      return HttpResponse.json(response1, { status: 200 });
    } else {
      return HttpResponse.json(response2, { status: 200 });
    }
  })
];
