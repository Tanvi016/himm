import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';

interface DoodleProps {
  type: 'heart' | 'star';
  className?: string;
}

const Doodle: React.FC<DoodleProps> = ({ type, className }) => {
  const [isSparkling, setIsSparkling] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = () => {
    if (isSparkling) return;
    setIsSparkling(true);
    
    // Create random sparkle positions
    const newSparkles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setIsSparkling(false);
      setSparkles([]);
    }, 5000);
  };

  return (
    <div className={`relative cursor-pointer ${className}`} onClick={handleClick}>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="text-gold opacity-60 hover:opacity-100 transition-opacity"
      >
        {type === 'heart' ? <FaHeart size={24} /> : <FaStar size={24} />}
      </motion.div>

      <AnimatePresence>
        {isSparkling && sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0.5], 
              x: sparkle.x, 
              y: sparkle.y 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut" 
            }}
            className="absolute top-0 left-0 text-rose"
          >
            <FaHeart size={12} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Doodle;
