import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Gravity, MatterBody } from 'Components/UI/Gravity';
import PrimaryButton from 'Components/UI/Buttons/PrimaryButton';

const features = [
  {
    title: 'Spiritual Guidance',
    color: '#ffdcdc',
    mantra: 'Om Namah Shivaya',
  },
  {
    title: 'Sacred Rituals',
    color: '#dcefff',
    mantra: 'Om Gan Ganapataye',
  },
  {
    title: 'Temple Tours',
    color: '#f9dcff',
    mantra: 'Har Har Mahadev',
  },
  {
    title: 'Pilgrimage Services',
    color: '#feffdc',
    mantra: 'Om Namo Narayana',
  },
  {
    title: 'Divine Experience',
    color: '#dcffde',
    mantra: 'Om Shanti Shanti',
  }
];

// Update sounds object to only include bell sound
const sounds: { [key: string]: HTMLAudioElement | null } = {
  bell: null,
};

// Memoized GlowLayer component to handle mouse interactions
const GlowLayer = memo(({ onMouseMove }: { onMouseMove: (e: React.MouseEvent) => void }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [intensity, setIntensity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
    setIntensity(Math.min(1, Math.max(0, 1 - Math.hypot(x/100 - 0.5, y/100 - 0.5))));
    onMouseMove(e);
  };

  return (
    <motion.div 
      className="absolute inset-0 rounded-2xl pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(198, 169, 98, ${intensity * 0.2}), transparent)`,
      }}
    />
  );
});

GlowLayer.displayName = 'GlowLayer';

// Memoized GravityContent to prevent unnecessary re-renders
const GravityContent = memo(({ onInteraction }: { onInteraction: (mantra: string) => void }) => {
  const controls = useAnimation();
  return (
    <Gravity gravity={{ x: 0, y: 0.3 }} className="w-full h-full" debug={false}>
      <MatterBody
        x="50%"
        y="10%"
        matterBodyOptions={{ friction: 0.5, restitution: 0.4 }}
      >
        <motion.div 
          className="text-lg md:text-xl text-gray-700 bg-white/90 rounded-2xl p-8 max-w-lg border-2 border-gold/20 backdrop-blur-lg relative group shadow-sm"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 40px rgba(198, 169, 98, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.95)"
          }}
          animate={controls}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="font-serif italic text-lg font-medium text-gold/90">✨ Welcome to Varanasi</span>
          <p className="mt-2 text-sm">Experience the mystical journey through the spiritual capital of India. 
          Let us guide you through ancient temples, sacred ghats, and timeless traditions.</p>
        </motion.div>
      </MatterBody>

      {features.map((feature, index) => (
        <MatterBody
          key={index}
          x={`${15 + (index * 18)}%`}
          y={`${30 + (index * 12)}%`}
          matterBodyOptions={{ 
            friction: 0.5, 
            restitution: 0.6, 
            density: 0.001,
          }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(198, 169, 98, 0.5)",
            }}
            onClick={() => onInteraction(feature.mantra)}
            className="relative px-6 py-3 rounded-full text-white cursor-grab active:cursor-grabbing backdrop-blur-sm font-medium group overflow-hidden"
            style={{ backgroundColor: feature.color }}
          >
            <span className="relative z-10 text-gray-700">{feature.title}</span>
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center"
              initial={false}
              whileHover={{ 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            >
              <span className="text-xs text-black">{feature.mantra}</span>
            </motion.div>
          </motion.div>
        </MatterBody>
      ))}
    </Gravity>
  );
});

GravityContent.displayName = 'GravityContent';

const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isClient, setIsClient] = useState(false);

  // Initialize audio on client-side only
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      sounds.bell = new Audio('/Sounds/bell.mp3');
    }

    return () => {
      if (sounds.bell) {
        sounds.bell.pause();
        sounds.bell.currentTime = 0;
      }
    };
  }, []);

  const playBellSound = () => {
    if (sounds.bell && isClient) {
      sounds.bell.currentTime = 0; // Reset sound to start
      sounds.bell.play().catch((err: Error) => console.log('Audio play failed:', err));
    }
  };

  // Update handleFeatureInteraction to play bell sound
  const handleFeatureInteraction = async (_mantra: string) => {
    playBellSound();
    
    await controls.start({
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
      transition: { duration: 0.5 }
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative min-h-screen"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Gravity Component as Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative h-full">
          <GravityContent onInteraction={handleFeatureInteraction} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-wider mb-3 block">
            ABOUT US
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Your Spiritual Companion in Kashi
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-gold/30 rounded-full mb-6" />
        </motion.div>

        {/* Centered Content Section */}
        <div className="max-w-2xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 rounded-2xl p-8 border border-gold/10 backdrop-blur-xl"
          >
            <p className="text-base text-gray-600 leading-relaxed">
              At Kashi Mitra Tours, we transform your pilgrimage into a soulful experience, 
              connecting you with divine energy and centuries-old traditions. Our deep-rooted 
              understanding of Varanasi's spiritual heritage ensures an authentic and 
              meaningful journey through this sacred city.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <PrimaryButton className='inline-flex items-center' variant="gradient" icon={true}>
                Learn More
            </PrimaryButton>
          </motion.div>
        </div>

        {/* Audio control button - Changed to bell icon */}
        {isClient && (
          <motion.button
            onClick={playBellSound}
            className="fixed bottom-4 h-12 w-12 right-4 p-3 rounded-full bg-gold/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔔
          </motion.button>
        )}
      </div>

      <style jsx global>{`
        @keyframes float-om {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(-50px) rotate(180deg) scale(1.5); opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg) scale(0.5); opacity: 0; }
        }
        .animate-float-om {
          animation: float-om 2s ease-out forwards;
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float 2s ease-out forwards;
        }
        @keyframes shine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;