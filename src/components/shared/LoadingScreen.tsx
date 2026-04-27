import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // 3.5 seconds of loading to show off the animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-cream overflow-hidden">
      {/* Spider-Man Spiraling */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Decorative background circle */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 border-4 border-rose/10 rounded-full"
        />
        
        <motion.div
          animate={{
            // Spiraling effect: Rotation + Circular Movement + Scale
            rotate: [0, 360, 720, 1080],
            x: [0, 80, 0, -80, 0],
            y: [-80, 0, 80, 0, -80],
            scale: [0.5, 1, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1]
          }}
          className="relative z-10"
        >
          {/* Using a placeholder path; USER should ensure spiderman.png is in src/assets/ */}
          <img 
            src="/src/assets/spiderman.png" 
            alt="Spider-Man" 
            className="w-32 h-32 object-contain drop-shadow-[0_10px_20px_rgba(217,182,176,0.5)]"
            onError={(e) => {
              // Fallback if image isn't found
              e.currentTarget.src = "https://www.svgrepo.com/show/475354/spiderman.svg";
            }}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h3 className="font-handwritten text-4xl text-brown mb-2">Getting things ready...</h3>
        <p className="font-clean text-xs uppercase tracking-[0.4em] text-rose/60">Loading your memories</p>
      </motion.div>

      {/* Background Hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose/20 text-3xl pointer-events-none"
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200, 
            opacity: 0 
          }}
          animate={{ 
            y: [null, -500], 
            opacity: [0, 1, 0],
            rotate: [0, 45]
          }}
          transition={{ 
            duration: 4 + Math.random() * 2, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingScreen;
