import Alert from 'components/Alert/Alert';
import Header from 'components/Header/Header';
import DetailPage from 'pages/detailpage';
import MapPage from 'pages/mappage';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { detectDevice } from 'utils/detectDevice';

function App() {
  const device = detectDevice();
  const [showDeviceAlert, setShowDeviceAlert] = useState(true);
  return (
    <>
      {device !== 'PC' && (
        <Alert
          alertOn={showDeviceAlert}
          setAlertOn={setShowDeviceAlert}
          content="아직은 모바일, 태블릿 최적화가 이루어지지 않았습니다."
        />
      )}
      <Header />
      <main>
        <h1 className="section_title_hidden">아는동네</h1>
        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          {/* <Route path="/map" element={<MapPage />} /> */}
          <Route path="/" element={<MapPage />} />
          <Route path="/detailpage/:contentId" element={<DetailPage />} />
        </Routes>
      </main>
      {/* <Route exact path="/home" component={Home} />
        <Route path="/mypage" component={MyPage} />
        <Route exact path="/detailpage/:id" component={DetailPage} />
        <Route path="/user/kakao/callback" component={KakaoRedirectHandler} /> */}
    </>
  );
}

export default App;
