import { useEffect } from 'react';
import styles from './main.module.scss';
import FirstSection from './components/FirstSection/FirstSection';
import SecondSection from './components/SecondSection/SecondSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ThirdSection from 'pages/main/components/ThirdSection/ThirdSection';
import FourthSection from './components/FourthSection/FourthSection';

const Main = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <div className={styles.main}>
      <h2 className="section_title_hidden">아는동네</h2>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </div>
  );
};

export default Main;
