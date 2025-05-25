import type { ReactNode } from 'react';

import { CarouselContext } from './CarouselContext';
import useCarousel from '../hooks/useCarousel';

interface CarouselProviderProps {
  children: ReactNode;
  slides: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  visibleRange?: number;
}

export default function CarouselProvider({
  children,
  slides,
  autoPlay = false,
  autoPlayInterval = 3000,
  visibleRange = 2,
}: CarouselProviderProps) {
  const carousel = useCarousel({
    slides,
    autoPlay,
    autoPlayInterval,
    visibleRange,
  });

  return <CarouselContext.Provider value={{ ...carousel }}>{children}</CarouselContext.Provider>;
}
