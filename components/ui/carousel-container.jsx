"use client";

import { forwardRef } from "react";

const CarouselContainer = forwardRef(function CarouselContainer(
  { children, className = "" },
  ref
) {
  return (
    <div className="relative">
      <div
        ref={ref}
        className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth ${className}`}
      >
        {children}
      </div>
    </div>
  );
});

export default CarouselContainer;
