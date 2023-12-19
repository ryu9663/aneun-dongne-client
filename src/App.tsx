import Alert from 'components/Alert';
import { Home } from 'pages/Home';
import { useState } from 'react';
import 'styles/_global.scss';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Alert alertOn={isOpen} setAlertOn={setIsOpen} content="정부 Open API 에러로 현재 이용이 불가합니다." />

      <h1>떠나요</h1>
      <main>
        <Home />
      </main>
    </>
  );
}

export default App;
