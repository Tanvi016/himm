import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeart } from 'react-icons/fa';

// Set exactly to April 29, 2026, Midnight Local Time
const TARGET_DATE = new Date('2026-04-29T00:00:00').getTime();

// Beautiful Hand-Drawn style Cake SVG Component
const CakeSVG = ({ lit = true }: { lit?: boolean }) => (
  <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl">
    {/* Plate */}
    <ellipse cx="100" cy="170" rx="80" ry="15" fill="#EADBC8" />
    <path d="M20 170 C20 185, 180 185, 180 170" fill="#D9B6B0" />

    {/* Cake Bottom Layer */}
    <path d="M40 165 L40 120 C40 110, 160 110, 160 120 L160 165 C160 175, 40 175, 40 165" fill="#F8F2EA" />
    <path d="M40 120 C40 130, 160 130, 160 120 C160 110, 40 110, 40 120" fill="#FEFEFA" />

    {/* Cake Top Layer */}
    <path d="M60 120 L60 80 C60 70, 140 70, 140 80 L140 120 C140 130, 60 130, 60 120" fill="#E8CFCB" />
    <path d="M60 80 C60 90, 140 90, 140 80 C140 70, 60 70, 60 80" fill="#D9B6B0" />

    {/* Frosting Drips */}
    <path d="M60 85 Q70 100 80 85 Q90 110 100 85 Q110 105 120 85 Q130 95 140 85" fill="#FEFEFA" />

    {/* Candles */}
    {/* C1 */}
    <rect x="75" y="45" width="6" height="35" fill="#fff" rx="2" />
    <path d="M75 50 L81 55 L75 60 L81 65" stroke="#D9B6B0" strokeWidth="1" fill="none" />
    {/* C2 */}
    <rect x="97" y="40" width="6" height="40" fill="#fff" rx="2" />
    <path d="M97 45 L103 50 L97 55 L103 60" stroke="#D9B6B0" strokeWidth="1" fill="none" />
    {/* C3 */}
    <rect x="119" y="45" width="6" height="35" fill="#fff" rx="2" />
    <path d="M119 50 L125 55 L119 60 L125 65" stroke="#D9B6B0" strokeWidth="1" fill="none" />

    {/* Flames */}
    {lit && (
      <motion.g
        animate={{ scale: [1, 1.1, 1], y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        style={{ originY: "100%", originX: "50%" }}
      >
        <path d="M78 43 Q75 35 78 28 Q81 35 78 43" fill="#fbbf24" />
        <path d="M100 38 Q97 30 100 23 Q103 30 100 38" fill="#fbbf24" />
        <path d="M122 43 Q119 35 122 28 Q125 35 122 43" fill="#fbbf24" />
        {/* Inner flame core */}
        <path d="M78 41 Q77 36 78 33 Q79 36 78 41" fill="#fff" />
        <path d="M100 36 Q99 31 100 28 Q101 31 100 36" fill="#fff" />
        <path d="M122 41 Q121 36 122 33 Q123 36 122 41" fill="#fff" />
      </motion.g>
    )}

    {!lit && (
      // Smoke Rings
      <motion.g
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -20, scale: 1.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <circle cx="78" cy="25" r="2" fill="#9ca3af" />
        <circle cx="100" cy="20" r="2" fill="#9ca3af" />
        <circle cx="122" cy="25" r="2" fill="#9ca3af" />
      </motion.g>
    )}
  </svg>
);

// Countdown Display Node
const Countdown = ({ onComplete }: { onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, TARGET_DATE - Date.now()));

  useEffect(() => {
    // Re-verify immediately in case of stale mounting
    if (Date.now() >= TARGET_DATE) {
      if (onComplete) onComplete();
      // Do not return here, allow timer to run to maintain zero states explicitly
    }

    const timer = setInterval(() => {
      const remaining = Math.max(0, TARGET_DATE - Date.now());
      setTimeLeft(remaining);
      if (remaining === 0) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  const h = Math.floor(timeLeft / (1000 * 60 * 60));
  const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-col items-center">
      {timeLeft > 0 ? (
        <p className="font-clean text-rose uppercase tracking-[0.3em] text-sm mb-6">Locked until your special day</p>
      ) : (
        <p className="font-clean text-brown uppercase tracking-[0.3em] text-sm mb-6">The wait is over...</p>
      )}
      <div className="flex gap-2 sm:gap-4 md:gap-8 font-mono text-3xl sm:text-4xl text-brown/80 bg-[#FEFEFA] p-4 sm:p-8 md:p-12 rounded-2xl shadow-[0_10px_30px_rgba(139,107,97,0.1)] border border-beige/40">
        <div className="flex flex-col items-center">
          <span className="text-3xl sm:text-5xl md:text-7xl font-bold">{String(h).padStart(2, '0')}</span>
          <span className="text-[8px] sm:text-[10px] md:text-xs font-clean uppercase tracking-widest mt-1 sm:mt-2 opacity-50">Hours</span>
        </div>
        <span className={`text-3xl sm:text-5xl md:text-7xl opacity-50 ${timeLeft > 0 ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`}>:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl sm:text-5xl md:text-7xl font-bold">{String(m).padStart(2, '0')}</span>
          <span className="text-[8px] sm:text-[10px] md:text-xs font-clean uppercase tracking-widest mt-1 sm:mt-2 opacity-50">Mins</span>
        </div>
        <span className={`text-3xl sm:text-5xl md:text-7xl opacity-50 border-r border-[#EADBC8]/30 mx-1 sm:mx-2 md:mx-4 ${timeLeft > 0 ? 'animate-[pulse_1s_ease-in-out_infinite]' : ''}`} />
        <div className="flex flex-col items-center">
          <span className={`text-3xl sm:text-5xl md:text-7xl font-bold ${timeLeft > 0 ? 'text-rose' : 'text-brown'}`}>{String(s).padStart(2, '0')}</span>
          <span className={`text-[8px] sm:text-[10px] md:text-xs font-clean uppercase tracking-widest mt-1 sm:mt-2 opacity-80 ${timeLeft > 0 ? 'text-rose' : 'text-brown'}`}>Secs</span>
        </div>
      </div>
    </div>
  );
};

type Phase = 'locked' | 'ready' | 'cake-lit' | 'cake-blown' | 'opened';

const BirthdayLetter: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('locked');

  // Re-verify on mount to handle date changes during testing/HMR
  useEffect(() => {
    if (Date.now() < TARGET_DATE) {
      setPhase('locked');
    } else {
      setPhase('ready');
    }
  }, []);

  const handleSequenceStart = () => {
    // 1. Reveal Lit Cake
    setPhase('cake-lit');

    // 2. Wait 3 seconds, blow candles out, pop confetti
    setTimeout(() => {
      setPhase('cake-blown');

      // Massive celebratory pop
      confetti({
        particleCount: 400,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#E8CFCB', '#D9B6B0', '#F8F2EA', '#D6B98C'],
        startVelocity: 50,
        ticks: 300
      });

      // 3. Reveal Letter gracefully
      setTimeout(() => {
        setPhase('opened');
      }, 2500); // 2.5 seconds observing blown out cake before transitioning to letter
    }, 3000);
  };

  return (
    <section className="py-40 px-4 flex flex-col items-center relative z-10 min-h-screen justify-center overflow-x-hidden">
      <AnimatePresence mode="wait">

        {/* Phase 1 & 2: COUNTDOWN & READY BUTTON COMBO */}
        {(phase === 'locked' || phase === 'ready') && (
          <motion.div
            key="countdown-ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Countdown always maps visually */}
            <div className="mb-12">
              <Countdown onComplete={() => setPhase('ready')} />
            </div>

            <AnimatePresence>
              {phase === 'ready' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative text-center mt-4"
                >
                  <div className="absolute inset-0 bg-rose/20 blur-[50px] rounded-full animate-pulse pointer-events-none" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSequenceStart}
                    className="relative px-16 py-8 bg-brown text-cream font-handwritten text-4xl rounded-xl shadow-[0_20px_50px_rgba(139,107,97,0.3)] hover:shadow-[0_20px_50px_rgba(139,107,97,0.5)] transition-all border border-cream/20 overflow-hidden group z-10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    Open Your Letter
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Phase 3 & 4: CAKE ANIMATION SEQUENCE */}
        {(phase === 'cake-lit' || phase === 'cake-blown') && (
          <motion.div
            key="cake-sequence"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {phase === 'cake-lit' ? (
              <h3 className="font-handwritten text-5xl text-brown mb-8 animate-pulse text-center">Make a wish...</h3>
            ) : (
              <motion.h3
                initial={{ opacity: 0, scale: 0.5, y: -20, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: [-2, 2, 0] }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="font-handwritten text-6xl md:text-7xl text-red-600 font-bold mb-8 text-center drop-shadow-xl z-20"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
              >
                Happy 21st BIRTHDAY Veduu❤️
              </motion.h3>
            )}

            <CakeSVG lit={phase === 'cake-lit'} />
          </motion.div>
        )}

        {/* Phase 5: ACTUAL LETTER REVEAL */}
        {phase === 'opened' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="max-w-3xl w-full bg-[#FEFEFA] p-8 sm:p-12 md:p-24 shadow-2xl relative paper-edge"
          >
            {/* Elegant Letter Styling */}
            <h2 className="text-5xl md:text-6xl mb-12 text-center text-red-600 font-handwritten">
              Happy Birthday
            </h2>

            <div className="space-y-6 md:space-y-8 font-clean text-base md:text-xl text-dark-text/80 leading-relaxed">
              <p>
                Hey my baby!! 🥺❤️ I'm so so so so proud of you!! You always put in so much effort to make our relationship better, and you never fail to make me feel special.
                Your love is a beautiful gift, and I feel incredibly lucky to have you in my life.You're growing up so fast, and I can't wait to see all the amazing things you'll do.
                I'll always be right here cheering you on.🧿 Hope tula he letter read krayla avdel🥺Naytar maren ch😡We were just 18 when we first met...and I feel that's the best that happened that tu mala milala🧿
                ani I dont't think I can live without you ever🥺I just want to be be with u foreverrrr🥺🧿🫂
              </p>
              <p>
                Yaar...we are growing up so fast😭And every year asa vatta ki when am I going to live with youuuh😭❤️.Tujha sobat baher jana, navin food,cafes try karna this is something
                ki I always love to do with youu!!🧿❤️And the best part even though I get angry😂😡I always love uuuh only and tu kiti samjun ghetos😭😭😭.Mujhe jara samjh lena angry bird hu😶Par pyar aap se hi krti hu.
                Itna jaldi kaise badha ho rha hai tu😭😭❤️ Tu kiti hi motha zhala tari I'm always going to be with you🧿❤️
              </p>
              <p>
                I hope this birthday is as special as you are to me.I just want to make you happy always and I'll always try to do that 24/7.I love you so much that I can't even express in words!!❤️🥺
                Hope every year apan eksath celebrate kru!!And i'll keep making gifts for u even if u say no😶Mai toh nhhi suntii🙂blehh
                Happy 21st Birthday my veduuu❤️🧿I love you more more moreee and foreverr😘You are the Saiyaara in my life❤️Hope u don't cringe🙂😡
                And I lovee youu so so so so much!!Always remember this!!
              </p>
            </div>

            <div className="mt-20 flex flex-col items-end">
              <p className="font-handwritten text-3xl text-brown/80 mb-2">With all my love,</p>
              <p className="font-handwritten text-5xl text-red-500">Always</p>
            </div>

            {/* Small confetti/stars decoration near bottom */}
            <div className="absolute bottom-8 left-8 text-red-400 flex gap-4 text-2xl">
              <FaHeart className="animate-pulse" />
              <FaHeart className="animate-bounce" style={{ animationDelay: '200ms' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BirthdayLetter;
