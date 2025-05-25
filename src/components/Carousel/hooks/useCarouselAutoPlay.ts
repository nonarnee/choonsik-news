import { useEffect, useRef } from 'react';

interface UseCarouselAutoplayParams {
  autoPlay: boolean;
  autoPlayInterval: number;
  currentIndex: number;
  goToSlide: (index: number) => void;
  isPaused: boolean;
}

export default function useCarouselAutoplay({
  autoPlay,
  autoPlayInterval,
  currentIndex,
  goToSlide,
  isPaused,
}: UseCarouselAutoplayParams) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex, goToSlide, isPaused]);

  return timerRef;
}
