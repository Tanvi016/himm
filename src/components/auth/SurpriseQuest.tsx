import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurpriseQuestProps {
  onComplete: () => void;
}

const SurpriseQuest: React.FC<SurpriseQuestProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ top: '60%', left: '55%' });

  const moveNoButton = useCallback(() => {
    // Generate random positions between 10% and 90%
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  }, []);

  const steps = [
    {
      question: "do u love meeee??🥺",
      giphy: "https://media1.tenor.com/m/qljmSb0nfXsAAAAC/kiss.gif", 
    },
    {
      question: "do u want to see the surprise😏",
      giphy: "https://media1.tenor.com/m/BL5tn4o1DTQAAAAC/tease-couple.gif",
    },
    {
      question: "anywayss, be ready!!",
      giphy: "https://media1.tenor.com/m/CphtLU7B4uUAAAAC/haha-playing.gif",
      isFinal: true
    }
  ];

  useEffect(() => {
    let timer: any;
    if (step === 2) {
      timer = setTimeout(() => {
        onComplete();
      }, 3500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 text-center overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #FDECEE 0%, #FDF2F4 100%)' }}>
      
      <AnimatePresence mode="wait">
        <motion.div
           key={step}
           initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
           transition={{ type: "spring", damping: 12 }}
           className="relative flex flex-col items-center gap-8 max-w-sm w-full"
        >
           {/* Sticker / Giphy */}
           <div className="w-48 h-48 md:w-56 md:h-56 relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover:bg-rose/10 transition-colors" />
              <img 
                src={steps[step].giphy} 
                alt="Cat Sticker" 
                className="w-full h-full object-contain relative z-10 drop-shadow-lg"
              />
           </div>

           <h2 className="font-handwritten text-4xl md:text-5xl text-[#8B6B61] leading-tight px-4 drop-shadow-sm">
             {steps[step].question}
           </h2>

           {!steps[step].isFinal && (
             <div className="flex gap-10 mt-4 relative w-full justify-center min-h-[60px]">
                {/* YES BUTTON */}
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="px-10 py-3 bg-red-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:scale-110 active:scale-95 transition-transform z-20"
                >
                  Yes
                </button>

                {/* RUNNING NO BUTTON */}
                <motion.button
                  style={{ position: 'fixed', top: noButtonPos.top, left: noButtonPos.left }}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  whileHover={{ scale: 1.1 }}
                  className="px-10 py-3 bg-gray-200 text-gray-500 rounded-2xl font-bold text-xl cursor-not-allowed select-none transition-shadow z-[2000]"
                >
                  No
                </motion.button>
             </div>
           )}

           {steps[step].isFinal && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="text-rose font-clean text-xs uppercase tracking-[0.3em] font-bold mt-4"
             >
               Opening your scrapbook...
             </motion.div>
           )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
         {[...Array(10)].map((_, i) => (
           <motion.span
             key={i}
             className="absolute"
             style={{ 
               left: `${Math.random() * 100}%`, 
               top: `${Math.random() * 100}%`,
               fontSize: `${Math.random() * 20 + 10}px`
             }}
             animate={{ 
               y: [0, -100], 
               opacity: [0, 1, 0],
               rotate: [0, 360]
             }}
             transition={{ 
               duration: Math.random() * 5 + 5, 
               repeat: Infinity,
               delay: Math.random() * 5
             }}
           >
             ♥
           </motion.span>
         ))}
      </div>
    </div>
  );
};

export default SurpriseQuest;
