import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaSmile, FaTicketAlt, FaGamepad } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface EasterEggProps {
  icon: 'heart' | 'star' | 'smile' | 'ticket' | 'gamepad' | 'glow';
  title?: string;
  message: string;
  photoId?: string; // Opaque media ID to pass through our gated API
  className?: string; // Positioning tailwind classes
  requiredTaps?: number; // How many taps to unlock
}

const ICONS = {
  heart: FaHeart,
  star: FaStar,
  smile: FaSmile,
  ticket: FaTicketAlt,
  gamepad: FaGamepad
};

const EasterEgg: React.FC<EasterEggProps> = ({ icon, title, message, photoId, className, requiredTaps = 3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taps, setTaps] = useState(0);
  const { mediaUrl } = useAuth();
  
  const IconComponent = icon !== 'glow' ? ICONS[icon as keyof typeof ICONS] : null;

  const handleTap = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);
    
    if (newTaps >= requiredTaps) {
       setIsOpen(true);
       setTaps(0);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className={`absolute cursor-pointer transition-all z-[50] ${className}`}
        title="Find me!"
      >
        {icon === 'glow' ? (
           <div className="w-12 h-12 rounded-full bg-rose animate-pulse cursor-pointer shadow-[0_0_30px_15px_rgba(217,182,176,0.9)] border-2 border-white/50 relative">
               <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px]" />
           </div>
        ) : (
           IconComponent && <IconComponent size={40} className="drop-shadow-lg" />
        )}
      </motion.div>

      {/* The Secret Reveal Modal */}
      <AnimatePresence>
        {isOpen && (
           <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-[#08060d]/50 backdrop-blur-[3px] cursor-pointer"
             />
             
             <motion.div
               initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -3 }}
               animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
               exit={{ opacity: 0, scale: 0.8, y: 50, rotate: 3 }}
               transition={{ type: "spring", damping: 20 }}
               className="relative max-w-sm w-full bg-[#FDFBF7] p-8 md:p-10 shadow-2xl rounded-sm paper-edge flex flex-col items-center text-center"
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
             >
                <div className="absolute -top-6 -right-5 text-5xl text-rose animate-bounce drop-shadow-lg z-20">
                  {IconComponent ? <IconComponent /> : <FaHeart />}
                </div>
                
                <p className="font-clean text-xs uppercase tracking-widest text-[#8B6B61]/60 mb-6 font-bold">You found a secret!</p>
                
                {/* Resolve photo ID if provided via gated media function */}
                {photoId && (
                  <div className="w-full relative bg-[#FAF7F2] p-3 mb-6 rounded-sm shadow-paper rotate-2">
                     {/* Sticky Tape Graphic */}
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 shadow-sm transform -rotate-1 z-10" />
                     <img src={mediaUrl(photoId)} alt="Secret memory" className="w-full aspect-square object-cover max-w-[200px] mx-auto transition-all duration-700" />
                  </div>
                )}
                
                {title && <h3 className="font-handwritten text-4xl text-[#8B6B61] mb-2">{title}</h3>}
                
                <p className="text-2xl leading-relaxed text-[#4A3F3A] font-handwritten whitespace-pre-wrap">
                  {message}
                </p>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-8 px-6 py-2 bg-rose/20 text-[#8B6B61] hover:text-red-500 rounded-full font-clean text-xs uppercase tracking-widest transition-colors font-bold"
                >
                  Keep the secret
                </button>
             </motion.div>
           </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEgg;
