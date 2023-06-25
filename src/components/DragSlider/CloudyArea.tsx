import React from 'react';
import styled from 'styled-components';

const CloudyArea = ({ cloudyAreaBgColor }: { cloudyAreaBgColor?: string }) => {
  return <CloudyWrapper bgColor={cloudyAreaBgColor} />;
};

export default CloudyArea;

export const CloudyWrapper = styled.div<{ bgColor?: string }>`
  position: absolute;
  right: 0;
  width: 116px;
  height: 100%;
  z-index: 999;
  background: ${({ bgColor }) => bgColor || 'linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #f9f9f9 100%)'};
`;
