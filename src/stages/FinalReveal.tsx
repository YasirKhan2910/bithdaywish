import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface FinalRevealProps {
  name: string;
}

export default function FinalReveal({ name }: FinalRevealProps) {
  const [phase, setPhase] = useState<"button" | "revealing" | "signoff">("button");
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSignoff, setShowSignoff] = useState(false);

  const lines = config.finalLines;

  const startReveal = () => {
    setPhase("revealing");
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1));
      }, 600 + i * 1100);
    });
    setTimeout(() => {
      setPhase("signoff");
      setShowSignoff(true);
    }, 600 + lines.length * 1100 + 800);
  };

  const getLineStyle = (i: number): string => {
    if (i === 0) return "font-serif text-lg sm:text-2xl text-warm-white/80 italic";
    if (i === 1) return "font-serif text-base sm:text-lg text-warm-white/50 italic";
    if (i >= 7) return "font-serif text-xl sm:text-3xl gradient-text-rose font-medium";
    if (lines[i].length < 20) return "font-serif text-2xl sm:text-4xl text-soft-pink font-semibold";
    return "font-serif text-base sm:text-xl text-warm-white/65";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative z-10">
      <AnimatePresence mode="wait">
        {phase === "button" && (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted text-xs tracking-[0.3em] uppercase mb-6 sm:mb-8 font-sans">
              Almost done...
            </p>
            <motion.button
              onClick={startReveal}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="btn-glow px-8 sm:px-12 py-4 sm:py-5 rounded-full font-serif text-base sm:text-lg text-warm-white animate-pulse-glow touch-manipulation"
            >
              <span className="relative z-10">One last thing... ✨</span>
            </motion.button>
          </motion.div>
        )}

        {(phase === "revealing" || phase === "signoff") && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl w-full text-center"
          >
            {/* Lines */}
            <div className="space-y-4 sm:space-y-5 mb-10">
              {lines.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleCount > i && (
                    <motion.p
                      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className={getLineStyle(i)}
                    >
                      {line}
                    </motion.p>
                  )}
                </AnimatePresence>
              ))}

              {/* Heart finale */}
              <AnimatePresence>
                {visibleCount >= lines.length && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl animate-heartbeat"
                  >
                    ❤️
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Sign off */}
            <AnimatePresence>
              {showSignoff && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mt-10 pt-8 space-y-4"
                >
                  <div className="divider-rose w-24 mx-auto mb-8" />

                  <p className="font-serif text-xl sm:text-3xl text-warm-white">
                    Happy Birthday, <span className="gradient-text-rose">{name}</span>.
                  </p>

                  <p className="font-serif text-base sm:text-lg text-warm-white/60 italic leading-relaxed">
                    Until then, remember...
                  </p>

                  <p className="font-serif text-base sm:text-xl text-soft-pink/80 italic leading-relaxed">
                    {config.finalSignoff(name)}
                  </p>

                  {/* Final signature */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="pt-6"
                  >
                    <p className="font-script text-2xl gradient-text-gold">
                      With all my love,
                    </p>
                    <p className="font-script text-3xl gradient-text-rose mt-1">
                      {config.myName} ❤️
                    </p>
                  </motion.div>

                  {/* Restart */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="pt-8"
                  >
                    <button
                      onClick={() => window.location.reload()}
                      className="text-xs text-muted/50 font-sans tracking-wider hover:text-muted/80 transition-colors"
                      style={{ cursor: "none" }}
                    >
                      ↺ Experience again
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,26,74,0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
