"use client";
import { WorldMap } from "./WorldMap";
import { motion } from "framer-motion";

export function WorldMapDemo() {
  return (
    <div className="py-40 dark:bg-black/90 bg-white/90 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary-dark via-primary to-primary-light text-transparent bg-clip-text">
            Global Connections
          </h2>
          <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Experience the world through our extensive network of travel destinations.
            Join thousands of adventurers exploring the beauty of diverse cultures and landscapes.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-16 max-w-7xl mx-auto px-4"
      >
        <div className="backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-xl p-4 shadow-xl">
          <WorldMap
            dots={[
              {
                start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                end: { lat: 27.7172, lng: 85.3240 }, // Kathmandu
              },
              {
                start: { lat: 27.7172, lng: 85.3240 }, // Kathmandu
                end: { lat: 28.6139, lng: 77.2090 }, // Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.2090 }, // Delhi
                end: { lat: 25.2048, lng: 55.2708 }, // Dubai
              },
              {
                start: { lat: 25.2048, lng: 55.2708 }, // Dubai
                end: { lat: 51.5074, lng: -0.1278 }, // London
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 40.7128, lng: -74.0060 }, // New York
              },
            ]}
          />
        </div>
      </motion.div>
    </div>
  );
}
