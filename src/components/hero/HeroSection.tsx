import React from 'react';
import { motion } from 'framer-motion';
import EasterEgg from '../shared/EasterEgg';
import { useAuth } from '../../context/AuthContext';

const HeroSection: React.FC = () => {
  const { mediaUrl } = useAuth();
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 mb-20 md:mb-32 z-10 pt-20">
      
      <EasterEgg 
        icon="heart"
        className="-top-10 -left-6 md:top-10 md:left-20 text-rose scale-150 rotate-[20deg]"
        title="P.S."
        message="I love you more than words can say. Stop tapping randomly! 😝"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Large centered photo */}
        <div className="w-[80vw] max-w-lg aspect-[4/5] bg-beige/20 p-4 pb-16 scrapbook-card shadow-soft rotate-1 mb-8 relative group">
          <div className="w-full h-full bg-brown/10 rounded-sm overflow-hidden flex items-center justify-center relative">
            <img 
              src={mediaUrl("p1")} 
              alt="Birthday Special" 
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
            />
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>
          {/* Subtle handwriting on the card */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center">
            <p className="font-handwritten text-brown/60 text-xl italic">The most special day... ♥</p>
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 font-handwritten text-brown leading-[0.9] md:leading-[0.8] tracking-tight text-center">
          Happy Birthday
        </h1>
        
        <span className="font-clean text-sm md:text-xl text-dark-text/70 uppercase tracking-[0.2em] text-center px-4">
          To My Favorite Person
        </span>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 text-brown/40 flex flex-col items-center gap-2"
      >
        <p className="text-xs uppercase tracking-widest">Scroll to explore our memories</p>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-16 bg-brown/20"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
