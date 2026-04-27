import React, { useRef } from 'react';
import EnvelopeCard from './EnvelopeCard';
import Doodle from '../shared/Doodle';
import EasterEgg from '../shared/EasterEgg';
import { notes } from '../../data/notes';

const NotesSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="notes" className="py-32 relative z-10 overflow-hidden">
      <div className="flex flex-col items-center mb-12 relative px-4 text-center">
        <h2 className="text-5xl md:text-6xl mb-4 font-handwritten text-brown">Hidden Notes</h2>
        <div className="w-24 h-[2px] bg-rose/40 rounded-full mb-4" />
        <p className="text-sm font-clean uppercase tracking-widest opacity-50">Swipe and choose an envelope to open</p>
        
        {/* Interactive Easter Egg */}
        <EasterEgg 
           icon="star"
           className="top-0 right-[10%] md:right-[20%] text-[#D6B98C] scale-125"
           title="You're my star"
           message="Thanks for always lighting up my darkest days!"
        />
        
        <Doodle type="heart" className="absolute bottom-0 left-[15%] opacity-50 scale-110" />
      </div>
      
      {/* Horizontal Scroll Layout - Envelopes */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 md:gap-16 px-8 md:px-[20vw] py-16 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {notes.map((note, index) => (
          <div key={note.id} className="snap-center shrink-0 flex justify-center py-4 relative">
            <EnvelopeCard note={note} index={index} />
            {/* Inject an arrow doodle occasionally */}
            {index === 2 && (
              <Doodle type="heart" className="absolute -top-8 -right-8 scale-[0.6] opacity-40 animate-pulse pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {/* Fade Overlays to indicate scroll edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-cream to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default NotesSection;
