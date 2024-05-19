import { response1 } from '@/__mocks__/constant';
import { Home } from '@/pages/Home';
import { HomeWithPosition } from '@/pages/Home/components/HomeWithPosition';
import KakaoMap from '@/pages/Home/components/KakaoMap';
import PlaceList from '@/pages/Home/components/PlaceList';
import { PlaceType } from '@/pages/Home/types';
import { renderAppWithRouterMatch } from '@/utils/test/renderWidthQuery';
import { fireEvent, render, screen } from '@testing-library/react';

describe('위치를 모를ㅎ때', () => {
  test("위치추적 안되었을때 '현재 위치를 받아오고 있다는 문구' 노출", () => {
    render(renderAppWithRouterMatch(<Home />));
    const loadingTextForGettingPosition = screen.getByText('현재 위치를 받아오고 있습니다.');
    expect(loadingTextForGettingPosition).toBeInTheDocument();
  });
});

describe('위치를 알 때 지도', () => {
  test('위치를 지도페이지에 넣으면 처음에 로딩이 뜬다.', async () => {
    render(
      renderAppWithRouterMatch(
        <HomeWithPosition
          position={{
            lat: 37.4737835,
            lon: 126.9637296
          }}
        />
      )
    );
    const loading = screen.getByText('주변 관광지들을 탐색중입니다.');
    expect(loading).toBeInTheDocument();
  });

  test('api로 받은 장소들이 지도 하단에 카드목록으로 노출된다.', async () => {
    render(<PlaceList places={response1.response.body.items.item as unknown as PlaceType[]} />);
    const placeNames = response1.response.body.items.item.map(place => place.title);

    await Promise.all(placeNames.map(placeName => screen.findByText(placeName)));

    placeNames.forEach(placeName => {
      const placeCard = screen.getByText(placeName);
      expect(placeCard).toBeInTheDocument();
    });
  });

  test('지도가 렌더링되면 kakao-map을 확인할 수 있다.', () => {
    render(
      <KakaoMap
        position={{
          lat: 37.4737835,
          lon: 126.9637296
        }}
        places={response1.response.body.items.item as unknown as PlaceType[]}
        isLoading={false}
      />
    );
    const kakaoMap = screen.getByTestId('kakao-map');
    expect(kakaoMap).toBeInTheDocument();
  });
  test('지도위에 관광지 개수만큼 마커들이 렌더링된다.', async () => {
    render(
      <KakaoMap
        position={{
          lat: 37.4737835,
          lon: 126.9637296
        }}
        places={response1.response.body.items.item as unknown as PlaceType[]}
        isLoading={false}
      />
    );
    const kakaoMap = screen.getByTestId('kakao-map');
    expect(kakaoMap).toBeInTheDocument();

    const marker = await screen.findAllByRole('presentation');
    expect(marker).toHaveLength(response1.response.body.items.item.length);
  });
  test('마커를 호버하면 장소의 정보가 보인다.', async () => {
    render(
      <KakaoMap
        position={{
          lat: 37.4737835,
          lon: 126.9637296
        }}
        places={response1.response.body.items.item as unknown as PlaceType[]}
        isLoading={false}
      />
    );
    const kakaoMap = screen.getByTestId('kakao-map');
    expect(kakaoMap).toBeInTheDocument();
    const marker = await screen.findAllByRole('presentation');
    expect(marker).toHaveLength(response1.response.body.items.item.length);
    fireEvent.mouseOver(marker[0]);

    const infoWindow = screen.getByText(new RegExp(response1.response.body.items.item[0].title, 'i'));
    expect(infoWindow).toBeInTheDocument();
  });

  test('마커를 언호버하면 장소의 정보가 사라진다.', async () => {
    render(
      <KakaoMap
        position={{
          lat: 37.4737835,
          lon: 126.9637296
        }}
        places={response1.response.body.items.item as unknown as PlaceType[]}
        isLoading={false}
      />
    );
    const kakaoMap = screen.getByTestId('kakao-map');
    expect(kakaoMap).toBeInTheDocument();
    const marker = await screen.findAllByRole('presentation');
    expect(marker).toHaveLength(response1.response.body.items.item.length);
    fireEvent.mouseOver(marker[0]);

    const infoWindow = screen.getByText(new RegExp(response1.response.body.items.item[0].title, 'i'));
    expect(infoWindow).toBeInTheDocument();

    fireEvent.mouseOut(marker[0]);
    expect(infoWindow).not.toBeInTheDocument();
  });
});
