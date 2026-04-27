import React from 'react';
import { FaHeart, FaMusic, FaStickyNote, FaEnvelope } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full shadow-soft border border-white/20 flex items-center gap-8">
      <button onClick={() => scrollTo('scrapbook')} className="text-brown hover:text-rose transition-colors flex items-center gap-2">
        <FaHeart size={14} />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Memories</span>
      </button>
      <button onClick={() => scrollTo('notes')} className="text-brown hover:text-rose transition-colors flex items-center gap-2">
        <FaEnvelope size={14} />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Notes</span>
      </button>
      <button onClick={() => scrollTo('reasons')} className="text-brown hover:text-rose transition-colors flex items-center gap-2">
        <FaStickyNote size={14} />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Reasons</span>
      </button>
      <button onClick={() => scrollTo('music')} className="text-brown hover:text-rose transition-colors flex items-center gap-2">
        <FaMusic size={14} />
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Soundtrack</span>
      </button>
    </nav>
  );
};

export default Navbar;
