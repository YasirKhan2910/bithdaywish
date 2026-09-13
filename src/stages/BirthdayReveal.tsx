import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { config } from "../config";

interface BirthdayRevealProps {
  name: string;
  onContinue: () => void;
}

export default function BirthdayReveal({ name, onContinue }: BirthdayRevealProps) {
  const [phase, setPhase] = useState<"flash" | "main" | "lines" | "button">("flash");
  const [visibleLines, setVisibleLines] = useState(0);
  const fireworkRef = useRef<number>(0);

  useEffect(() => {
    // Flash transition
    setTimeout(() => setPhase("main"), 800);
    setTimeout(() => setPhase("lines"), 1600);
    setTimeout(() => setVisibleLines(1), 2200);
    config.birthdayLines.forEach((_, i) => {
      setTimeout(() => setVisibleLines((c) => Math.max(c, i + 2)), 2200 + (i + 1) * 1200);
    });
    setTimeout(() => setPhase("button"), 2200 + config.birthdayLines.length * 1200 + 1000);

    // Confetti burst
    const launchConfetti = () => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55, x: 0.5 },
        colors: ["#8b1a4a", "#d4607a", "#f2b8c6", "#f0c070", "#ffffff"],
        startVelocity: 45,
        gravity: 0.9,
        scalar: 1.1,
      });
    };

    const launchSide = () => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 50,
        origin: { x: 0, y: 0.6 },
        colors: ["#d4607a", "#f2b8c6", "#f0c070"],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 50,
        origin: { x: 1, y: 0.6 },
        colors: ["#d4607a", "#f2b8c6", "#f0c070"],
      });
    };

    setTimeout(launchConfetti, 900);
    setTimeout(launchSide, 1400);
    setTimeout(launchConfetti, 2200);
    setTimeout(launchSide, 3200);

    // Continuous gentle confetti
    let count = 0;
    const gentleInterval = setInterval(() => {
      if (count > 8) { clearInterval(gentleInterval); return; }
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.3, x: Math.random() },
        colors: ["#d4607a", "#f2b8c6", "#f0c070", "#ffffff"],
        gravity: 1.2,
        scalar: 0.8,
        startVelocity: 25,
      });
      count++;
    }, 800);

    return () => {
      clearInterval(gentleInterval);
      cancelAnimationFrame(fireworkRef.current);
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative z-10 transition-all duration-1000 ${
        phase !== "flash" ? "celebration-bg" : "bg-midnight"
      }`}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-20 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,96,122,0.4), transparent)" }}
          />
        )}
      </AnimatePresence>

      {phase !== "flash" && (
        <div className="text-center max-w-2xl w-full">
          {/* Birthday heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 sm:mb-8"
          >
            <div className="text-4xl sm:text-7xl mb-3 sm:mb-4 animate-heartbeat inline-block">🎂</div>
            <h1
              className="font-serif text-2xl sm:text-4xl md:text-6xl font-bold leading-tight shimmer-text"
              style={{ letterSpacing: "0.02em" }}
            >
              HAPPY BIRTHDAY,
            </h1>
            <h1
              className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold gradient-text-rose text-glow-rose mt-1"
              style={{ letterSpacing: "0.04em" }}
            >
              {name.toUpperCase()} ❤️
            </h1>
            <p className="font-script text-xl sm:text-3xl text-soft-pink/90 mt-2">
              ✨ meri Jaanam ✨
            </p>
          </motion.div>

          <div className="divider-rose w-36 sm:w-48 mx-auto mb-6 sm:mb-8" />

          {/* Lines */}
          <div className="space-y-2.5 sm:space-y-3 px-2">
            {config.birthdayLines.map((line, i) => (
              <AnimatePresence key={i}>
                {visibleLines > i && (
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`font-serif ${
                      i === 0
                        ? "text-lg sm:text-2xl text-warm-white font-medium"
                        : "text-sm sm:text-lg text-warm-white/75 italic"
                    }`}
                  >
                    {line}
                  </motion.p>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Continue */}
          <AnimatePresence>
            {phase === "button" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-10 sm:mt-14"
              >
                <motion.button
                  onClick={onContinue}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-glow px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans tracking-widest text-warm-white touch-manipulation"
                >
                  <span className="relative z-10">Read something from my heart →</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
