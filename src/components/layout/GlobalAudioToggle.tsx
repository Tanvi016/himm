import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const GlobalAudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { mediaUrl } = useAuth();

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio playback requires manual user interaction first.", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group flex items-center justify-end">
            {/* Background track — served through token-gated API */}
            <audio ref={audioRef} loop src={mediaUrl("s4")} />
            
            <div className="absolute right-16 px-5 py-3 bg-[#FCFBF8]/95 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(139,107,97,0.15)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none flex flex-col items-end min-w-[140px] border border-beige/40">
                <span className="font-clean text-[9px] uppercase tracking-widest text-[#8B6B61]/50 mb-1">Now Playing</span>
                <span className="font-clean font-bold text-sm text-[#4A3F3A]">With You</span>
                <span className="font-handwritten text-lg text-rose leading-none mt-1">AP Dhillon</span>
            </div>

            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_10px_30px_rgba(139,107,97,0.2)] flex items-center justify-center transition-colors duration-500 overflow-visible relative border border-[#D9B6B0]/40 ${isPlaying ? 'bg-rose text-white' : 'bg-[#FCFBF8] text-[#8B6B61]'}`}
            >
                {isPlaying && (
                    <div className="absolute inset-1 bg-white/20 animate-spin border-[2px] border-dashed border-white/50 rounded-full pointer-events-none" style={{ animationDuration: '6s' }} />
                )}
                
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 fill-current relative z-10 transition-transform">
                    {isPlaying ? (
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    ) : (
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" transform="translate(1, 0)"/>
                    )}
                </svg>

                {isPlaying && (
                    <>
                        <motion.div animate={{ y: [-4, 4, -4], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="absolute -top-2 -right-4 w-6 h-6 text-rose pointer-events-none">
                            <svg viewBox="0 0 24 24" className="fill-current"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                        </motion.div>
                        <motion.div animate={{ y: [-4, 4, -4], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1, ease: "easeInOut" }} className="absolute bottom-2 -left-4 w-4 h-4 text-rose/60 pointer-events-none">
                            <svg viewBox="0 0 24 24" className="fill-current"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                        </motion.div>
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default GlobalAudioToggle;
