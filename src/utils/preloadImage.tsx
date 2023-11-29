export const preloadImages = (srcs: string[], width?: number, height?: number) => {
  srcs.forEach(src => {
    const preloadImage = new Image(200, 100);
    preloadImage.src = src;
  });
};
