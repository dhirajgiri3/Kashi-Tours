"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/dist/Observer";
import Image from "next/image";
import { SlideType } from "../../types/slider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

interface ModernSliderProps {
  slides: SlideType[];
  autoPlayInterval?: number;
}

const NEXT = 1;
const PREV = -1;

const ModernSlider: React.FC<ModernSliderProps> = ({
  slides,
  autoPlayInterval = 4000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<any>(null);

  const infiniteSlides = [
    {
      ...slides[slides.length - 1],
      id: `duplicate-end-${slides[slides.length - 1].id}`,
    },
    ...slides,
    { ...slides[0], id: `duplicate-start-${slides[0].id}` },
  ];

  const navigate = useCallback(
    (direction: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      let next = currentSlide + direction;
      if (next < 0) next = infiniteSlides.length - 3;
      if (next >= infiniteSlides.length - 1) next = 1;

      const previous = currentSlide;
      const currentEl = slideRefs.current[previous];
      const currentInner = slideInnerRefs.current[previous];
      const upcomingEl = slideRefs.current[next];
      const upcomingInner = slideInnerRefs.current[next];

      if (!currentEl || !currentInner || !upcomingEl || !upcomingInner) return;

      gsap
        .timeline({
          defaults: { duration: 1.6, ease: "power3.inOut" },
          onStart: () => {
            upcomingEl.classList.add("slide--current");
          },
          onComplete: () => {
            currentEl.classList.remove("slide--current");
            setCurrentSlide(next);
            setIsAnimating(false);
          },
        })
        .to(currentEl, { xPercent: -direction * 100 })
        .to(
          currentInner,
          {
            transformOrigin: direction === NEXT ? "100% 50%" : "0% 50%",
            scaleX: 2,
          },
          0
        )
        .fromTo(upcomingEl, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
        .fromTo(
          upcomingInner,
          {
            transformOrigin: direction === NEXT ? "0% 50%" : "100% 50%",
            xPercent: -direction * 100,
            scaleX: 2,
          },
          { xPercent: 0, scaleX: 1 },
          0
        );
    },
    [currentSlide, isAnimating, infiniteSlides.length]
  );

  useEffect(() => {
    const handleTransitionEnd = () => setIsAnimating(false);
    const container = slidesContainerRef.current;
    container?.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      container?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  useEffect(() => {
    if (!slidesContainerRef.current) return;

    observerRef.current = Observer.create({
      target: slidesContainerRef.current,
      type: "wheel,touch,pointer",
      onDown: () => navigate(PREV),
      onUp: () => navigate(NEXT),
      wheelSpeed: -1,
      tolerance: 10,
    });

    return () => {
      observerRef.current?.kill();
    };
  }, [navigate]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) return;
    autoPlayRef.current = setInterval(() => {
      navigate(NEXT);
    }, autoPlayInterval);
  }, [navigate, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    const container = slidesContainerRef.current;
    container?.addEventListener("mouseenter", stopAutoPlay);
    container?.addEventListener("mouseleave", startAutoPlay);
    return () => {
      stopAutoPlay();
      container?.removeEventListener("mouseenter", stopAutoPlay);
      container?.removeEventListener("mouseleave", startAutoPlay);
    };
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (slidesContainerRef.current && slideRefs.current.length === 0) {
      const slidesElements =
        slidesContainerRef.current.querySelectorAll(".slide");
      const slidesInner =
        slidesContainerRef.current.querySelectorAll(".slide__img");
      slideRefs.current = Array.from(slidesElements) as (HTMLDivElement | null)[];
      slideInnerRefs.current = Array.from(slidesInner) as (HTMLDivElement | null)[];
    }
  }, [slides]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute bottom-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={() => navigate(PREV)}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 
          flex items-center justify-center hover:bg-white/30 transition-all duration-300 
          hover:scale-110 active:scale-95"
          aria-label="Previous slide"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => navigate(NEXT)}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 
          flex items-center justify-center hover:bg-white/30 transition-all duration-300 
          hover:scale-110 active:scale-95"
          aria-label="Next slide"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div
        ref={slidesContainerRef}
        className="slides w-full h-full grid grid-rows-[100%] grid-cols-[100%] place-items-center"
      >
        {infiniteSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className={`slide w-full h-full col-[1/-1] row-[1/-1] pointer-events-none opacity-0 overflow-hidden 
            ${index === currentSlide ? "slide--current" : ""}`}
          >
            <div
              ref={(el) => {
                slideInnerRefs.current[index] = el;
              }}
              className="slide__img w-full h-full relative"
            >
              <Image
                src={slide.imageUrl} 
                alt={`Slide ${slide.id}`}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority={index === currentSlide}
                className="transform-gpu will-change-transform h-full w-full"
              />
              <h1>{slide.url}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernSlider;
