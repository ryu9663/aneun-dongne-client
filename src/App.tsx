import Alert from 'components/Alert';
import Header from 'components/Header';
import { Home } from 'pages/Home';
import { useState } from 'react';
import 'styles/_global.scss';
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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
