export default function getCarouselTransform({
  currentIndex,
  slideWidth,
  gap,
  offset,
}: {
  currentIndex: number;
  slideWidth: number;
  gap: number;
  offset: number;
}) {
  return `translateX(calc(-${currentIndex * slideWidth}% - ${currentIndex * gap}px + ${offset}%))`;
}
