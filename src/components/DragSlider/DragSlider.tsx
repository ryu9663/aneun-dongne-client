import { useRef, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import useHasScroll from 'utils/hooks/useHasScroll';
import CloudyArea from './CloudyArea';

interface CloudyProps {
  hasCloudyArea?: boolean;
  cloudyAreaBgColor?: string;
}
interface Props extends CloudyProps {
  children: React.ReactNode;
}

export const DragSlider = ({ children, hasCloudyArea = true, cloudyAreaBgColor, ...rest }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDownEvent = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (sliderRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseMoveEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    e.preventDefault();

    if (sliderRef.current) {
      const walk = e.pageX - clickPoint;

      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const hasScroll = useHasScroll(sliderRef);

  return (
    <Container {...rest}>
      {hasCloudyArea && hasScroll && <CloudyArea cloudyAreaBgColor={cloudyAreaBgColor} />}
      <Slider
        ref={sliderRef}
        onMouseDown={handleMouseDownEvent}
        onMouseLeave={() => setDragging(false)}
        onMouseUp={() => setDragging(false)}
        onMouseMove={handleMouseMoveEvent}
      >
        {children}
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  img {
    pointer-events: none;
  }
`;

const Slider = styled.div`
  display: flex;
  width: max-content;
  cursor: grab;

  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  padding-bottom: 21px;

  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    width: 248px;
    height: 9px;
    border-radius: 100px;
    background: #d9d9d9;
  }
  &::-webkit-scrollbar-track {
    background: transperant;
  }
`;
