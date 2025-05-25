import clsx from 'clsx';

import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react';

import styles from './Carousel.module.css';
import useCarouselContext from './context/useCarouselContext';

interface CarouselControlsProps {
  prevButtonLabel?: string;
  nextButtonLabel?: string;
}

export default function CarouselControls({
  prevButtonLabel = '이전 뉴스 배너',
  nextButtonLabel = '다음 뉴스 배너',
}: CarouselControlsProps) {
  const { prevSlide, nextSlide } = useCarouselContext();

  return (
    <>
      <button
        className={clsx(styles.controlButton, styles.prevButton)}
        onClick={prevSlide}
        aria-label={prevButtonLabel}
      >
        <ChevronLeftIcon width={16} height={16} color="var(--color-white)" />
      </button>
      <button
        className={clsx(styles.controlButton, styles.nextButton)}
        onClick={nextSlide}
        aria-label={nextButtonLabel}
      >
        <ChevronRightIcon width={16} height={16} color="var(--color-white)" />
      </button>
    </>
  );
}
