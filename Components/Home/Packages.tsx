"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';

interface PackageCardType {
  title: string;
  duration: string;
  description: string;
}

const packages: PackageCardType[] = [
  {
    title: "Kashi Darshan Tour",
    duration: "3 Days, 2 Nights",
    description: "Immerse yourself in the divine atmosphere of Kashi, visiting sacred temples, participating in evening Ganga Aarti, and experiencing spiritual rejuvenation."
  },
  {
    title: "Ayodhya Spiritual Journey",
    duration: "2 Days, 1 Night",
    description: "Journey to the birthplace of Lord Rama and immerse in its divine history."
  },
  {
    title: "Prayagraj Pilgrimage",
    duration: "2 Days, 1 Night",
    description: "Witness the confluence of rivers at the Triveni Sangam, a place of immense religious significance."
  },
  {
    title: "Gaya Pilgrimage",
    duration: "3 Days, 2 Nights",
    description: "Participate in Pind Daan rituals and explore the site where Gautama Buddha attained enlightenment."
  },
  {
    title: "Chitrakoot Pilgrimage",
    duration: "2 Days, 1 Night",
    description: "Explore the land of rich spirituality and natural beauty, believed to be where Lord Rama, Sita, and Lakshman spent their exile."
  }
];

const PackageCard: React.FC<{ pkg: PackageCardType; index: number }> = ({ pkg, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for the gradient effect inside the card
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      requestAnimationFrame(() => {
        cardRef.current!.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current!.style.setProperty('--mouse-y', `${y}px`);
      });
    }
  }, []);

  // Intersection Observer to add the 'visible' class when the card scrolls into view
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.classList.add("visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ '--animation-order': index } as React.CSSProperties}
      className={`package-card-wrapper`}
      onMouseMove={handleMouseMove}
    >
      <div className="package-card-inner">
        <div className="package-content">
          <div className="flex flex-col gap-4">
            <span className="package-badge">
              {pkg.duration}
            </span>
            <h3 className="text-xl font-semibold text-gray-800">
              {pkg.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {pkg.description}
            </p>
          </div>
          <Link
            href="/contact-us"
            className="package-cta group mt-6"
          >
            <span>View Details</span>
            <svg
              className="w-4 h-4 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

function Packages() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-gold text-sm font-medium tracking-wider mb-3 block">
            SACRED JOURNEYS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Packages
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gold/30 rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg">
            Discover our carefully curated spiritual journeys across sacred destinations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;