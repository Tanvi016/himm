import React, { useRef } from 'react';
import ReasonCard from './ReasonCard';
import Doodle from '../shared/Doodle';
import EasterEgg from '../shared/EasterEgg';
import { reasons } from '../../data/reasons';

const ReasonsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="reasons" className="py-24 relative z-10 px-0 max-w-full mx-auto min-h-[80vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-transparent via-[#FDECEE]/60 to-transparent">
      <div className="flex flex-col items-center mb-8 relative text-center px-4 w-full">
        <EasterEgg 
           icon="heart"
           className="-top-4 right-[25%] md:right-[35%] text-rose scale-150 animate-[spin_6s_linear_infinite]"
           title="My Biggest Reason"
           message="Is simply because you exist. I don't need 29 reasons to love you, I just do."
        />
        <h2 className="text-5xl md:text-6xl mb-4 text-[#8B6B61] font-handwritten">29 Reasons Why</h2>
        <div className="w-32 h-[2px] bg-rose/40 rounded-full" />
        <Doodle type="star" className="absolute -top-4 right-[10%] md:right-1/4 opacity-40 scale-125 pointer-events-none" />
      </div>

      {/* Horizontal Carousel (Scrollable, ~5 items visibility mapping) */}
      <div className="relative w-full overflow-hidden py-16">
        
        {/* Soft edge masking keeping the aesthetic centered even on wide monitors */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#F8F2EA]/10 to-transparent pointer-events-none z-30 mix-blend-overlay" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#F8F2EA]/10 to-transparent pointer-events-none z-30 mix-blend-overlay" />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-x-8 md:gap-x-12 px-12 md:px-[8vw] pb-12 pt-8 snap-x snap-mandatory items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reasons.slice(0, 29).map((reason, index) => (
            <div 
              key={index} 
              className="snap-center shrink-0 w-[160px] sm:w-[180px] md:w-[200px] xl:w-[min(16vw,240px)] flex justify-center py-4"
            >
              <ReasonCard text={reason} index={index + 1} />
            </div>
          ))}
          {/* Layout spacer protecting the final element edge */}
          <div className="w-16 shrink-0" />
        </div>
      </div>

      {/* Helper text underneath scroll carousel */}
      <div className="text-center text-rose/60 text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-4 px-4 w-full">
         <span className="opacity-50">&larr;</span>
         <span>Swipe sideways to explore all 29</span>
         <span className="opacity-50">&rarr;</span>
      </div>
    </section>
  );
};

export default ReasonsSection;
