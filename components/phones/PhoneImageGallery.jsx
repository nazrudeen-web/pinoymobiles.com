"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export function PhoneMainImage({ phoneIndex, phoneName }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [1, 2, 3, 4, 5].map(
    (i) => `/mobile${((phoneIndex + i - 1) % 5) + 1}.jpg`
  );

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="group relative rounded-3xl bg-slate-50 aspect-square flex items-center justify-center overflow-hidden shadow-lg border border-slate-200/60">
        <Image
          src={images[currentImage]}
          alt={phoneName}
          fill
          className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 shadow-md opacity-0 group-hover:opacity-100 transition-all">
          <ZoomIn className="w-4 h-4 text-slate-600" />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <PhoneThumbnails
        phoneName={phoneName}
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
}

export function PhoneThumbnails({ phoneIndex, phoneName }) {
  const images = [1, 2, 3, 4, 5].map(
    (i) => `/mobile${((phoneIndex + i - 1) % 5) + 1}.jpg`
  );
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex gap-2 justify-center">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => setCurrentImage(i)}
          className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
            currentImage === i
              ? "ring-2 ring-blue-500 ring-offset-2 shadow-lg scale-105"
              : "border border-slate-200 hover:border-blue-300 hover:shadow-md opacity-70 hover:opacity-100"
          }`}
        >
          <Image
            src={img}
            alt={`${phoneName} view ${i + 1}`}
            fill
            className="object-contain p-1.5 bg-slate-50"
            sizes="64px"
          />
        </button>
      ))}
    </div>
  );
}
