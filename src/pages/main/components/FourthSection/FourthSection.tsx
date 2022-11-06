import styles from './fourthSection.module.scss';

const FourthSection = () => {
  return (
    <section className={styles.fourth_section} data-aos="fade-up">
      <h3 className={styles.fourth_section_title}>나와 어울리는 장소로 떠날 준비가 되셨나요?</h3>
      <button className={styles.fourth_section_button}>시작하기</button>
    </section>
  );
};

export default FourthSection;
