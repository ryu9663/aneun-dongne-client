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
              <img width='200' height='150' src=${img} >
         </div>
         <span>말풍선을 클릭하면 자세히 보기 페이지로 넘어갑니다.</span>
      </div>
  </div>
</div>`;
};
