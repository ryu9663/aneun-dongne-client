# AGENT.md

## 프로젝트 개요

- 프로젝트명: `aneun-dongne-client`
- 목적: 사용자 현재 위치 또는 사용자가 지도에서 옮긴 중심점을 기준으로 주변 관광지를 조회하고, `Kakao Map`과 카드 리스트로 보여주는 프론트엔드 앱
- 배포/빌드 기반: `Vite + React 18 + TypeScript`
- 주요 외부 의존성:
  - 상태관리: `zustand`
  - 서버 상태/캐시: `@tanstack/react-query`
  - HTTP: `axios`
  - 지도: `Kakao Maps SDK`
  - UI 일부: `junyeol-components`
  - 스타일: `SCSS modules`

## 현재 구조 요약

- 진입점: `src/index.tsx`
  - `QueryClientProvider` 설정
  - 전역 쿼리 옵션: `refetchOnWindowFocus: false`, `refetchOnMount: false`, `retry: false`, `staleTime/gcTime: 24h`
- 앱 루트: `src/App.tsx`
  - 디바이스 감지 후 PC 권장 알림 표시
  - 실제 주요 화면은 `Home`
- 핵심 페이지: `src/pages/Home`
  - `useCurrentPosition`으로 위치 획득
  - 위치 확보 후 `HomeWithPosition` 렌더
  - `usePlacesQuery`로 관광지 목록 조회
  - `KakaoMap`과 `PlaceList`를 동시에 렌더

## 데이터/상태 흐름

1. `useCurrentPosition`
   - `sessionStorage`에 좌표가 있으면 재사용
   - 없으면 `navigator.geolocation.watchPosition`으로 위치 추적 시작
2. `useQueryParamsStore`
   - `pickPoint`, `radius_KM`, `numOfPlaces` 관리
   - 사용자가 지도를 드래그하거나 검색 옵션을 바꾸면 여기 값이 바뀜
3. `usePlacesQuery`
   - 현재 위치 또는 `pickPoint`를 기준으로 관광공사 위치 기반 API 호출
   - query key는 좌표, 반경, 개수 기반
4. `useMap`
   - Kakao map 인스턴스 생성
   - 장소 데이터가 바뀌면 마커를 모두 제거 후 다시 생성
   - 지도 드래그 종료 시 새 중심점을 store에 반영
5. `PlaceList`
   - 조회된 장소를 카드 형태로 렌더
   - 카드 hover 시 지도 위 info window 표시

## 코드 기준으로 본 핵심 성능 체크포인트

### 1. 지도 이벤트 리스너 중복 등록 가능성

- 파일:
  - `src/utils/hooks/useMap.tsx`
  - `src/utils/handleMapMarkers.ts`
- 현재 구조:
  - `useMap`에서 `places` 변경 시 `updateMarkers()` 실행
  - `makeMarkers()` 내부에서 각 마커마다 `mouseover`, `mouseout`, `click` 리스너를 등록
  - 추가로 각 마커 생성 루프 안에서 매번 `map`에 `bounds_changed` 리스너도 등록
  - `onDragMap()`도 `pickPoint` 변경 effect에서 계속 호출되어 `dragend` 리스너가 누적될 가능성이 큼
- 최적화 포인트:
  - 지도 생성 시점에만 등록해야 하는 리스너와, 마커별 리스너를 분리
  - `dragend`, `bounds_changed`는 1회 등록 구조로 변경
  - cleanup 없는 effect는 리스너 누적과 메모리 증가를 유발할 수 있으므로 우선 점검 대상

### 2. 마커 전체 재생성 비용

- 파일:
  - `src/utils/hooks/useMap.tsx`
  - `src/utils/handleMapMarkers.ts`
- 현재 구조:
  - `places`가 바뀔 때마다 기존 마커 전체 제거 후 새로 생성
  - 관광지 개수를 10~50개까지 늘릴 수 있어 드래그/반경 변경 시 비용이 커짐
- 최적화 포인트:
  - diff 방식으로 변경된 마커만 갱신할지 검토
  - 최소한 `InfoWindow`, `MarkerImage`, 이벤트 리스너 생성 비용을 줄일 수 있는 캐시 구조 고려
  - hover용 임시 marker/info window를 카드마다 새로 만들지 않고 재사용 가능 여부 검토

### 3. 지도 드래그 시 과도한 재조회 가능성

- 파일:
  - `src/utils/handleMapMarkers.ts`
  - `src/pages/Home/hooks/usePlacesQuery.ts`
- 현재 구조:
  - `dragend` 발생 시 곧바로 `pickPoint` 변경
  - `pickPoint`가 query key에 반영되어 즉시 API 재호출
- 최적화 포인트:
  - 드래그 완료 후 debounce/throttle 적용
  - 줌/중심점 변화 허용 오차를 둬서 미세한 이동에는 재조회 생략
  - 검색 버튼을 눌렀을 때만 재조회하는 UX도 후보

### 4. `watchPosition` 사용 방식

- 파일: `src/utils/hooks/useCurrentPosition.tsx`
- 현재 구조:
  - 최초 진입 이후에도 위치 감시가 계속 유지될 수 있음
  - `clearWatch` cleanup이 없음
- 영향:
  - 불필요한 위치 업데이트로 리렌더/쿼리 갱신 여지
  - 배터리/브라우저 리소스 낭비 가능
- 최적화 포인트:
  - 초기 1회만 필요하면 `getCurrentPosition`으로 변경
  - 추적이 필요하더라도 `watchPosition` id를 저장하고 cleanup 추가

### 5. 카드 이미지 로딩 구조

- 파일:
  - `src/pages/Home/components/PlaceList/Place/index.tsx`
  - `src/utils/hooks/useImageLoaded.ts`
- 현재 구조:
  - 카드마다 `new Image()`로 preload 후, 실제 `<img>`를 다시 렌더
  - 리스트 개수가 많아질수록 이미지 요청/디코딩 비용이 커질 수 있음
- 최적화 포인트:
  - 브라우저 기본 lazy loading(`loading="lazy"`) 우선 적용 검토
  - skeleton이 필요해도 preload용 `Image` 객체를 카드마다 따로 만들지 않는 방식 검토
  - 이미지가 큰 경우 썸네일/압축 여부 확인

### 6. 리스트 렌더링 최적화 여지

- 파일:
  - `src/pages/Home/components/PlaceList/index.tsx`
  - `src/pages/Home/components/PlaceList/Place/index.tsx`
- 현재 구조:
  - hover 시마다 `places.find(...)`로 매칭
  - 카드 컴포넌트 memoization 없음
  - `onMouseEnter`, `onMouseLeave` 핸들러가 매 렌더마다 새로 생성
- 최적화 포인트:
  - `title` 기반 탐색 대신 `Map` 형태의 인덱스 캐시 고려
  - `React.memo` 적용 후보
  - 리스트가 더 커질 가능성이 있으면 가상화 여부 검토

### 7. 렌더 외부 DOM 조작

- 파일: `src/utils/hooks/useMap.tsx`
- 현재 구조:
  - `removeImageTitle()`가 컴포넌트 본문에서 매 렌더마다 실행됨
  - `document.querySelectorAll('img[role="presentation"]')` 전체 탐색 수행
- 최적화 포인트:
  - effect 내부에서 필요한 시점에만 실행
  - 가능하면 DOM 후처리 대신 마커 렌더링 자체에서 문제 해결

### 8. 앱 초기 로드 비용

- 관찰 사항:
  - `dist/assets/index-CT9mtxzA.js` 약 `423KB`
  - `dist/assets/index-DnE5upQ9.css` 약 `214KB`
  - `public` 디렉터리 전체 크기 약 `15MB`
- 영향:
  - JS/CSS 번들 자체도 가볍지 않지만, 정적 이미지가 많아 초기 네트워크 비용 관리가 중요
- 최적화 포인트:
  - 큰 이미지/GIF 정리 및 WebP/AVIF 검토
  - 실제 사용하지 않는 public 자산 제거
  - `ReactQueryDevtools`는 개발 환경에서만 로드되도록 분기하는 것이 좋음

### 9. 불필요한 동기 flush 사용

- 파일: `src/pages/Home/components/PlaceList/index.tsx`
- 현재 구조:
  - hover 시 `flushSync(() => setPrevInfo(...))` 사용
- 영향:
  - hover 이벤트에서 동기 렌더를 강제하므로 UI 응답성을 떨어뜨릴 수 있음
- 최적화 포인트:
  - 실제로 sync 보장이 필요한지 재검토
  - ref 기반 관리로 대체 가능성 확인

## 우선순위 제안

1. `useMap`의 effect/이벤트 등록 구조 정리
2. 드래그 이후 재조회 정책 debounce 적용
3. `watchPosition` cleanup 또는 `getCurrentPosition` 전환
4. 카드 이미지 로딩 방식 단순화
5. 번들/정적 자산 축소

## 탐색 시 유의사항

- 현재 워크트리에 사용자 변경사항이 있음:
  - `public/images/landing_3.gif`
  - `public/images/look.gif`
  - `public/images/mapimgpeople.png`
  - `public/images/men.png`
- 성능 작업 시 해당 변경은 되돌리지 말 것
- Kakao map 관련 로직은 외부 SDK와 DOM 이벤트에 의존하므로, 최적화 후 수동 검증이 꼭 필요함

## 다음 단계 제안

- 실제 최적화 작업에 들어갈 때는 아래 순서로 진행하는 것이 안전함
  1. `useMap` 리스너 등록/cleanup 구조 먼저 수정
  2. 드래그 후 조회 debounce 추가
  3. 이미지 로딩 방식 변경
  4. 마지막에 번들/정적 자산 정리
