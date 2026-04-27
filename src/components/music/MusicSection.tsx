import React, { useState } from 'react';
import SongCard from './SongCard';
import Doodle from '../shared/Doodle';
import { songs } from '../../data/songs';
import { motion } from 'framer-motion';

export const MusicNoteDoodle = ({ className }: { className?: string }) => (
  <svg className={`absolute text-[#8B6B61]/30 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const MusicSection: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="soundtrack" className="py-32 relative z-10 px-4 md:px-12 max-w-full mx-auto min-h-[70vh] flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col items-center mb-16 md:mb-24 relative text-center w-full">
        <h2 className="text-5xl md:text-6xl mb-4 text-[#8B6B61] font-handwritten">Our Soundtrack</h2>
        <div className="w-32 h-[2px] bg-[#D9B6B0]/50 rounded-full" />
        
        <MusicNoteDoodle className="-top-6 right-[10%] md:right-1/4 opacity-40 scale-[1.3] pointer-events-none" />
        <Doodle type="star" className="absolute -bottom-10 left-[10%] md:left-[30%] opacity-30 scale-125 pointer-events-none" />
      </div>

      {/* Explicit Flex container mapping md:flex-row horizontally to definitively prevent one card dropping below the other two bounds */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative w-full items-center md:items-stretch justify-center max-w-[1200px] mx-auto px-4 md:px-0">
         
         <MusicNoteDoodle className="hidden md:block absolute top-[40%] left-[-2%] scale-[2] opacity-20 pointer-events-none rotate-[15deg]" />
         <Doodle type="heart" className="hidden lg:block absolute bottom-[10%] right-[-5%] scale-[1.5] opacity-20 pointer-events-none -rotate-12" />

        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full md:w-1/3 flex justify-center perspective-1000 max-w-[340px]"
          >
            <SongCard 
              song={song} 
              isPlaying={playingId === song.id}
              onToggle={() => setPlayingId(playingId === song.id ? null : song.id)}
              onEnded={() => setPlayingId(null)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MusicSection;
