import styles from './thirdSection.module.scss';

const ThirdSection = () => {
  return (
    <section className={styles.third_section} data-aos="fade-left">
      <h3 className={styles.third_section_title}>
        그곳이 어디라도 간직하고 싶다면 내가 서있는 바로 그곳을 저장할 수 있어요.
      </h3>
      <div className={styles.third_section_image_wrapper}>
        <img className={styles.illust} src="images/likeimg.png" alt="장소를 저장하는 사람들 이미지" />
        <img className={styles.play_diy} src="/images/landing_3.gif" alt="아는동네 서비스 gif" />
      </div>
    </section>
  );
};

export default ThirdSection;
