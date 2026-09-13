import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface InteractiveQuestionProps {
  onContinue: () => void;
}

export default function InteractiveQuestion({ onContinue }: InteractiveQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setTimeout(onContinue, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-12 sm:py-16 relative z-10">
      <div className="max-w-lg w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-muted text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 font-sans">
            One little question
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-warm-white leading-snug">
            What makes you{" "}
            <span className="gradient-text-rose italic">happiest?</span>
          </h2>
        </motion.div>

        {/* Choices — 2-col on all sizes, single col on very small */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
          {config.questionChoices.map((choice, i) => {
            const isSelected = selected === i;
            const isDimmed = selected !== null && !isSelected;

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isDimmed ? 0.2 : 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => handleSelect(i)}
                className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 text-left transition-all duration-500 group touch-manipulation ${
                  isSelected
                    ? "glass-rose border-rose-400/40 glow-rose scale-[1.03]"
                    : "glass border-white/5 hover:border-rose-400/20 hover:glass-rose active:scale-[0.98]"
                }`}
                style={{ cursor: "none" }}
              >
                {/* Shimmer on select */}
                {isSelected && (
                  <motion.div
                    initial={{ x: "-100%", opacity: 0.4 }}
                    animate={{ x: "200%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    }}
                  />
                )}

                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{choice.emoji}</span>
                <span
                  className={`font-serif text-sm sm:text-base md:text-lg leading-snug transition-colors duration-300 ${
                    isSelected ? "text-warm-white" : "text-warm-white/70 group-hover:text-warm-white"
                  }`}
                >
                  {choice.label}
                </span>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rose-400 flex items-center justify-center text-xs text-white"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback message */}
        <AnimatePresence>
          {selected !== null && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 sm:mt-8 font-serif text-soft-pink/70 italic text-sm sm:text-base"
            >
              A beautiful answer for a beautiful person... ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
