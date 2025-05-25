import clsx from 'clsx';
import { useState, useMemo, useEffect } from 'react';

import ChevronDoubleLeftIcon from '@/assets/icons/chevron-double-left.svg?react';
import ChevronDoubleRightIcon from '@/assets/icons/chevron-double-right.svg?react';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';

import styles from './Carousel.module.css';
import useCarouselContext from './context/useCarouselContext';
import useCarouselIndex from './hooks/useCarouselIndex';

export default function CarouselIndicators() {
  const { slidesCount, goToSlide, currentIndex } = useCarouselContext();
  const { getRealIndex, getVirtualIndex } = useCarouselIndex();
  const realIndex = getRealIndex(currentIndex);

  const [page, setPage] = useState(0);
  const slidesPerPage = 5;
  const maxPage = Math.floor(slidesCount / slidesPerPage) - 1;
  const showPagination = slidesCount > slidesPerPage;

  const indicators = useMemo(() => {
    const result = [];

    for (let i = 0; i < slidesCount; i++) {
      result.push({
        index: i,
        label: `${i + 1}번 슬라이드로 이동`,
      });
    }

    return result;
  }, [slidesCount]);

  const handleGoFirst = () => {
    setPage(0);
    goToSlide(getVirtualIndex(0));
  };
  const handleGoLast = () => {
    setPage(maxPage);
    goToSlide(getVirtualIndex(slidesCount - 1));
  };
  const handleGoPrev = () => {
    const newPage = Math.max(page - 1, 0);
    setPage(newPage);
    goToSlide(getVirtualIndex(slidesPerPage * newPage));
  };
  const handleGoNext = () => {
    const newPage = Math.min(page + 1, maxPage);
    setPage(newPage);
    goToSlide(getVirtualIndex(slidesPerPage * newPage));
  };

  useEffect(() => {
    if (page !== Math.floor(realIndex / slidesPerPage)) {
      setPage(Math.floor(realIndex / slidesPerPage));
    }
  }, [page, realIndex]);

  return (
    <div className={styles.indicatorWrapper} aria-label="슬라이드 인디케이터">
      {showPagination && (
        <>
          <button
            className={styles.indicatorPageButton}
            onClick={handleGoFirst}
            aria-label="첫 페이지로 이동"
            disabled={page === 0}
          >
            <ChevronDoubleLeftIcon width={16} height={16} color="var(--color-white)" />
          </button>
          <button
            className={styles.indicatorPageButton}
            onClick={handleGoPrev}
            aria-label="이전 페이지로 이동"
            disabled={page === 0}
          >
            <ChevronLeftIcon width={16} height={16} color="var(--color-white)" />
          </button>
        </>
      )}

      <div role="tablist" className={styles.indicatorTrack}>
        {indicators.slice(page * slidesPerPage, (page + 1) * slidesPerPage).map((indicator) => (
          <button
            key={indicator.index}
            className={clsx(styles.indicator, { [styles.active]: indicator.index === realIndex })}
            onClick={() => goToSlide(getVirtualIndex(indicator.index))}
            aria-label={indicator.label}
            aria-selected={indicator.index === realIndex}
            tabIndex={indicator.index === realIndex ? 0 : -1}
            role="tab"
          >
            {showPagination && indicator.index + 1}
          </button>
        ))}
      </div>

      {showPagination && (
        <>
          <button
            className={styles.indicatorPageButton}
            onClick={handleGoNext}
            aria-label="다음 페이지로 이동"
            disabled={page === maxPage}
          >
            <ChevronRightIcon width={16} height={16} color="var(--color-white)" />
          </button>
          <button
            className={styles.indicatorPageButton}
            onClick={handleGoLast}
            aria-label="마지막 페이지로 이동"
            disabled={page === maxPage}
          >
            <ChevronDoubleRightIcon width={16} height={16} color="var(--color-white)" />
          </button>
        </>
      )}
    </div>
  );
}
