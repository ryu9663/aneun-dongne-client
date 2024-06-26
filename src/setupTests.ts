// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { server } from '@/__mocks__/server';
import '@testing-library/jest-dom';
import { mockNavigatorGeolocation } from './__mocks__/mockNavigatorGeolocation';
import { mockKakaoMap } from '@/__mocks__/mockKakaoMap';
import { mockImageOnLoad } from '@/__mocks__/mockImageOnLoad';

beforeAll(() => {
  mockNavigatorGeolocation();
  mockKakaoMap();
  mockImageOnLoad();

  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
