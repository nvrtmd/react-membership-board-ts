import { useState, useEffect } from 'react';

export const useIntersectionObserver = (
  intersectRef: React.RefObject<HTMLDivElement>,
  options: {
    root: Element | null;
    rootMargin: string;
    threshold: number;
  },
) => {
  const [isIntersect, setIsIntersect] = useState<boolean>(false);
  const { root, rootMargin = '0px', threshold } = options;

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsIntersect(true);
    } else {
      setIsIntersect(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold,
    });

    if (intersectRef.current) observer.observe(intersectRef.current);

    return () => observer.disconnect();
  }, [intersectRef, root, rootMargin, threshold]);

  return {
    isIntersect,
  };
};
