"use client";

import { useRef, useCallback } from "react";

export default function useCarouselScroll() {
  const scrollRef = useRef(null);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const scrollAmount = containerWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollLeft = useCallback(() => scroll("left"), [scroll]);
  const scrollRight = useCallback(() => scroll("right"), [scroll]);

  return { scrollRef, scrollLeft, scrollRight };
}
