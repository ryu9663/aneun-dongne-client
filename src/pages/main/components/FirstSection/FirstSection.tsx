import styles from './firstSection.module.scss';
import { Icon } from 'react-icons-kit';
import { arrow_down } from 'react-icons-kit/ikons/arrow_down';
import { Link } from 'react-router-dom';

const FirstSection = () => {
  const ToScrollBottom = () => {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return (
    <section className={styles.first_section}>
      <img src="/images/look.gif" alt="어디론가 떠나고 싶으신가요?" />
      <div className={styles.first_section_title_wrapper}>
        <h3 className={styles.first_section_title}>어디론가 떠나고 싶으신가요?</h3>
        <Link to="/map">
          <button className={styles.first_section_button}>시작하기</button>
        </Link>
      </div>
      <div className={styles.first_section_icon}>
        <Icon size={100} icon={arrow_down} onClick={ToScrollBottom} />
      </div>
    </section>
  );
};

export default FirstSection;
