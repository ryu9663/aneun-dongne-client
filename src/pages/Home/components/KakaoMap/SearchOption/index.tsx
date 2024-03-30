/* eslint-disable react-hooks/exhaustive-deps */
import styles from './index.module.scss';
import { usePlacesStore } from '@/pages/Home/hooks/usePlacesStore';
import { useDebounce } from '@/utils//hooks/useDebounce';
import { useCallback } from 'react';
import { debounce } from 'lodash-es';
import { Selectbox, DropdownTag, Input } from 'junyeol-components';

export const SearchOption = () => {
  const [setStoreRadius_KM, setNumOfPlaces] = usePlacesStore(state => [state.setRadius_KM, state.setNumOfPlaces]);
  const [radius_KM, setRadius_KM] = useDebounce(500);

  const handleDebounceRadius = useCallback(
    debounce((radius: number) => {
      setStoreRadius_KM(radius);
    }, 500),
    []
  );

  return (
    <div className={styles.search_options}>
      <DropdownTag fontSize="normal" fontWeight={400} name="관광지 검색 옵션 조정" className={styles.dropdown_wrapper}>
        <div className={styles.dropdown}>
          <Selectbox
            fontSize="normal"
            fontWeight={400}
            name="관광지 검색 수"
            size="normal"
            onChange={(numOfPlaces: number) => setNumOfPlaces(numOfPlaces)}
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
            value={radius_KM}
            onChange={e => {
              setRadius_KM(e.target.value);
              handleDebounceRadius(Number(e.target.value));
            }}
            validation={value => {
              return isNaN(Number(value)) ? '숫자만 입력해주세요' : '';
            }}
            label={{ htmlFor: 'radius', name: '반경(km)' }}
            placeholder="반경(km)"
          />
        </div>
      </DropdownTag>
    </div>
  );
};
