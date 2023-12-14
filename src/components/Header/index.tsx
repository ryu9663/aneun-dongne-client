import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.title} `}>위치기반 관광지 찾아보기</h1>
    </header>
  );
};

export default Header;
