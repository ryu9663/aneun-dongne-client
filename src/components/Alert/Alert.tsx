import { useState } from 'react';
import styles from './alert.module.scss';

interface Props {
  content: string;
  btnContent: string;
}
const Alert = ({ content, btnContent }: Props) => {
  const [alertOn, setAlertOn] = useState(true);
  return (
    <>
      {alertOn && (
        <div className={styles.alert_wrapper} onClick={() => setAlertOn(false)}>
          {/* JSX를 props로 받기 */}
          <div
            className={styles.alert_content}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {content}
            <button className={styles.alert_button} onClick={() => setAlertOn(false)}>
              {btnContent}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
