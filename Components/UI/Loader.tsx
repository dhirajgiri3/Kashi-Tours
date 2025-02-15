"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  color?: string;
}

const Loader = ({ size = "md", text, color = "primary" }: LoaderProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const getColor = (opacity = 1) => 
    color === 'primary' ? `rgba(218, 165, 32, ${opacity})` : color;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <motion.div 
          className={`${sizes[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <svg 
            viewBox="25 25 50 50"
            className="w-full h-full"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              style={{
                stroke: getColor(1),
                strokeWidth: "2",
                strokeLinecap: "round",
              }}
              initial={{ pathLength: 0, strokeDasharray: "1, 200" }}
              animate={{
                pathLength: [0, 0.5, 1],
                strokeDasharray: ["1, 200", "90, 200", "90, 200"],
                strokeDashoffset: [0, -35, -125],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Enhanced Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-lg"
            style={{
              background: `radial-gradient(circle, ${getColor(0.4)} 0%, transparent 70%)`,
            }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {text && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6"
        >
          <motion.p
            className={`
              font-medium tracking-wider text-center
              ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}
            `}
            style={{ color: getColor(0.9) }}
          >
            <motion.span
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {text}
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default Loader;
