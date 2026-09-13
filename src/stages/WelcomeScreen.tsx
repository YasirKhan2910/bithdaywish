import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeScreenProps {
  name: string;
  onContinue: () => void;
}

const sentences = (name: string) => [
  { text: `Hey, ${name}... my Jaanam ❤️`, delay: 0.5 },
  { text: "I've been waiting to show you this.", delay: 2.0 },
  { text: "I made something special for you...", delay: 3.8 },
];

export default function WelcomeScreen({ name, onContinue }: WelcomeScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const msgs = sentences(name);

  useEffect(() => {
    msgs.forEach((m, i) => {
      setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), m.delay * 1000);
    });
    setTimeout(() => setShowButton(true), 6000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-10 relative z-10">
      <div className="max-w-xl w-full text-center space-y-5 sm:space-y-6">
        {msgs.map((m, i) => (
          <AnimatePresence key={i}>
            {visibleCount > i && (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={
                  i === 0
                    ? "font-serif text-3xl sm:text-4xl md:text-5xl text-warm-white text-glow-rose leading-tight"
                    : i === 1
                    ? "font-serif text-base sm:text-xl md:text-2xl text-soft-pink/80 italic"
                    : "font-serif text-lg sm:text-2xl md:text-3xl gradient-text-rose"
                }
              >
                {m.text}
              </motion.p>
            )}
          </AnimatePresence>
        ))}

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pt-6 sm:pt-8"
            >
              <div className="divider-rose w-24 sm:w-32 mx-auto mb-6 sm:mb-8" />

              <motion.button
                onClick={onContinue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow px-8 sm:px-10 py-4 sm:py-5 rounded-full font-sans font-medium tracking-widest text-warm-white text-sm animate-pulse-glow touch-manipulation"
              >
                <span className="relative z-10">Begin the journey →</span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-muted text-xs mt-5 sm:mt-6 font-sans tracking-wider px-4"
              >
                This is going to take a moment. You deserve that.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(139,26,74,0.12) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
