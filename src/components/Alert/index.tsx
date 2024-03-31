import styles from './index.module.scss';

interface Props {
  content: string;
  btnContent?: string;
  alertOn: boolean;
  setAlertOn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Alert = ({ content, btnContent = '확인', alertOn, setAlertOn }: Props) => {
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
            <pre>{content}</pre>
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
