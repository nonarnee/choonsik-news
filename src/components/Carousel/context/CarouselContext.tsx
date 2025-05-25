import type { ReactNode, RefObject, TouchEvent } from 'react';
import { createContext } from 'react';

interface Slide {
  slide: ReactNode;
  index: number;
  shouldRender: boolean;
  isActive: boolean;
}

interface CarouselContextProps {
  currentIndex: number;
  visibleRange: number;
  isTransitioning: boolean;
  goToSlide: (index: number) => void;
  prevSlide: () => void;
  nextSlide: () => void;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: () => void;
  slidesCount: number;
  virtualSlidesCount: number;
  visibleSlides: Slide[];
  handleTransitionEnd: () => void;
  trackRef: RefObject<HTMLDivElement | null>;
  autoPlayTimerRef: RefObject<ReturnType<typeof setInterval> | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const CarouselContext = createContext<CarouselContextProps | null>(null);
