import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Carousel.module.css';
import useCarouselContext from './context/useCarouselContext';

interface CarouselSlideProps {
  index: number;
  children: ReactNode;
  isActive: boolean;
}

export default function CarouselSlide({ index, children, isActive }: CarouselSlideProps) {
  const { slidesCount } = useCarouselContext();

  return (
    <div
      className={clsx({
        [styles.carouselSlide]: true,
        [styles.active]: isActive,
      })}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1}/${slidesCount}`}
    >
      {children}
    </div>
  );
}
