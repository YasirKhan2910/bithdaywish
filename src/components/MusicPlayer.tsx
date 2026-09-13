import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

interface MusicPlayerProps {
  visible: boolean;
}

export default function MusicPlayer({ visible }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(config.musicUrl);
    audio.loop = true;
    audio.volume = 0.35;
    audio.addEventListener("canplaythrough", () => setLoaded(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={toggle}
            disabled={!loaded}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full glass border border-rose-500/20 text-warm-white/80 hover:text-warm-white hover:border-rose-500/50 transition-all duration-300 group"
            style={{ cursor: "none" }}
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {/* Equalizer bars */}
            <div className="flex items-end gap-0.5 h-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{ background: "rgba(212,96,122,0.8)" }}
                  animate={isPlaying ? {
                    height: ["4px", `${8 + i * 4}px`, "4px"],
                    transition: {
                      duration: 0.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  } : { height: "4px" }}
                />
              ))}
            </div>
            <span className="text-xs font-sans tracking-wider text-rose-300/80 group-hover:text-rose-200 transition-colors">
              {!loaded ? "Loading..." : isPlaying ? "Pause" : config.musicLabel}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
