import Alert from '@/components/Alert';
import { Home } from '@/pages/Home';
import { useState } from 'react';
import '@/styles/_global.scss';
import { detectDevice } from '@/utils/detectDevice';

function App() {
  const device = detectDevice();
  const [showDeviceAlert, setShowDeviceAlert] = useState(true);

  return (
    <>
      {device !== 'PC' && (
        <Alert alertOn={showDeviceAlert} setAlertOn={setShowDeviceAlert} content="PC로 사용하시는 것을 추천드립니다." />
      )}
      <h1>떠나요</h1>
      <main>
        <Home />
      </main>
    </>
  );
}

export default App;
