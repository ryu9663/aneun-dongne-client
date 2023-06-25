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
        <Alert alertOn={showDeviceAlert} setAlertOn={setShowDeviceAlert} content="PC로 사용하시는 것을 추천드립니다." />
      )}
      <Header />
      <main>
        <h1 className="section_title_hidden">아는동네</h1>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/detailpage/:contentId" element={<DetailPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
