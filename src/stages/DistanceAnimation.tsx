import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface DistanceAnimationProps {
  onContinue: () => void;
}

const lines = [
  { text: "Thousands of kilometers...", delay: 3500 },
  { text: "Two different places...", delay: 5500 },
  { text: "But somehow, you still feel like home.", delay: 7800 },
];

export default function DistanceAnimation({ onContinue }: DistanceAnimationProps) {
  const [visibleLines, setVisibleLines] = useState<boolean[]>([false, false, false]);
  const [showButton, setShowButton] = useState(false);
  const [planeProgress, setPlaneProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000;
    const animPlane = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      setPlaneProgress(p);
      if (p < 1) requestAnimationFrame(animPlane);
    };
    requestAnimationFrame(animPlane);

    lines.forEach((l, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, l.delay);
    });

    setTimeout(() => setShowButton(true), 11000);
  }, []);

  // SVG path — same for all viewboxes, SVG scales it
  const pathD = "M 60 100 Q 300 -20 540 100";

  function bezierPoint(t: number) {
    const p0 = { x: 60, y: 100 };
    const p1 = { x: 300, y: -20 };
    const p2 = { x: 540, y: 100 };
    const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    return { x, y };
  }

  function bezierTangent(t: number) {
    const p0 = { x: 60, y: 100 };
    const p1 = { x: 300, y: -20 };
    const p2 = { x: 540, y: 100 };
    const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
    const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  const planePos = bezierPoint(planeProgress);
  const planeAngle = bezierTangent(Math.min(planeProgress, 0.99));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-12 relative z-10">
      <div className="max-w-xl w-full text-center">
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-muted text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-8 font-sans"
        >
          Across the world
        </motion.p>

        {/* Country labels above SVG on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-between items-center px-2 mb-2 sm:hidden"
        >
          <div className="text-center">
            <span className="text-2xl">{config.myFlag}</span>
            <p className="text-xs text-warm-white/40 font-sans mt-0.5">{config.myCountry}</p>
          </div>
          <div className="text-center">
            <span className="text-2xl">{config.herFlag}</span>
            <p className="text-xs text-warm-white/40 font-sans mt-0.5">{config.herCountry}</p>
          </div>
        </motion.div>

        {/* SVG — hidden labels on mobile to avoid clipping, shown via above div */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-8 sm:mb-10 w-full"
        >
          {/* Mobile SVG — compact viewbox */}
          <svg
            viewBox="0 0 600 130"
            className="w-full sm:hidden overflow-visible"
            style={{ height: "90px" }}
          >
            <defs>
              <linearGradient id="pathGradM" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f2b8c6" />
                <stop offset="50%" stopColor="#d4607a" />
                <stop offset="100%" stopColor="#f0c070" />
              </linearGradient>
              <filter id="glowM">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d={pathD} fill="none" stroke="rgba(212,96,122,0.15)" strokeWidth="2" strokeDasharray="6 4" />
            <motion.path d={pathD} fill="none" stroke="url(#pathGradM)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.5, ease: "easeInOut" }} />
            <motion.path d={pathD} fill="none" stroke="rgba(212,96,122,0.3)" strokeWidth="6" strokeLinecap="round" filter="url(#glowM)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.5, ease: "easeInOut" }} />
            <circle cx="60" cy="100" r="5" fill="#d4607a" />
            <circle cx="60" cy="100" r="9" fill="none" stroke="rgba(212,96,122,0.3)" strokeWidth="2" />
            <circle cx="540" cy="100" r="5" fill="#f0c070" />
            <circle cx="540" cy="100" r="9" fill="none" stroke="rgba(240,192,112,0.3)" strokeWidth="2" />
            {planeProgress > 0 && planeProgress < 0.98 && (
              <g transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planeAngle})`}>
                <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="16" className="select-none" style={{ filter: "drop-shadow(0 0 5px rgba(240,192,112,0.8))" }}>✈️</text>
              </g>
            )}
            {planeProgress >= 0.98 && (
              <text x="540" y="96" textAnchor="middle" dominantBaseline="middle" fontSize="16" className="select-none">✈️</text>
            )}
          </svg>

          {/* Desktop SVG — with labels */}
          <svg
            viewBox="0 0 600 200"
            className="w-full hidden sm:block max-w-lg mx-auto overflow-visible"
            style={{ maxHeight: "160px" }}
          >
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f2b8c6" />
                <stop offset="50%" stopColor="#d4607a" />
                <stop offset="100%" stopColor="#f0c070" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d={pathD} fill="none" stroke="rgba(212,96,122,0.15)" strokeWidth="2" strokeDasharray="6 4" />
            <motion.path d={pathD} fill="none" stroke="url(#pathGrad)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.5, ease: "easeInOut" }} />
            <motion.path d={pathD} fill="none" stroke="rgba(212,96,122,0.3)" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.5, ease: "easeInOut" }} />
            <circle cx="60" cy="100" r="6" fill="#d4607a" />
            <circle cx="60" cy="100" r="10" fill="none" stroke="rgba(212,96,122,0.3)" strokeWidth="2" />
            <text x="60" y="130" textAnchor="middle" fontSize="20" className="select-none">{config.myFlag}</text>
            <text x="60" y="155" textAnchor="middle" fontSize="10" fill="rgba(245,232,232,0.5)" fontFamily="Inter, sans-serif">{config.myCountry}</text>
            <circle cx="540" cy="100" r="6" fill="#f0c070" />
            <circle cx="540" cy="100" r="10" fill="none" stroke="rgba(240,192,112,0.3)" strokeWidth="2" />
            <text x="540" y="130" textAnchor="middle" fontSize="20" className="select-none">{config.herFlag}</text>
            <text x="540" y="155" textAnchor="middle" fontSize="10" fill="rgba(245,232,232,0.5)" fontFamily="Inter, sans-serif">{config.herCountry}</text>
            {planeProgress > 0 && planeProgress < 0.98 && (
              <g transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planeAngle})`}>
                <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="18" className="select-none" style={{ filter: "drop-shadow(0 0 6px rgba(240,192,112,0.8))" }}>✈️</text>
              </g>
            )}
            {planeProgress >= 0.98 && (
              <text x="540" y="95" textAnchor="middle" dominantBaseline="middle" fontSize="18" className="select-none">✈️</text>
            )}
          </svg>
        </motion.div>

        {/* Text lines */}
        <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10 px-2">
          {lines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines[i] && (
                <motion.p
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    i === 2
                      ? "font-serif text-lg sm:text-2xl md:text-3xl gradient-text-rose font-medium leading-snug"
                      : "font-serif text-sm sm:text-lg md:text-xl text-warm-white/60 italic"
                  }
                >
                  {line.text}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Continue */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={onContinue}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm font-sans tracking-widest text-rose-300 touch-manipulation"
              style={{ cursor: "none" }}
            >
              Continue →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
