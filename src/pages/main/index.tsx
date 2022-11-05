import React from 'react';
import FirstSection from '../components/FirstSection/FirstSection';
import SecondSection from '../components/SecondSection/SecondSection';

const Main = () => {
  return (
    <main>
      <h2 className={'section_title_hidden'}>아는동네</h2>
      <FirstSection />
      <SecondSection />
    </main>
  );
};

export default Main;
