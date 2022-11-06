import Header from 'components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';

function App() {
  return (
    <>
      <Header />
      <h1 className={'section_title_hidden'}>아는동네</h1>
      {/* <Header handleResponseSuccess={handleResponseSuccess} /> */}
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      {/* <Route exact path="/home" component={Home} />
        <Route path="/mypage" component={MyPage} />
        <Route exact path="/detailpage/:id" component={DetailPage} />
        <Route path="/user/kakao/callback" component={KakaoRedirectHandler} /> */}
    </>
  );
}

export default App;
