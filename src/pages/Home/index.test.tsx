import { render, screen } from '@testing-library/react';

test('기본 test', () => {
  render(<div>hi</div>);
  const hi = screen.getByText('hi');
  expect(hi).toBeInTheDocument();
});
