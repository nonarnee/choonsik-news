import type { ReactNode, RefObject, TouchEvent } from 'react';
import { useState, useRef, useCallback, useMemo } from 'react';

import useCarouselAutoplay from './useCarouselAutoPlay';
import useCarouselInitTransform from './useCarouselInitTransform';
import getCarouselTransform from '../utils/getCarouselTransform';

interface UseCarouselProps {
  slides: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  visibleRange?: number;
}

export default function useCarousel({
  slides,
  autoPlay = false,
  autoPlayInterval = 3000,
  visibleRange = 2,
}: UseCarouselProps) {
  // 클론 슬라이드 생성
  const virtualSlides = useMemo(() => {
    return [...slides.slice(-visibleRange), ...slides, ...slides.slice(0, visibleRange)];
  }, [slides, visibleRange]);

  const [currentIndex, setCurrentIndex] = useState(visibleRange);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isTransitioningRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const slidesCount = slides.length;
  const virtualSlidesCount = virtualSlides.length;
  const realLastIndex = virtualSlides.length - visibleRange - 1;

  const transformStyle = useMemo(
    () => ({
      gap: 10,
      offset: (100 - 90) / 2,
      slideWidth: 90,
    }),
    [],
  );

  useCarouselInitTransform({
    trackRef: trackRef as RefObject<HTMLDivElement>,
    currentIndex,
    transformStyle,
  });

  const goToSlide = useCallback(
    (index: number) => {
      if (!trackRef.current) return;

      trackRef.current!.style.transition = 'transform 0.3s ease-in-out';
      trackRef.current!.style.transform = getCarouselTransform({
        currentIndex: index,
        ...transformStyle,
      });
      setCurrentIndex(index);
    },
    [transformStyle],
  );

  const autoPlayTimerRef = useCarouselAutoplay({
    autoPlay,
    autoPlayInterval,
    currentIndex,
    goToSlide,
    isPaused: isHovered,
  });

  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    if (!isTransitioningRef.current) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, goToSlide]);

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    if (!isTransitioningRef.current) {
      goToSlide(currentIndex + 1);
    }
  }, [currentIndex, goToSlide]);

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      // 왼쪽으로 스와이프
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // 오른쪽으로 스와이프
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // 현재 보이는 슬라이드와 그 앞뒤 슬라이드 계산
  const visibleSlides = useMemo(() => {
    // 렌더링할 슬라이드 계산
    return virtualSlides.map((slide, index) => {
      const distance = Math.abs(index - currentIndex);

      const maxIndex = virtualSlidesCount;
      const wrapAroundDistance = Math.min(distance, maxIndex - distance);

      const shouldRender = wrapAroundDistance <= visibleRange + 3;

      return {
        slide,
        index,
        shouldRender,
        isActive: index === currentIndex,
      };
    });
  }, [currentIndex, virtualSlides, virtualSlidesCount, visibleRange]);

  // 트랜지션 종료 후 처리
  const handleTransitionEnd = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (currentIndex === visibleRange - 1) {
      // 실제 첫번째 슬라이드 이전으로 갔을 때
      requestAnimationFrame(() => {
        track.style.transition = 'none';
        track.style.transform = getCarouselTransform({
          currentIndex: realLastIndex,
          ...transformStyle,
        });

        requestAnimationFrame(() => {
          // 맨 뒤의 클론이 아닌 실제 마지막 슬라이드로 이동
          setCurrentIndex(realLastIndex);

          requestAnimationFrame(() => {
            track.style.transition = 'transform 0.3s ease-in-out';
          });
        });
      });
    }

    if (currentIndex === realLastIndex + 1) {
      // 실제 마지막 슬라이드 이후로 갔을 때
      requestAnimationFrame(() => {
        track.style.transition = 'none';
        track.style.transform = getCarouselTransform({
          currentIndex: visibleRange,
          ...transformStyle,
        });

        void track.offsetHeight;

        requestAnimationFrame(() => {
          // 맨 앞의 클론이 아닌 실제 첫 슬라이드로 이동
          setCurrentIndex(visibleRange);

          requestAnimationFrame(() => {
            track.style.transition = 'transform 0.3s ease-in-out';
          });
        });
      });
    }
  }, [currentIndex, visibleRange, realLastIndex, transformStyle]);

  return {
    currentIndex,
    visibleRange,
    isTransitioning: isTransitioningRef.current,
    trackRef,
    goToSlide,
    prevSlide,
    nextSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    slidesCount,
    virtualSlidesCount,
    visibleSlides,
    handleTransitionEnd,
    autoPlayTimerRef,
    handleMouseEnter,
    handleMouseLeave,
  };
}
