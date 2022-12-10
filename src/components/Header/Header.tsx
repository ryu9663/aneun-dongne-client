import styles from './header.module.scss';
import { useState } from 'react';
import Alert from 'components/Alert/Alert';

const develpePlan = `
관광지 세부 페이지
모바일,태블릿 반응형
`;
const Header = () => {
  const [showPlan, setShowPlan] = useState(false);
  return (
    <header className={styles.header}>
      <div className={`${styles.info} `}>
        <button className={styles.button} onClick={() => setShowPlan(true)}>
          개발 예정인 것
        </button>
        {showPlan && <Alert content={develpePlan} alertOn={showPlan} setAlertOn={setShowPlan} />}
      </div>
      <div className={styles.header_button_wrapper}>
        <button className={styles.button}>로그인은 필요 없지</button>
        <button className={styles.button}>회원가입 역싀 필요 없지</button>
      </div>
    </header>
  );
};

export default Header;
