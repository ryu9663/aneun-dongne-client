import { detectDevice } from '@/utils/detectDevice';
import styles from './infoGenerator.module.scss';

export const infoWindowGenerator = (content: string) => {
  return `<div class=${styles.info_window}>${content}</div>`;
};

const device = detectDevice();

export const mapInfoWindowGenerator = (title: string, img: string) => {
  return `<div class=${styles.info_wrapper}>
  <div class=${styles.info}>
      <div class="title">
      ${title}

      </div>
      <div class="body">
          <div class="img" onclick="window.open('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${title}')">
              <img width='200' height='150' src=${img} alt=${title}>
         </div>
         <span>${`${device === 'PC' ? '노란색 마커를' : '사진을'} 클릭하면 네이버 검색창으로 이동합니다.`}</span>
      </div>
  </div>
</div>`;
};
