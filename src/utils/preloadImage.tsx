export const preloadImages = (srcs: string[], width?: number, height?: number) => {
  srcs.forEach(src => {
    const preloadImage = new Image(width, height);
    preloadImage.src = src;
  });
};
