"use client";

import { useRef, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export const WorldMap = memo(function WorldMap({
  dots = [],
  lineColor = "#DAA520",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  const svgMap = useMemo(() => {
    // Reduced height and radius for a simpler, faster-rendering SVG
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.15, // lowered radius for reduced complexity
      color: theme === 'dark' ? "#ffffff20" : "#00000020",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [theme]);

  const defaultDots = [
    { 
      start: { lat: 25.3176, lng: 82.9739, label: "Varanasi" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" }
    },
  ];

  const mapDots = dots.length > 0 ? dots : defaultDots;

  const projectPoint = (lat: number, lng: number) => {
    const normalizedLng = ((lng + 180) % 360) - 180;
    const x = ((normalizedLng + 180) * 800) / 360;
    const y = ((90 - lat) * 400) / 180;
    return { x, y };
  };

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - Math.abs(end.x - start.x) * 0.15;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.5, duration: 2.5, ease: "easeInOut" },
        opacity: { delay: i * 0.5, duration: 0.8 }
      }
    })
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.8,
        ease: "backOut"
      }
    })
  };

  const rippleVariants = {
    animate: {
      scale: [1, 3],
      opacity: [0.5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  const labelVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5 + 0.3,
        duration: 0.5
      }
    })
  };

  return (
    <div className="w-full aspect-[2/1] rounded-xl relative font-sans overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-50/5 to-transparent" />
      
      {/* Map Base */}
      <div className="absolute inset-0 transition-transform duration-700 hover:scale-105">
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full pointer-events-none select-none transition-opacity duration-300"
          alt="world map"
          height="495"
          width="1056"
          priority={true}
          draggable={false}
        />
      </div>

      {/* SVG Overlay */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="1">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <AnimatePresence>
          {mapDots.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
            return (
              <g key={`path-group-${i}`}>
                <motion.path
                  d={createCurvedPath(startPoint, endPoint)}
                  stroke="url(#path-gradient)"
                  strokeWidth="2"
                  fill="none"
                  variants={pathVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />

                {/* Points and Labels */}
                {[
                  { point: startPoint, label: dot.start.label },
                  { point: endPoint, label: dot.end.label }
                ].map((location, j) => (
                  <g key={`location-${i}-${j}`}>
                    <motion.circle
                      cx={location.point.x}
                      cy={location.point.y}
                      r="4"
                      fill={lineColor}
                      variants={dotVariants}
                      custom={i}
                      initial="initial"
                      animate="animate"
                    />
                    <motion.circle
                      cx={location.point.x}
                      cy={location.point.y}
                      r="4"
                      fill={lineColor}
                      variants={rippleVariants}
                      animate="animate"
                      style={{ opacity: 0.3 }}
                    />
                    {location.label && (
                      <motion.text
                        x={location.point.x}
                        y={location.point.y - 10}
                        textAnchor="middle"
                        fill={lineColor}
                        variants={labelVariants}
                        custom={i}
                        initial="initial"
                        animate="animate"
                        className="text-[7px] font-semibold"
                      >
                        {location.label}
                      </motion.text>
                    )}
                  </g>
                ))}
              </g>
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent opacity-0 hover:opacity-100 transition-all duration-700 ease-in-out" />
    </div>
  );
});
