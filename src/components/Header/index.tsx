import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.title} `}>안녕 동네</h1>
    </header>
  );
};

export default Header;
