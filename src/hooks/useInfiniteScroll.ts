import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
    isLoading: boolean;
    hasMore: boolean;
    onIntersect: () => void;
}

export const useInfiniteScroll = ({ isLoading, hasMore, onIntersect }:UseInfiniteScrollProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoading || !hasMore) return; // Не следим, если грузим или всё загрузили

        const observer = new IntersectionObserver((entries) => {

            if (entries[0].isIntersecting && !isLoading && hasMore) {
                onIntersect();
            }
        }, { threshold: 0.1, rootMargin: '200px' });

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => observer.disconnect();
    }, [isLoading, hasMore, onIntersect]);

    return triggerRef;
}