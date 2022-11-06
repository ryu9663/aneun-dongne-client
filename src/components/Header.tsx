import styles from './header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/images/logo.png" id={styles.logo} alt="logo" width={100} height={50} />
      </Link>
      <div className={styles.header_button_wrapper}>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
};

export default Header;
