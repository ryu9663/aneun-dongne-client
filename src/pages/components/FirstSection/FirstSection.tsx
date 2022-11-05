import React from 'react';
import styles from './firstSection.module.scss';
import { Icon } from 'react-icons-kit';
import { arrow_down } from 'react-icons-kit/ikons/arrow_down';

const FirstSection = () => {
  const ToScrollBottom = () => {
    window.scroll({
      top: window.innerHeight * 2,
      behavior: 'smooth'
    });
  };
  return (
    <div className={styles.first_section}>
      <img src="/images/look.gif" alt="어디론가 떠나고 싶으신가요?" />
      <div className={styles.first_section_title_wrapper}>
        <h3 className={styles.first_section_title}>어디론가 떠나고 싶으신가요?</h3>
        <button className={styles.first_section_button}>시작하기</button>
      </div>
      <div className={styles.first_section_icon}>
        <Icon size={100} icon={arrow_down} onClick={ToScrollBottom} />
      </div>
    </div>
  );
};

export default FirstSection;
