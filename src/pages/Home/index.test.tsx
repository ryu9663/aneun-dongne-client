import { response1 } from '@/__mocks__/constant';
import { Home } from '@/pages/Home';
import { HomeWithPosition } from '@/pages/Home/components/HomeWithPosition';
import KakaoMap from '@/pages/Home/components/KakaoMap';
import PlaceList from '@/pages/Home/components/PlaceList';
import { PlaceType } from '@/pages/Home/types';
import { renderAppWithRouterMatch } from '@/utils/test/renderWidthQuery';
import { render, screen } from '@testing-library/react';

describe('홈 화면', () => {
  it("위치추적 안되었을때 '현재 위치를 받아오고 있다는 문구' 노출", () => {
    render(renderAppWithRouterMatch(<Home />));
    const loadingTextForGettingPosition = screen.getByText('현재 위치를 받아오고 있습니다.');
    expect(loadingTextForGettingPosition).toBeInTheDocument();
  });
});

describe('위치를 알 때 지도', () => {
  it('위치를 지도페이지에 넣으면 처음에 로딩이 뜬다.', async () => {
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

  it('api로 받은 장소들이 지도 하단에 카드목록으로 노출된다.', async () => {
    render(<PlaceList places={response1.response.body.items.item as unknown as PlaceType[]} />);
    const placeNames = response1.response.body.items.item.map(place => place.title);

    await Promise.all(placeNames.map(placeName => screen.findByText(placeName)));

    placeNames.forEach(placeName => {
      const placeCard = screen.getByText(placeName);
      expect(placeCard).toBeInTheDocument();
    });
  });

  it('지도가 렌더링되면 kakao-map을 확인할 수 있다.', () => {
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
  // it('지도가 렌더링되면 마커들이 보인다.', () => {
  //   // TODO 모킹함수로 마커를 가상돔에 렌더링시켜야함..
  // });
  // it('마커를 호버하면 장소의 정보가 보인다.', async () => {});

  // it('마커를 언호버하면 장소의 정보가 사라진다.', () => {});
});
