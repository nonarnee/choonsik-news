import { useEffect } from 'react';

import styles from './Carousel.module.css';
import CarouselSlide from './CarouselSlide';
import useCarouselContext from './context/useCarouselContext';

export default function CarouselTrack() {
  const {
    prevSlide,
    nextSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    visibleSlides,
    handleTransitionEnd,
    trackRef,
    handleMouseEnter,
    handleMouseLeave,
  } = useCarouselContext();

  // 키보드 접근성
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide]);

  return (
    <div className={styles.carouselViewport}>
      <div
        ref={trackRef}
        className={styles.carouselTrack}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={handleTransitionEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {visibleSlides.map(({ slide, index, shouldRender, isActive }) => (
          <div key={index} className={styles.slide}>
            {shouldRender ? (
              <CarouselSlide index={index} isActive={isActive}>
                {slide}
              </CarouselSlide>
            ) : (
              <div className={styles.slidePlaceholder} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
