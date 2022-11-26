import Header from 'components/Header/Header';
import MapPage from 'pages/mappage';

import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';

function App() {
  return (
    <>
      <Header />
      <main>
        <h1 className="section_title_hidden">아는동네</h1>
        {/* <Header handleResponseSuccess={handleResponseSuccess} /> */}

        <Routes>
          {/* <Route path="/" element={<Main />} /> */}
          {/* <Route path="/map" element={<MapPage />} /> */}
          <Route path="/" element={<MapPage />} />
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
