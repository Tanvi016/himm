import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import SurpriseQuest from './SurpriseQuest';
import LoadingScreen from '../shared/LoadingScreen';

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const { authenticated, setAuthenticated } = useAuth();
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [questFinished, setQuestFinished] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Restore session — verify the cookie is still valid server-side
  useEffect(() => {
    if (authenticated) {
      fetch('/api/verify')
        .then(res => {
          if (res.ok) setUnlocked(true);
          else setAuthenticated(false); // cookie expired
        })
        .catch(() => setAuthenticated(false));
    }
  }, [authenticated]);

  const tryAuth = async (pin: string) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        setAuthenticated(true);
        setUnlocked(true);
      } else {
        setShake(true);
        setInput("");
        setShowHint(true);
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    tryAuth(input);
  };

  const handleDigit = (d: string) => {
    if (input.length >= 4) return;
    const next = input + d;
    setInput(next);
    if (next.length === 4) {
      setTimeout(() => tryAuth(next), 200);
    }
  };

  if (unlocked && questFinished && loadingFinished) return <>{children}</>;
  
  if (unlocked && questFinished) {
    return <LoadingScreen onComplete={() => setLoadingFinished(true)} />;
  }
  
  if (unlocked) return <SurpriseQuest onComplete={() => setQuestFinished(true)} />;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FDECEE 0%, #FEE2E2 50%, #FDF2F4 100%)' }}
    >
      {/* Subtle floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose/20 pointer-events-none select-none text-4xl"
          style={{ left: `${10 + i * 11}%`, top: `${15 + (i % 3) * 25}%` }}
          animate={{ y: [-10, 10, -10], opacity: [0.15, 0.3, 0.15] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.4, delay: i * 0.3 }}
        >
          ♥
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-sm mx-4"
      >
        {/* Card */}
        <motion.div
          animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="bg-[#FEFEFA] rounded-2xl p-8 shadow-[0_20px_60px_rgba(139,107,97,0.15)] border border-beige/40 relative overflow-hidden"
        >
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center border border-rose/20">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-rose/60">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
          </div>

          <h1 className="font-handwritten text-4xl text-[#4A3F3A] text-center mb-1">Just for you</h1>
          <p className="font-clean text-xs uppercase tracking-widest text-[#8B6B61]/50 text-center mb-8">Enter your special code</p>

          {/* PIN display dots */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={input.length > i ? { scale: [1.4, 1] } : {}}
                transition={{ duration: 0.2 }}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${input.length > i
                    ? 'bg-rose border-rose shadow-[0_0_8px_rgba(217,182,176,0.6)]'
                    : 'bg-transparent border-[#D9B6B0]/60'
                  }`}
              />
            ))}
          </div>

          {/* Keypad */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                <button
                  key={d}
                  type="button"
                  disabled={submitting}
                  onClick={() => handleDigit(d)}
                  className="h-14 rounded-xl bg-[#F8F2EA] hover:bg-rose/10 active:scale-95 transition-all font-clean text-xl font-semibold text-[#4A3F3A] border border-[#E8D5CF]/50 shadow-sm hover:shadow hover:border-rose/30 disabled:opacity-50"
                >
                  {d}
                </button>
              ))}
              <div /> {/* spacer */}
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleDigit('0')}
                className="h-14 rounded-xl bg-[#F8F2EA] hover:bg-rose/10 active:scale-95 transition-all font-clean text-xl font-semibold text-[#4A3F3A] border border-[#E8D5CF]/50 shadow-sm hover:shadow hover:border-rose/30 disabled:opacity-50"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setInput(input.slice(0, -1))}
                className="h-14 rounded-xl bg-[#F8F2EA] hover:bg-rose/10 active:scale-95 transition-all font-clean text-xl text-[#8B6B61]/60 border border-[#E8D5CF]/50 shadow-sm flex items-center justify-center"
              >
                ⌫
              </button>
            </div>
          </form>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center font-handwritten text-rose/70 text-xl mt-2"
              >
                Think about what's special today ♥
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-center font-clean text-[10px] uppercase tracking-widest text-[#8B6B61]/30 mt-6">
          Private — For your eyes only
        </p>
      </motion.div>
    </div>
  );
};

export default PasswordGate;
