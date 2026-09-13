import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface EmotionalMessageProps {
  name: string;
  onContinue: () => void;
}

export default function EmotionalMessage({ name, onContinue }: EmotionalMessageProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const lines = config.emotionalLines;
  const BASE_DELAY = 1200;

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1));
      }, 1000 + i * BASE_DELAY);
    });
    setTimeout(() => setShowButton(true), 1000 + lines.length * BASE_DELAY + 1500);
  }, []);

  const getLineStyle = (i: number): string => {
    if (i === 0) return "font-serif text-xl sm:text-2xl md:text-4xl text-warm-white text-glow-rose font-semibold";
    if (i >= lines.length - 2) return "font-serif text-base sm:text-lg md:text-2xl gradient-text-rose italic font-medium";
    if (lines[i].length < 30) return "font-serif text-sm sm:text-base md:text-xl text-soft-pink/80 italic";
    return "font-serif text-xs sm:text-sm md:text-lg text-warm-white/65 leading-relaxed";
  };

  return (
    <div className="min-h-screen flex flex-col items-start sm:items-center justify-start sm:justify-center px-5 sm:px-10 py-14 sm:py-16 relative z-10">
      <div className="max-w-2xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-muted text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-8 sm:mb-10 font-sans text-center"
        >
          From my heart to yours
        </motion.p>

        {/* Lines */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {lines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleCount > i && (
                <motion.p
                  initial={{ opacity: 0, x: -16, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`${getLineStyle(i)}`}
                >
                  {line.replace("[NAME]", name)}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Continue */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-10 sm:mt-14 text-center"
            >
              <div className="divider-rose w-20 sm:w-24 mx-auto mb-6 sm:mb-8" />
              <motion.button
                onClick={onContinue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-glow px-8 sm:px-10 py-4 rounded-full text-sm font-sans tracking-widest text-warm-white animate-pulse-glow touch-manipulation"
                style={{ cursor: "none" }}
              >
                <span className="relative z-10">There's more... →</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Side accent */}
      <div
        className="fixed left-0 top-0 bottom-0 w-0.5 sm:w-1 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(212,96,122,0.3), transparent)" }}
      />
    </div>
  );
}
