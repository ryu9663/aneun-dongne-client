import { Button, Input, Modal, Selectbox } from 'junyeol-components';
import styles from './index.module.scss';
import { useState } from 'react';
import { isNumber } from 'lodash-es';

export const SearchOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [radius, setRadius] = useState('');

  return (
    <div className={styles.search_options}>
      <Button onClick={() => setIsOpen(true)}>반경, 검색지 수 조정</Button>
      <Modal size="large" onOk={() => setIsOpen(false)} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>헤더</Modal.Header>
        <Modal.Body>
          <div className={styles.modal_body}>
            <Selectbox
              name="관광지 검색 수"
              size="medium"
              onChange={v => console.log(v)}
              options={[
                { name: '10개', value: 10 },
                { name: '20개', value: 20 },
                { name: '30개', value: 30 },
                { name: '40개', value: 40 },
                { name: '50개', value: 50 }
              ]}
            />

            <Input
              type="text"
              value={radius}
              onChange={e => setRadius(e.target.value)}
              validation={value => {
                console.log(typeof value, Number(value));
                return isNaN(Number(value)) ? '숫자만 입력해주세요' : '';
              }}
              label={{ htmlFor: 'radius', name: '반경' }}
              placeholder="반경(m)"
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
