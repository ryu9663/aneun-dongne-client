/* eslint-disable react-hooks/exhaustive-deps */
import { Input, DropdownTag, Selectbox } from 'junyeol-components';
import styles from './index.module.scss';
import { usePlacesStore } from 'pages/Home/hooks/usePlacesStore';
import { useDebounce } from 'utils/hooks/useDebounce';
import { useCallback } from 'react';
import { debounce } from 'lodash-es';

export const SearchOption = () => {
  const [setStoreRadius, setNumOfRows] = usePlacesStore(state => [state.setRadius, state.setNumOfRows]);
  const [radius, setRadius] = useDebounce(500);

  const handleDebounceRadius = useCallback(
    debounce((radius: number) => {
      setStoreRadius(radius);
    }, 500),
    []
  );

  return (
    <div className={styles.search_options}>
      <DropdownTag name="관광지 검색 옵션 조정" className={`${styles.button} ${styles['font-weight-700']}`}>
        <div>
          <Selectbox
            name="관광지 검색 수"
            size="medium"
            onChange={numOfPlaces => setNumOfRows(numOfPlaces)}
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
            onChange={e => {
              setRadius(e.target.value);
              handleDebounceRadius(Number(e.target.value));
            }}
            validation={value => {
              return isNaN(Number(value)) ? '숫자만 입력해주세요' : '';
            }}
            label={{ htmlFor: 'radius', name: '반경' }}
            placeholder="반경(m)"
          />
        </div>
      </DropdownTag>
    </div>
  );
};
