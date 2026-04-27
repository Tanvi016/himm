import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import MemoryCluster from './PolaroidCard';
import EasterEgg from '../shared/EasterEgg';
import Doodle from '../shared/Doodle';
import { photos } from '../../data/photos';

const TimelineBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 w-full mx-auto relative z-10 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-opacity-20">

      {/* Container Background explicitly blending the wooden texture with soft blush/cream hues */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-rose/20 to-cream -z-10 mix-blend-overlay" />

      <div className="flex flex-col items-center mb-24 relative text-center max-w-7xl mx-auto px-4">
        <h2 className="text-5xl md:text-7xl mb-4 font-handwritten text-dark-text">Life on a Desk</h2>
        <div className="w-32 h-[2px] bg-brown/20 rounded-full" />
      </div>

      {/* Timeline Wrapper Structure */}
      <div className="relative w-full max-w-7xl mx-auto py-32 md:py-48 mt-20" ref={containerRef}>
        
        <EasterEgg 
          icon="glow"
          className="top-[-50px] right-[20%] md:top-[120px] md:right-[15%] opacity-100"
          title="Golden Ticket"
          message="Good for endless hugs and movie dates!"
          photoId="random"
        />

        {/* Core SVG Curving String running down the middle simulating physical desk connectivity */}
        <div className="absolute inset-y-0 left-8 md:left-1/2 w-8 md:-translate-x-1/2 pointer-events-none z-0">
          <svg className="w-full h-full opacity-40 mix-blend-multiply" fill="none" preserveAspectRatio="none">
            <path
              d="M16 0 Q32 100 16 200 T16 400 T16 600 T16 800 T16 1000 T16 1200 T16 1400 T16 1600 T16 1800 T16 2000"
              stroke="#C0392B"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Scattered Scrap Items acting as desk debris along the timeline string */}
        <div className="hidden md:block absolute top-[15%] left-[20%] font-handwritten text-brown/50 text-2xl -rotate-12 pointer-events-none z-0">
          "Can't believe this was real..."
        </div>
        <Doodle type="star" className="absolute top-[40%] right-[10%] opacity-20 scale-150 -rotate-[30deg] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] left-[10%] md:left-[25%] bg-cream/80 opacity-80 shadow-md p-3 max-w-[120px] rotate-[15deg] font-clean text-[10px] uppercase tracking-widest text-brown/60 shadow-[0_4px_12px_rgba(0,0,0,0.05)] pointer-events-none z-0">
          Ticket: Admit One 🎫
        </div>

        {/* Dynamic Nodes Mapping Timeline Alternations */}
        {photos.map((photo, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={photo.id} className={`relative w-full flex pl-16 pr-4 md:px-0 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} mb-16 md:mb-32 justify-end`}>

              {/* Central Pin/Node on the string */}
              <div className="absolute left-8 md:left-1/2 top-1/2 -mt-2 -ml-[5px] md:-ml-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-rose border-[2px] border-brown shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-20 pointer-events-none" />

              <div className={`w-full md:w-1/2 flex items-center ${isEven ? 'md:justify-start md:pl-16 lg:pl-24' : 'md:justify-end md:pr-16 lg:pr-24'}`}>
                {/* Ensure memory clusters correctly flow dynamically outwards originating from the string node anchor! */}
                <motion.div
                  className="relative flex justify-center w-full"
                  initial={{ opacity: 0, y: 50, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <MemoryCluster
                    photoId={photo.photoId}
                    caption={photo.caption}
                    date={photo.date}
                    index={index}
                    alignment={isEven ? 'left' : 'right'}
                    objectFit={photo.objectFit}
                  />
                </motion.div>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default TimelineBoard;
