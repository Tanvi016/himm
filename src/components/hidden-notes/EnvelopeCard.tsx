import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { randomRotation } from '../../utils/randomRotation';
import ScratchToReveal from '../shared/ScratchToReveal';

interface Note {
  id: number;
  title: string;
  content: string;
  isScratch?: boolean;
}

interface EnvelopeCardProps {
  note: Note;
  index: number;
}

const EnvelopeCard: React.FC<EnvelopeCardProps> = ({ note, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = randomRotation(4);
  const colorClass = index % 2 === 0 ? 'bg-[#FCF5F3]' : 'bg-[#FAF7F2]';

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, rotate: parseFloat(rotation) - 2, zIndex: 10 }}
        style={{ rotate: `${rotation}deg` }}
        onClick={() => setIsOpen(true)}
        className={`w-64 h-48 md:w-72 md:h-56 ${colorClass} rounded-lg shadow-paper border border-[#EADBC8] relative cursor-pointer group flex flex-col items-center justify-end overflow-hidden transition-shadow hover:shadow-xl`}
      >
        {/* Envelope Fold Lines Construction */}
        <div className="absolute inset-0 pointer-events-none rounded-lg opacity-80">
           {/* Bottom Fold Triangle */}
           <div className="absolute bottom-0 left-0 border-b-[112px] border-b-[#EADBC8]/20 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent w-full" />
           {/* Top Flap Overlay */}
           <div className="absolute top-0 left-0 w-full h-[55%] bg-[#F5EBE1] border-b border-brown/5 shadow-sm transform origin-top transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-rotate-x-[20deg]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
        </div>
        
        {/* Title handwritten on the front */}
        <div className="z-10 p-6 text-center w-full bg-white/10 backdrop-blur-[1px] mb-2 rounded-lg">
          <p className="font-handwritten text-2xl lg:text-3xl text-brown opacity-90 leading-tight">
            {note.title}
          </p>
        </div>
      </motion.div>

      {/* Note Modal Reader */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark-text/40 backdrop-blur-[2px] cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#FDFBF7] p-12 md:p-16 shadow-2xl rounded-sm paper-edge"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
            >
              {/* Fake Sticker Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-5 -right-5 w-14 h-14 bg-rose text-white rounded-full font-bold shadow-[0_4px_10px_rgba(217,182,176,0.6)] hover:bg-[#cf9e96] hover:scale-110 transition-all flex items-center justify-center text-xl z-20"
                style={{ transform: 'rotate(10deg)' }}
              >
                ✕
              </button>

              <h3 className="font-handwritten text-4xl lg:text-5xl text-[#8B6B61] mb-10 text-center border-b border-brown/10 pb-4">{note.title}</h3>
              
              {note.isScratch ? (
                <div className="w-full h-full min-h-[250px] relative border border-[#EADBC8] rounded-xl overflow-hidden shadow-inner">
                  <ScratchToReveal>
                    <div className="text-2xl leading-relaxed text-[#4A3F3A]/90 font-handwritten whitespace-pre-wrap px-2 text-center h-full flex flex-col justify-center">
                      {note.content}
                    </div>
                  </ScratchToReveal>
                </div>
              ) : (
                <div className="text-2xl leading-relaxed text-[#4A3F3A]/90 font-handwritten whitespace-pre-wrap px-2">
                  {note.content}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnvelopeCard;
