import { vi } from 'vitest';

export const mockImageOnLoad = () => {
  const originalImage = global.Image;
  global.Image = class extends originalImage {
    constructor(width?: number, height?: number) {
      super(width, height);
      setTimeout(() => this.onload(), 10); // onload 시뮬레이션
    }
    onload = vi.fn();
  };
};
