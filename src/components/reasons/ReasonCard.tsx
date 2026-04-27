import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { randomRotation } from '../../utils/randomRotation';
import Doodle from '../shared/Doodle';

interface ReasonCardProps {
  text: string;
  index: number;
}

const SmallSpiralBind = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 w-6 flex flex-col justify-evenly py-6 -translate-x-4 z-40 pointer-events-none">
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className="relative w-full h-4 flex items-center">
          {/* Hole cut */}
          <div className="w-[10px] h-[10px] md:w-3 md:h-3 rounded-full bg-cream shadow-inner absolute left-1" style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.5)' }} />
          {/* Metal Wire */}
          <div className="w-6 h-[2.5px] bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 rounded-full absolute -left-1 transform -rotate-[14deg] shadow-[0_1px_2px_rgba(0,0,0,0.3)] border-t border-white/40" />
        </div>
      ))}
    </div>
  );
};

const CardDesign = ({ text, index, isModal }: { text: string, index: number, isModal: boolean }) => {
  return (
    <div className="w-full h-full bg-[#FCFBF8] shadow-paper p-4 pl-8 md:p-6 md:pl-10 relative flex flex-col items-center justify-center rounded-r-md"
         style={{ filter: 'drop-shadow(2px 4px 8px rgba(139,107,97,0.1))' }}>
      
      <SmallSpiralBind />
      
      {/* Dynamic Torn Edge CSS Pattern on the Right Side */}
      <div className="absolute top-0 bottom-0 right-0 w-2 pointer-events-none" 
           style={{ 
             clipPath: 'polygon(100% 0, 0 0, 50% 5%, 0 10%, 50% 15%, 0 20%, 50% 25%, 0 30%, 50% 35%, 0 40%, 50% 45%, 0 50%, 50% 55%, 0 60%, 50% 65%, 0 70%, 50% 75%, 0 80%, 50% 85%, 0 90%, 50% 95%, 0 100%, 100% 100%)',
             backgroundColor: 'rgba(139,107,97,0.06)'
           }} />

      {/* Faint Graph Texture overlay mimicking notebook paper */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

      {isModal ? (
         // REVEALED CONTENT (Detailed Notebook Page)
         <div className="w-full h-full flex flex-col relative pt-4">
            <span className="absolute top-0 left-0 text-[10px] md:text-xs font-mono text-[#8B6B61]/40 border-b border-[#8B6B61]/10 pb-1 px-4 tracking-widest w-full text-left">
              Reason No. {index}
            </span>
            <div className="flex-1 flex items-center justify-center px-4 md:px-8 mt-6">
              <p className="font-handwritten text-2xl sm:text-3xl lg:text-4xl text-rose text-center leading-snug">
                {text}
              </p>
            </div>
            {/* Soft decorative doodle injected blindly to make it feel rich */}
            <Doodle type={index % 2 === 0 ? "star" : "heart"} className="absolute bottom-4 right-4 text-rose opacity-10 scale-150 rotate-12" />
         </div>
      ) : (
         // UNREVEALED COVER (Closed state)
         <div className="flex items-center justify-center w-full h-full border border-brown/5 bg-[#FAF7F2] rounded-sm m-2 shadow-inner">
            <div className="flex flex-col items-center justify-center -rotate-3 overflow-visible pointer-events-none group-hover:scale-105 transition-transform">
               <span className="font-clean text-[10px] md:text-sm uppercase tracking-widest text-[#8B6B61]/50 mb-1 border-b border-[#8B6B61]/20 pb-1">
                 Reason
               </span>
               <span className="font-handwritten text-4xl sm:text-5xl md:text-6xl text-rose font-bold">
                 #{index}
               </span>
            </div>
            <Doodle type="star" className="absolute top-4 right-4 opacity-10 scale-50" />
            <Doodle type="heart" className="absolute bottom-6 left-2 opacity-10 scale-[0.6] rotate-[-15deg] text-rose" />
         </div>
      )}
    </div>
  );
};

const ReasonCard: React.FC<ReasonCardProps> = ({ text, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = randomRotation(5);

  return (
    <>
      <motion.div
        layoutId={`reason-card-${index}`}
        whileHover={{ scale: 1.05, y: -5, zIndex: 20 }}
        onClick={() => setIsOpen(true)}
        className="w-full aspect-[4/5] relative cursor-pointer group"
        style={{ rotate: `${rotation}deg` }}
      >
        <CardDesign text={text} index={index} isModal={false} />
        
        {/* Soft hint bubble on desktop */}
        <div className="absolute -bottom-6 right-0 scale-75 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1 z-30">
           <span className="text-[10px] uppercase font-bold text-rose/70 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm shadow-[0_2px_4px_rgba(217,182,176,0.3)] whitespace-nowrap">Click to unlock</span>
        </div>
      </motion.div>

      {/* Note Reader Modal expanding the exact geometric shape to full size */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#4A3F3A]/40 backdrop-blur-[3px] cursor-pointer"
            />
            
            <motion.div
              layoutId={`reason-card-${index}`}
              className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-sm md:max-w-[400px] bg-transparent z-10 flex items-center justify-center p-4"
            >
              {/* Sticker Close Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute -top-6 -right-6 w-14 h-14 bg-rose text-white rounded-full font-bold shadow-[0_4px_12px_rgba(217,182,176,0.6)] hover:bg-[#cf9e96] hover:scale-110 transition-all flex items-center justify-center text-xl z-50 transform rotate-12"
              >
                ✕
              </button>
              
              {/* Massive scaled version of the revealed content shape */}
              <div className="w-full h-full origin-center relative">
                 <CardDesign text={text} index={index} isModal={true} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReasonCard;
