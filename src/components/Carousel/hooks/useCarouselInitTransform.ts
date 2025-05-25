import { useLayoutEffect, type RefObject } from 'react';

import getCarouselTransform from '../utils/getCarouselTransform';

interface UseCarouselInitTransformProps {
  trackRef: RefObject<HTMLDivElement>;
  currentIndex: number;
  transformStyle: {
    gap: number;
    offset: number;
    slideWidth: number;
  };
}

export default function useCarouselInitTransform({
  trackRef,
  currentIndex,
  transformStyle,
}: UseCarouselInitTransformProps) {
  useLayoutEffect(() => {
    // 첫 슬라이드 이동
    const el = trackRef.current;
    if (!el) return;

    el.style.transition = 'none';

    requestAnimationFrame(() => {
      el.style.transform = getCarouselTransform({
        currentIndex,
        ...transformStyle,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
