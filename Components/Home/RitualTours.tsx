"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MapPin, Clock, ChevronRight } from "lucide-react";
import PrimaryButton from "Components/UI/Buttons/PrimaryButton";

interface Tour {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  duration: string;
  highlights: string[];
}

const TOURS_DATA: Tour[] = [
  {
    title: "Ritual Tours Pind Daan",
    description:
      "Honor your ancestors with our sacred Pind Daan rituals. Experience the traditional ceremonies performed by expert priests in sacred locations.",
    imageUrl:
      "https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Varanasi, India",
    duration: "2-3 days",
    highlights: [
      "Expert Priests",
      "Traditional Ceremonies",
      "Sacred Locations",
    ],
  },
  {
    title: "Tarpana",
    description:
      "Offer sacred water to ancestors in our Tarpana ceremonies. Join us in this profound ritual of gratitude and remembrance.",
    imageUrl:
      "https://images.unsplash.com/photo-1617860931879-19d32ec9912d?q=80&w=3120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Rishikesh, India",
    duration: "1 day",
    highlights: [
      "Sacred Water Offering",
      "Guided Ceremony",
      "Peaceful Environment",
    ],
  },
  {
    title: "Asthi Visarjana",
    description:
      "Honor and release your loved ones' remains into holy rivers. A serene and meaningful ceremony guided by experienced priests.",
    imageUrl:
      "https://images.unsplash.com/photo-1641107699881-faab3a70b6fc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Haridwar, India",
    duration: "2 days",
    highlights: ["Respectful Ceremony", "Holy River", "Traditional Rituals"],
  },
  {
    title: "Upnayana Sanskar",
    description:
      "Celebrate the sacred thread ceremony with traditional rituals. A transformative experience marking spiritual awakening.",
    imageUrl:
      "https://images.unsplash.com/photo-1651560638193-5e6d7fafc6cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Vrindavan, India",
    duration: "3 days",
    highlights: ["Sacred Thread", "Ancient Traditions", "Spiritual Guidance"],
  },
  {
    title: "Hindu Vedic Wedding",
    description:
      "Experience a traditional Vedic wedding filled with sacred mantras and ancient customs in breathtaking locations.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1697729844084-c03db2377161?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Udaipur, India",
    duration: "3-4 days",
    highlights: ["Sacred Mantras", "Traditional Customs", "Majestic Venues"],
  },
];

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`px-4 py-2 bg-yellow-100/80 backdrop-blur-xl text-yellow-700 rounded-full text-sm font-medium tracking-wide shadow-lg ${className}`}
  >
    {children}
  </motion.span>
);

interface HighlightProps {
  text: string;
  index: number;
}

const Highlight: React.FC<HighlightProps> = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex items-center space-x-2"
  >
    <motion.div
      className="w-2 h-2 rounded-full bg-yellow-400"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
    />
    <span className="text-gray-300 text-sm font-medium">{text}</span>
  </motion.div>
);

interface ParallaxCardProps {
  tour: Tour;
  index: number;
}

// Add a reusable fadeIn variant for a smoother, one‑time reveal.
const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

const ParallaxCard: React.FC<ParallaxCardProps> = ({ tour, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Minimal spring config for card
  const cardSpringConfig = {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  };

  // Enhanced spring config for image
  const imageSpringConfig = {
    stiffness: 35,
    damping: 25,
    mass: 1,
    restSpeed: 0.001,
  };

  // Reduced card effects
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]),
    cardSpringConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]),
    cardSpringConfig
  );

  // Enhanced image parallax effects
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], [150, -150]),
    imageSpringConfig
  );

  const imageScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.15, 1.2]),
    imageSpringConfig
  );

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInVariant}
      initial="hidden"
      whileInView="visible"
      custom={0}
      viewport={{ once: true, margin: "-100px" }}
      className="relative min-h-[600px] w-full"
    >
      <motion.div
        style={{ scale, opacity }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-[600px] w-full rounded-3xl overflow-hidden bg-white backdrop-blur-sm"
      >
        <motion.div
          ref={imageRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center transform-gpu will-change-transform rounded-3xl"
          style={{
            backgroundImage: `url(${tour.imageUrl})`,
            y: imageY,
            scale: imageScale,
            borderRadius: "inherit",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent rounded-3xl"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.8, 0.7, 0.8]
            ),
          }}
        />

        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          custom={0.3}
          viewport={{ once: true }}
          className="absolute bottom-0 p-8 md:p-10 text-white w-full"
        >
          <div className="max-w-3xl space-y-6">
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              viewport={{ once: true }}
            >
              <Badge className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span>{tour.location}</span>
              </Badge>
              <Badge className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span>{tour.duration}</span>
              </Badge>
            </motion.div>

            <motion.h3
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              custom={0.3}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              {tour.title}
            </motion.h3>

            <motion.p
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              custom={0.4}
              viewport={{ once: true }}
              className="text-base text-gray-300 leading-relaxed font-medium max-w-2xl"
            >
              {tour.description}
            </motion.p>

            <motion.div
              className="space-y-3"
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              custom={0.5}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-yellow-300">
                Experience Highlights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tour.highlights.map((highlight, idx) => (
                  <Highlight key={idx} text={highlight} index={idx} />
                ))}
              </div>
            </motion.div>
            <PrimaryButton variant="gradient">Book This Experience</PrimaryButton>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const RitualTours: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="text-gold text-sm font-medium tracking-wider mb-3 block">
            SACRED JOURNEYS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Sacred Ritual Tours
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gold/30 rounded-full mb-6"></div>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            Experience ancient traditions and spiritual ceremonies in India's
            most sacred locations with our expert guides.
          </p>
        </motion.div>
        <div className="space-y-24 md:space-y-32">
          {TOURS_DATA.map((tour, index) => (
            <ParallaxCard key={tour.title} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RitualTours;
