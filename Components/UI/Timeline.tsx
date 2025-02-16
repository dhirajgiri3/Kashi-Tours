"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import Image from "next/image";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  modelPath?: string;
}

gsap.registerPlugin(ScrollTrigger);

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Track height changes using ResizeObserver
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // GSAP Animation for Image Stretching on Y-Axis
  useEffect(() => {
    if (!ref.current) return;

    const images = ref.current.querySelectorAll(".slide__img img");

    images.forEach((img) => {
      gsap.fromTo(
        img,
        { scaleY: 1 },
        {
          scaleY: 1.2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data]);

  return (
    <div className="w-full bg-white font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto pt-20 pb-4 px-4 md:px-8 lg:px-10">
        <h1 className="text-4xl md:text-5xl mb-4 font-bold text-black max-w-4xl">
          Our Services
        </h1>
        <p className="text-neutral-500 text-sm max-w-sm">
          We offer a range of services to make your pilgrimage as comfortable as
          possible.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <motion.div
                  className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2"
                  whileHover={{ scale: 1.2, backgroundColor: "#6366F1" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-gray-700">
                {item.title}
              </h3>
            </div>

            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </motion.div>
          </motion.div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-200 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export function TimelineDemo() {
  const data = [
    {
      title: "Hotel Booking",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 text-sm md:text-base font-medium">
            Stay in divine comfort near the holiest sites.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Image
              src="https://res.cloudinary.com/dgak25skk/image/upload/v1739083822/hotel3_vkvqhl.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://res.cloudinary.com/dgak25skk/image/upload/v1739083822/hotel2_lbqm55.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://res.cloudinary.com/dgak25skk/image/upload/v1739083822/hotel1_knp12f.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Flight Booking",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 text-sm md:text-base font-medium">
            Fly effortlessly to your sacred destinations.
          </p>
          <p className="text-gray-700 text-sm md:text-base font-semibold">
            Book your flight tickets now.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Image
              src="https://res.cloudinary.com/dgak25skk/image/upload/v1739083821/Airplane_in_Blue_Sky_hh5kjh.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZsaWdodHxlbnwwfHwwfHx8MA%3D%3D"
              alt="bento template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Bus & Travel Services",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 text-sm md:text-base font-medium">
          Convenient and reliable transport for your pilgrimage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Image
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://images.unsplash.com/photo-1542893403-13a23ed3f764?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="bento template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Personalized Travel Packages",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 text-sm md:text-base font-medium">
          Tailored journeys to suit your spiritual needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Image
              src="https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="bento template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://images.unsplash.com/photo-1504448252408-b32799ff32f3?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://images.unsplash.com/photo-1707938233687-47e61e5ad7c4?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />  
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Timeline data={data} />
    </div>
  );
}
