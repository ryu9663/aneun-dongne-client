import { Home } from '@/pages/Home';
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
