import { response1 } from '@/__mocks__/constant';
import { Home } from '@/pages/Home';
import { HomeWithPosition } from '@/pages/Home/components/HomeWithPosition';
import { renderAppWithRouterMatch } from '@/utils/test/renderWidthQuery';
import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';

describe('홈 화면', () => {
  it('위치추적 안되었을때', () => {
    render(renderAppWithRouterMatch(<Home />));
    const loadingTextForGettingPosition = screen.getByText('현재 위치를 받아오고 있습니다.');
    // const placeListSkeletonUis = screen.getAllByTestId('placelist-skeleton-ui');
    expect(loadingTextForGettingPosition).toBeInTheDocument();
    // expect(placeListSkeletonUis).not.toBeNull();
  });
});

describe('위치를 알 때 지도', () => {
  it('위치를 지도페이지에 넣으면 마커들이 렌더링된다.', async () => {
    render(
      renderAppWithRouterMatch(
        <Suspense fallback={<div>loading</div>}>
          <HomeWithPosition
            position={{
              lat: 37.4737835,
              lon: 126.9637296
            }}
          />
        </Suspense>
      )
    );
    await new Promise(r => setTimeout(r, 1000));
    const map = screen.getByTestId('kakao-map');
    expect(map).toBeInTheDocument();
  });

  it('지도가 렌더링되면 마커들이 보인다.', () => {
    // TODO 모킹함수로 마커를 가상돔에 렌더링시켜야함..
  });
  it('마커를 호버하면 장소의 정보가 보인다.', async () => {});

  it('마커를 언호버하면 장소의 정보가 사라진다.', () => {});

  describe('위치를 알 때 장소리스트', () => {
    it('api로 받은 장소들이 지도 하단에 카드형태로 노출된다.', async () => {
      render(
        renderAppWithRouterMatch(
          <Suspense fallback={<div>loading</div>}>
            <HomeWithPosition
              position={{
                lat: 37.4737835,
                lon: 126.9637296
              }}
            />
          </Suspense>
        )
      );
      await new Promise(r => setTimeout(r, 1000));

      const placeNames = response1.response.body.items.item.map(place => place.title);
      placeNames.forEach(placeName => {
        const placeCard = screen.getByText(placeName);
        expect(placeCard).toBeInTheDocument();
      });
    });
  });

  //   it('장소 카드중 하나에 호버하면 장소의 정보가 지도에 노출된다.', () => {
  //     render(renderAppWithRouterMatch(<Home />));
  //     const placeCards = screen.getAllByTestId('place-card');
  //     expect(placeCards).toBeInTheDocument();
  //     placeCards[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  //     const placeInfo = screen.getByTestId('place-info');
  //     expect(placeInfo).toBeInTheDocument();
  //   });

  //   it('장소 카드중 하나에 언호버하면 장소의 정보가 지도에서 사라진다.', () => {
  //     render(renderAppWithRouterMatch(<Home />));
  //     const placeCards = screen.getAllByTestId('place-card');
  //     expect(placeCards).toBeInTheDocument();
  //     placeCards[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  //     const placeInfo = screen.getByTestId('place-info');
  //     expect(placeInfo).toBeInTheDocument();
  //     placeCards[0].dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
  //     expect(placeInfo).not.toBeInTheDocument();
  //   });
});
