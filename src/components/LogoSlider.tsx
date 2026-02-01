"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface LogoSliderProps {
  items: Array<{
    name: string;
    logo?: string;
    fallbackIcon?: LucideIcon;
  }>;
}

export default function LogoSlider({ items }: LogoSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    loop: true,
    dragFree: true,
    containScroll: false,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const autoScrollRef = useRef<number | null>(null);
  const scrollVelocity = 0.5;

  const onPointerDown = useCallback(() => {
    setIsMouseDown(true);
    setIsDragging(true);
    setHoveredIndex(null);
  }, []);

  const onPointerUp = useCallback(() => {
    setIsMouseDown(false);
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, onPointerDown, onPointerUp]);

  useEffect(() => {
    if (!emblaApi) return;
  
    let lastTime = performance.now();
    const stepInterval = 1200; // ms between small scroll steps (tweak if needed)
  
    const autoScroll = (currentTime: number) => {
      if (!isDragging && !isMouseDown) {
        const deltaTime = currentTime - lastTime;
        if (deltaTime >= stepInterval) {
          emblaApi.scrollNext();
          lastTime = currentTime;
        }
      } else {
        // reset timer when user is interacting
        lastTime = currentTime;
      }
  
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };
  
    autoScrollRef.current = requestAnimationFrame(autoScroll);
  
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [emblaApi, isDragging, isMouseDown]);

  return (
    <div className="relative select-none">
        {/* Edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none z-10"></div>

        {/* Slider container */}
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md shadow-lg shadow-black/20 h-32"
        >
          <div className="flex h-full">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center justify-center px-8 min-w-[120px] h-full relative group"
                onMouseEnter={() => !isDragging && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="w-16 h-16 flex items-center justify-center opacity-80">
                  {item.logo && !imageErrors.has(index) ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                      onError={() => {
                        setImageErrors((prev) => new Set(prev).add(index));
                      }}
                    />
                  ) : item.fallbackIcon ? (
                    <item.fallbackIcon className="w-12 h-12 text-[var(--color-muted)]" />
                  ) : null}
                </div>
                <div
                  className={`absolute bottom-2 text-xs text-muted-foreground transition-opacity duration-300 ${
                    hoveredIndex === index && !isDragging
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
