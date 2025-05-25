import { useCallback } from 'react';

import useCarouselContext from '../context/useCarouselContext';

export default function useCarouselIndex() {
  const { visibleRange, slidesCount, virtualSlidesCount } = useCarouselContext();

  const getRealIndex = useCallback(
    (index: number) => {
      if (index < visibleRange) {
        return slidesCount - visibleRange + index;
      }
      if (index >= virtualSlidesCount - visibleRange) {
        return index - (virtualSlidesCount - visibleRange);
      }
      return index - visibleRange;
    },
    [slidesCount, virtualSlidesCount, visibleRange],
  );

  const getVirtualIndex = useCallback(
    (index: number) => {
      return index + visibleRange;
    },
    [visibleRange],
  );

  return {
    getRealIndex,
    getVirtualIndex,
  };
}
