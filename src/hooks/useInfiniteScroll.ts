import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  onIntersect: () => void;
}

export const useInfiniteScroll = ({
  isLoading,
  hasMore,
  onIntersect,
}: UseInfiniteScrollProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [isLoading, hasMore, onIntersect]);

  return triggerRef;
};
