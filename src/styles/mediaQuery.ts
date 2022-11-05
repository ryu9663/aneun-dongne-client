export const Device = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP'
} as const;
export type DeviceType = typeof Device[keyof typeof Device];

export type BreakPoint = {
  minPx: number;
  maxPx: number | null;
};

export const NewBreakPoints: Record<DeviceType, BreakPoint> = {
  MOBILE: {
    minPx: 0,
    maxPx: 767
  },
  TABLET: {
    minPx: 768,
    maxPx: 1279
  },
  DESKTOP: {
    minPx: 1280,
    maxPx: null
  }
};

export const NewMQ = {
  MOBILE: `@media only screen and (max-width: ${NewBreakPoints.MOBILE.maxPx}px)`,
  TABLET: `@media only screen and (min-width: ${NewBreakPoints.TABLET.minPx}px)`,
  DESKTOP: `@media only screen and (min-width: ${NewBreakPoints.DESKTOP.minPx}px)`
};
