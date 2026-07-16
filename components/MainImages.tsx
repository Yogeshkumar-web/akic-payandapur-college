"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DEFAULT_IMAGES = [
  "/college_rooms.jpg",
  "/college_gate.jpg",
  "/college_parking.jpg",
  "/college_middle_view.jpg",
  "/group_photo.jpg",
];

export default function MainImages({
  images = DEFAULT_IMAGES,
  interval = 4500,
}: {
  images?: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const start = () => {
    stop();
    if (!reduceMotion && images.length > 1) {
      timerRef.current = setInterval(
        () => setIndex((current) => (current + 1) % images.length),
        interval
      );
    }
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, interval, reduceMotion]);

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    start();
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#e9f0f8]"
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
        stop();
      }}
      onTouchMove={(event) => {
        touchEndX.current = event.touches[0].clientX;
      }}
      onTouchEnd={() => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
          const delta = touchStartX.current - touchEndX.current;
          if (Math.abs(delta) > 50) {
            goTo(
              delta > 0
                ? (index + 1) % images.length
                : (index - 1 + images.length) % images.length
            );
          }
        }
        touchStartX.current = null;
        touchEndX.current = null;
        start();
      }}
      aria-roledescription="carousel"
      aria-label="College campus photographs"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={images[index]}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={images[index]}
            alt={`AKIC Payandapur campus view ${index + 1}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => goTo((index - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#8B1E2D] shadow-lg backdrop-blur transition hover:scale-105 md:left-6"
        aria-label="Previous campus image"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => goTo((index + 1) % images.length)}
        className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#8B1E2D] shadow-lg backdrop-blur transition hover:scale-105 md:right-6"
        aria-label="Next campus image"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-[#5F0F1A]/55 px-3 py-2 backdrop-blur md:bottom-6">
        {images.map((image, imageIndex) => (
          <button
            key={image}
            onClick={() => goTo(imageIndex)}
            className={`h-2 rounded-full transition-all ${
              imageIndex === index ? "w-7 bg-white" : "w-2 bg-white/55 hover:bg-white"
            }`}
            aria-label={`Show campus image ${imageIndex + 1}`}
            aria-current={imageIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
