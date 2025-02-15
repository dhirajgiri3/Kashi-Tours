"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { cn } from "lib/utils";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
    className,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
    className?: string;
}) => {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const clearExistingInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resetAutoPlay = useCallback(() => {
        clearExistingInterval();
        if (autoplay && !isPaused) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, 5000);
        }
    }, [autoplay, isPaused]);

    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = useCallback(() => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    // Reset auto-play when active changes
    useEffect(() => {
        resetAutoPlay();
        return clearExistingInterval;
    }, [active, isPaused, resetAutoPlay]);

    // Pause on hover and resume on mouse leave
    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    // Compute stable random rotates for each testimonial
    const randomRotates = useMemo(
        () => testimonials.map(() => Math.floor(Math.random() * 21) - 10),
        [testimonials]
    );

    // When drag ends, depending on the direction trigger next or prev.
    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 100;
        if (info.offset.x < -threshold) {
            handleNext();
        } else if (info.offset.x > threshold) {
            handlePrev();
        }
    };

    return (
        <div
            className={cn("max-w-6xl mx-auto px-4 md:px-8 lg:px-12", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <div className="relative h-[400px] lg:h-[500px] w-full">
                        <AnimatePresence mode="wait">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    drag={index === active ? "x" : false}
                                    onDragEnd={index === active ? handleDragEnd : undefined}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.92,
                                        y: 20,
                                        rotateY: randomRotates[index],
                                    }}
                                    animate={{
                                        opacity: index === active ? 1 : 0,
                                        scale: index === active ? 1 : 0.95,
                                        y: index === active ? 0 : 20,
                                        rotateY: index === active ? 0 : randomRotates[index],
                                        zIndex: index === active ? 999 : testimonials.length + 2 - index,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.92,
                                        y: -20,
                                        rotateY: randomRotates[index],
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={cn(
                                        "absolute inset-0 origin-center",
                                        index === active ? "pointer-events-auto" : "pointer-events-none"
                                    )}
                                >
                                    <div className="group relative w-full h-full overflow-hidden rounded-3xl bg-background/5 backdrop-blur-sm shadow-2xl shadow-black/5">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-75" />
                                        <Image
                                            src={testimonial.src}
                                            alt={testimonial.name}
                                            width={800}
                                            height={1000}
                                            priority={index === 0}
                                            draggable={false}
                                            className="h-full w-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="order-1 lg:order-2 flex flex-col justify-between gap-8">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="space-y-8"
                    >
                        <svg
                            className="h-12 w-12 text-gray-900"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>

                        <div className="relative">
                            <motion.p 
                                className="text-xl leading-relaxed text-foreground/90 font-serif"
                            >
                                {testimonials[active].quote.split(" ").map((word, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: index * 0.02,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </div>

                        <div className="pt-6 border-t border-muted/10">
                            <h3 className="text-2xl font-medium tracking-tight text-foreground font-serif">
                                {testimonials[active].name}
                            </h3>
                            <p className="mt-2 text-base text-muted-foreground/80">
                                {testimonials[active].designation}
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 p-1.5 rounded-full bg-secondary/50 backdrop-blur-sm">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    handlePrev();
                                }}
                                aria-label="Previous testimonial"
                                className="h-10 w-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-all duration-300 group/button shadow-sm"
                            >
                                <IconArrowLeft className="h-5 w-5 text-foreground group-hover/button:-translate-x-0.5 transition-transform duration-300" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    handleNext();
                                }}
                                aria-label="Next testimonial"
                                className="h-10 w-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-all duration-300 group/button shadow-sm"
                            >
                                <IconArrowRight className="h-5 w-5 text-foreground group-hover/button:translate-x-0.5 transition-transform duration-300" />
                            </motion.button>
                        </div>
                        <div className="text-base text-muted-foreground tracking-wider">
                            <span className="font-medium">{active + 1}</span>
                            <span className="mx-2">/</span>
                            <span>{testimonials.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};