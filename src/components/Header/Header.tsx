import styles from './header.module.scss';
import { StyledLink } from 'utils/StyledLink';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.info} `}>
        <StyledLink to="/">
          <button className={styles.button}>홈으로</button>
        </StyledLink>
      </div>
      <div className={styles.header_button_wrapper}>
        <button className={styles.button}>로그인은 필요 없지</button>
        <button className={styles.button}>회원가입 역싀 필요 없지</button>
      </div>
    </header>
  );
};

export default Header;
