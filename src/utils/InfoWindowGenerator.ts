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
              <img style = "width:100%;height:100px" src=${img} width="73" height="70">
         </div>
         <span>말풍선을 클릭하면 자세히 보기 페이지로 넘어갑니다.</span>
      </div>
  </div>
</div>`;
};
