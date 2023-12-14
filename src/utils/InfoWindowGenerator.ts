const style = 'text-align:center;padding:6px 0;';
export const infoWindowGenerator = (content: string) => {
  return `<div style=${style}>${content}</div>`;
};

export const photoInfoWindowGenerator = (title: string, img: string) => {
  return `<div style="width: 200px">
  <div class="info">
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
