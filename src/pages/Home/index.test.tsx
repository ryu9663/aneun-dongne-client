import { Home } from '@/pages/Home/index2';
import { renderAppWithRouterMatch } from '@/utils/test/renderWidthQuery';
import { render, screen } from '@testing-library/react';

describe('홈 화면', () => {
  it('위치추적 안되었을때', () => {
    render(renderAppWithRouterMatch(<Home />));
    const loadingTextForGettingPosition = screen.getByText('현재 위치를 받아오고 있습니다.');
    const placeListSkeletonUis = screen.getAllByTestId('placelist-skeleton-ui');
    expect(loadingTextForGettingPosition).toBeInTheDocument();
    expect(placeListSkeletonUis).not.toBeNull();
  });
});

describe('위치를 알 때 지도', () => {
  it('위치를 지도페이지에 넣으면 마커들이 렌더링된다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const map = screen.getByTestId('kakao-map');
    expect(map).toBeInTheDocument();
    const presentations = screen.getAllByRole('presentation');
    expect(presentations).not.toBeNull();
  });

  it('마커를 호버하면 장소의 정보가 보인다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const markers = screen.getAllByTestId('marker');
    expect(markers).toBeInTheDocument();
    markers[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const placeInfo = screen.getByTestId('place-info');
    expect(placeInfo).toBeInTheDocument();
  });

  it('마커를 언호버하면 장소의 정보가 사라진다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const markers = screen.getAllByTestId('marker');
    expect(markers).toBeInTheDocument();
    markers[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const placeInfo = screen.getByTestId('place-info');
    expect(placeInfo).toBeInTheDocument();
    markers[0].dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    expect(placeInfo).not.toBeInTheDocument();
  });

  it('마커를 클릭하면 네이버 검색창으로 새창열림이 발생한다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const markers = screen.getAllByTestId('marker');
    expect(markers).toBeInTheDocument();
    markers[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(window.open).toBeCalled();
  });
});

describe('위치를 알 때 장소리스트', () => {
  it('장소 카드들이 지도 하단에 노출된다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const placeCards = screen.getAllByTestId('place-card');
    expect(placeCards).toBeInTheDocument();
  });

  it('장소 카드중 하나에 호버하면 장소의 정보가 지도에 노출된다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const placeCards = screen.getAllByTestId('place-card');
    expect(placeCards).toBeInTheDocument();
    placeCards[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const placeInfo = screen.getByTestId('place-info');
    expect(placeInfo).toBeInTheDocument();
  });

  it('장소 카드중 하나에 언호버하면 장소의 정보가 지도에서 사라진다.', () => {
    render(renderAppWithRouterMatch(<Home />));
    const placeCards = screen.getAllByTestId('place-card');
    expect(placeCards).toBeInTheDocument();
    placeCards[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const placeInfo = screen.getByTestId('place-info');
    expect(placeInfo).toBeInTheDocument();
    placeCards[0].dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    expect(placeInfo).not.toBeInTheDocument();
  });
});
