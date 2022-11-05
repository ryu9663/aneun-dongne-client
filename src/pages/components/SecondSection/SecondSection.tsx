import React, { useEffect } from 'react';
import styles from './secondSection.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SecondSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);
  return (
    <div className={styles.second_section} data-aos="fade-up">
      <h3 data-aos="fade-right" className={styles.second_section_title}>
        우리 동네에서 인기있는 관광지는?
      </h3>
      <div className={styles.second_section_image_wrapper}>
        <img className={styles.illust} alt="핸드폰으로 관광지 찾는 이미지" src="images/mapclick.png" />

        <img className={styles.popular_place} alt="아는동네 서비스 gif" src="/images/landing.gif" />
      </div>
    </div>
  );
};

export default SecondSection;
