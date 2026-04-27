import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const FloatingHeartsBackground: React.FC = () => {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    // Generate hearts that span the entire document height
    const generatedHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // Initial percentage of the viewport 
      size: Math.random() * 20 + 10,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ top: '110vh', left: `${heart.x}vw`, opacity: 0 }}
          animate={{ 
            top: '-10vh', 
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: heart.duration, 
            delay: heart.delay, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-red-500/30" // Red hearts covering page
        >
          <FaHeart size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHeartsBackground;
