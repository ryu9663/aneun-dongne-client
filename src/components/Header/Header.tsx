import styles from './header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>관광지 카드 클릭 후 생성되는 안내창을 닫는 기능은 개발예정입니다.</div>
      <div className={styles.header_button_wrapper}>
        <button>로그인은 필요 없지</button>
        <button>회원가입 역싀 필요 없지</button>
      </div>
    </header>
  );
};

export default Header;
