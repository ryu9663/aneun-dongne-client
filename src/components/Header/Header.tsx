import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>관광지 상세 페이지 개발 예정</div>
      <div className={styles.header_button_wrapper}>
        <button>로그인은 필요 없지</button>
        <button>회원가입 역싀 필요 없지</button>
      </div>
    </header>
  );
};

export default Header;
