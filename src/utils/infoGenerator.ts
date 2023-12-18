import styles from './infoGenerator.module.scss';

export const infoWindowGenerator = (content: string) => {
  return `<div class=${styles.info_window}>${content}</div>`;
};

export const mapInfoWindowGenerator = (title: string, img: string) => {
  return `<div class=${styles.info_wrapper}>
  <div class=${styles.info}>
      <div class="title">
      ${title}

      </div>
      <div class="body">
          <div class="img">
              <img width='200' height='150' src=${img} alt=${title}>
         </div>
         <span>노란색 마커를 클릭하면 네이버 검색창으로 이동합니다.</span>
      </div>
  </div>
</div>`;
};
