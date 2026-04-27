import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Song } from '../../data/songs';
import { useAuth } from '../../context/AuthContext';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onToggle: () => void;
  onEnded: () => void;
}

const SongCard = ({ song, isPlaying, onToggle, onEnded }: SongCardProps) => {
  const { mediaUrl } = useAuth();
  const audioRef = useRef<HTMLAudioElement>(null);
  const coverUrl = mediaUrl(song.coverId);
  const audioSrc = mediaUrl(song.audioId);

  // Directly track physical audio playback strictly against the passed toggle states natively!
  useEffect(() => {
     const audio = audioRef.current;
     if (!audio) return;
     
     if (isPlaying) {
         audio.play().catch(e => console.warn("Audio playback issue:", e));
     } else {
         audio.pause();
         audio.currentTime = 0; // Added explicit temporal reset logic explicitly locking native browser resets on track switches
     }
  }, [isPlaying]);
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className={`w-full h-full max-w-[320px] bg-[#FEFEFA] rounded-2xl p-5 relative border border-beige/40 flex flex-col justify-between transition-shadow duration-300 group ${isPlaying ? 'shadow-[0_4px_25px_rgba(217,182,176,0.5)] ring-1 ring-rose/30 scale-[1.02]' : 'shadow-paper hover:shadow-xl'}`}
    >
      {/* Internal Track Evaluation Node */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" onEnded={onEnded} />

      {/* Background vintage texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-2xl bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Album Cover mimicking a CD or square crop graphic */}
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-5 relative shadow-inner bg-beige/10">
        <img 
          src={coverUrl} 
          alt={song.title} 
          className={`w-full h-full object-cover transition-transform duration-[8s] ease-linear ${isPlaying ? 'scale-125' : 'scale-100'} grayscale-[0.1] sepia-[0.15]`}
        />
        
        {/* Vintage glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#8B6B61]/80 via-transparent to-white/10 opacity-40 mix-blend-overlay pointer-events-none" />
        
        {/* Minimal Play Button explicitly triggering global parent callbacks */}
        <button 
          onClick={onToggle}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#8B6B61] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-white hover:scale-110 transition-all z-20"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-rose"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current ml-1"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 px-1 relative z-10 w-full overflow-hidden">
        <div className="mb-4">
           {/* Song info wrapper mimicking digital visual tracker boundaries */}
           <h3 className="font-clean font-bold text-lg text-[#4A3F3A] truncate w-full">{song.title}</h3>
           <p className="font-clean text-xs uppercase tracking-widest text-[#8B6B61]/60 truncate w-full">{song.artist}</p>
        </div>
        
        {/* Soft Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B6B61]/10 to-transparent mb-1" />
      </div>
    </motion.div>
  );
};

export default SongCard;
