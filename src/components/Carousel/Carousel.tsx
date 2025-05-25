import type { ReactNode } from 'react';

import styles from './Carousel.module.css';
import CarouselControls from './CarouselControls';
import CarouselIndicators from './CarouselIndicators';
import CarouselTrack from './CarouselTrack';
import CarouselProvider from './context/CarouselProvier';

interface CarouselProps {
  slides: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  visibleRange?: number;
}

export default function Carousel({
  slides,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  visibleRange = 2,
}: CarouselProps) {
  if (slides.length === 0) {
    return null;
  }

  return (
    <CarouselProvider
      slides={slides}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
      visibleRange={visibleRange}
    >
      <div className={styles.carouselContainer}>
        <div
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label="이미지 슬라이드"
        >
          <CarouselTrack />
          <CarouselControls />
        </div>

        {showIndicators && <CarouselIndicators />}
      </div>
    </CarouselProvider>
  );
}
