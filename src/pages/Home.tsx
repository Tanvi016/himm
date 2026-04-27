import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/hero/HeroSection';
import ScrapbookBoard from '../components/scrapbook/ScrapbookBoard';
import NotesSection from '../components/hidden-notes/NotesSection';
import ReasonsSection from '../components/reasons/ReasonsSection';
import MusicSection from '../components/music/MusicSection';
import GlobalAudioToggle from '../components/layout/GlobalAudioToggle';
import BirthdayLetter from '../components/letter/BirthdayLetter';
import PaperBackground from '../components/shared/PaperBackground';
import FloatingHeartsBackground from '../components/shared/FloatingHeartsBackground';
import InterludeMessage from '../components/shared/InterludeMessage';

const Home: React.FC = () => {
  return (
    <PaperBackground>
      <GlobalAudioToggle />
      <Navbar />
      
      {/* Texture Overlay (Grain) */}
      <div className="grain-overlay" />
      
      {/* Global Floating Hearts Background spanning entire page */}
      <FloatingHeartsBackground />

      {/* Hero Section */}
      <HeroSection />

      {/* Pages / Sections */}
      <div className="max-w-screen-2xl mx-auto space-y-8">
        
        {/* 2. Scrapbook Memory Board */}
        <section id="scrapbook">
          <ScrapbookBoard />
        </section>

        {/* 3. Hidden Notes Section */}
        <section id="notes">
          <NotesSection />
        </section>

        {/* Surprise Typing Interlude */}
        <section id="interlude">
          <InterludeMessage />
        </section>

        {/* 4. 29 Reasons (Grid Layout) */}
        <section id="reasons">
          <ReasonsSection />
        </section>

        {/* 5. Soundtrack */}
        <section id="music">
          <MusicSection />
        </section>

        {/* 6. Final Letter */}
        <section id="letter">
          <BirthdayLetter />
        </section>

      </div>

      <footer className="py-20 text-center border-t border-brown/5 relative z-10">
        <p className="font-handwritten text-2xl text-brown/60 mb-2">Developed with ❤️ for Himm</p>
        <p className="text-[10px] font-clean uppercase tracking-[0.4em] opacity-30">Forever & Always</p>
      </footer>
    </PaperBackground>
  );
};

export default Home;
