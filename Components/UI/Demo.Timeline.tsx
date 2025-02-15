// ./UI/Demo.Timeline.tsx

import Image from "next/image";
import React from "react";
import { Timeline } from "./Timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Hotel Booking",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 text-sm md:text-base font-medium">
            Stay in divine comfort near the holiest sites.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Image
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://assets.aceternity.com/templates/startup-3.webp"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://assets.aceternity.com/pro/bento-grids.png"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-xl object-cover h-48 w-full shadow-lg transition-transform transform hover:scale-105"
            />
            <Image
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
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
    <div className="min-h-screen w-full bg-gray-50 py-12">
      <Timeline data={data} />
    </div>
  );
}
