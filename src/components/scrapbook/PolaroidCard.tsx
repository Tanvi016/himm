import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tape from '../shared/Tape';
import { randomRotation } from '../../utils/randomRotation';
import Doodle from '../shared/Doodle';
import { useAuth } from '../../context/AuthContext';

interface MemoryClusterProps {
  photoId: string;  // opaque ID resolved via mediaUrl()
  caption: string;
  date: string;
  index: number;
  alignment: 'left' | 'right';
  objectFit?: 'cover' | 'contain';
}

const DateLabel = ({ date, rotation }: { date: string, rotation: string }) => (
  <div
    className="absolute -bottom-2 -right-4 md:-right-8 bg-brown text-cream px-3 py-1 lg:px-4 lg:py-1.5 shadow-md border border-brown z-20 hover:scale-110 transition-transform"
    style={{ rotate: `${rotation}deg`, clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
  >
    <span className="font-clean text-[10px] lg:text-[12px] uppercase tracking-widest font-bold block">{date}</span>
  </div>
);

const MemoryCluster: React.FC<MemoryClusterProps> = ({ photoId, caption, date, index, alignment, objectFit = 'cover' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mediaUrl } = useAuth();
  const url = mediaUrl(photoId);

  // Dynamic variables mimicking clustered physical nature
  const cardRotation = randomRotation(6);
  const dateRotation = randomRotation(15);
  const doodleType = index % 2 === 0 ? "heart" : "star";

  return (
    <>
      <motion.div
        layoutId={`memory-${index}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, rotate: parseFloat(cardRotation) > 0 ? parseFloat(cardRotation) + 2 : parseFloat(cardRotation) - 2, zIndex: 40, y: -5 }}
        style={{ rotate: `${cardRotation}deg` }}
        className="relative group cursor-pointer w-[80vw] max-w-[280px] md:max-w-[340px] z-10"
      >
        {/* The core Polaroid memory anchor */}
        <div className="w-full bg-cream p-3 sm:p-4 shadow-[0_10px_30px_rgba(139,107,97,0.2)] border border-rose/40 transition-shadow hover:shadow-2xl z-10 relative">
          <Tape position={alignment === 'left' ? 'top-left' : 'top-right'} />
          {index % 3 === 0 && <Tape position="bottom-right" />}

          <div className="aspect-[4/5] overflow-hidden bg-beige/10 flex items-center justify-center border border-brown/5 rounded-[2px] shadow-inner mb-4 sm:mb-6 pointer-events-none">
            <img
              src={url}
              alt={caption}
              className={`w-full h-full object-${objectFit} sepia-[0.1] contrast-[1.05]`}
            />
          </div>

          <div className="text-center px-2 py-4 sm:py-6 min-h-[80px] flex items-center justify-center">
            <p className="font-handwritten text-xl lg:text-3xl text-dark-text leading-tight opacity-90">
              {caption}
            </p>
          </div>
        </div>

        {/* Date Plaque / Label tucked underneath the polaroid */}
        <DateLabel date={date} rotation={dateRotation} />

        {/* Ambient Doodle clustered alongside */}
        <Doodle
          type={doodleType}
          className={`absolute ${alignment === 'left' ? '-left-6 md:-left-12' : '-right-6 md:-right-12'} top-1/4 opacity-40 scale-125 text-rose z-0 ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'}`}
        />
      </motion.div>

      {/* Modal View Sequence */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark-text/60 backdrop-blur-sm cursor-pointer z-0"
            />

            <motion.div
              layoutId={`memory-${index}`}
              className="relative w-full max-w-sm md:max-w-lg bg-cream p-6 md:p-8 shadow-2xl border border-rose/40 z-10 flex flex-col"
            >
              <Tape position="top-right" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-brown text-cream rounded-full font-bold shadow-lg hover:scale-110 transition-all flex items-center justify-center text-xl z-50 rotate-12"
              >
                ✕
              </button>

              <div className="w-full relative bg-beige/10 border border-brown/5 rounded-[2px] shadow-inner overflow-hidden mb-6 aspect-square max-h-[60vh]">
                <img
                  src={url}
                  alt={caption}
                  className={`w-full h-full object-${objectFit} sepia-[0.05] contrast-[1.05]`}
                />
              </div>

              <div className="text-center px-4 py-6 md:py-8 min-h-[100px] flex flex-col items-center justify-center">
                <p className="font-handwritten text-3xl md:text-5xl text-dark-text leading-tight">
                  {caption}
                </p>
                <span className="font-clean text-xs tracking-widest uppercase text-brown/40 block mt-4">{date}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MemoryCluster;
