import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { config } from "../config";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const CUTE_ERRORS = [
  "Hmm... think harder! What's that sweet nickname? 🙈",
  "Aww not quite! Hint: It starts with 'J' and has my whole heart ❤️",
  "Try again my love! What do you always call me? 🥺",
  "Close, but you know the real magic word is 'Jaan'... 😉",
  "Give it another shot, sweetheart! 🥰",
];

export default function NameInput({ onSubmit }: NameInputProps) {
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);

  // Strictly check for 'jaan' only (case-insensitive & trimmed)
  const checkAnswer = (val: string) => {
    return val.trim().toLowerCase() === "jaan";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnswer(val);
    setErrorMsg("");

    if (checkAnswer(val)) {
      triggerSuccess();
    } else {
      setIsSuccess(false);
    }
  };

  const triggerSuccess = () => {
    if (isSuccess) return;
    setIsSuccess(true);
    setErrorMsg("");

    // Gentle sparkles celebration
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: ["#f2b8c6", "#d4607a", "#f0c070", "#ffffff"],
      gravity: 1,
      scalar: 0.95,
    });
  };

  const spawnCuteFloatingEmojis = () => {
    const cuteList = ["🙈", "🥺", "💭", "💖", "🌸", "✨", "👀"];
    const newItems = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      emoji: cuteList[Math.floor(Math.random() * cuteList.length)],
      x: (Math.random() - 0.5) * 200,
    }));
    setFloatingEmojis(newItems);
    setTimeout(() => setFloatingEmojis([]), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkAnswer(answer)) {
      triggerSuccess();
      onSubmit(config.herName);
    } else {
      setIsSuccess(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      const nextMsg = CUTE_ERRORS[attemptCount % CUTE_ERRORS.length];
      setErrorMsg(nextMsg);
      setAttemptCount((c) => c + 1);
      spawnCuteFloatingEmojis();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm sm:max-w-md text-center"
      >
        {/* Decorative heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8 relative"
        >
          <div className="text-4xl sm:text-5xl mb-3 animate-heartbeat inline-block">❤️</div>
          <div className="divider-rose w-20 sm:w-24 mx-auto" />

          {/* Floating cute reaction emojis */}
          <AnimatePresence>
            {floatingEmojis.map((item) => (
              <motion.span
                key={item.id}
                initial={{ opacity: 1, y: 0, x: item.x, scale: 0.6 }}
                animate={{ opacity: 0, y: -80, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute left-1/2 top-0 pointer-events-none text-2xl select-none"
              >
                {item.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-muted text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 font-sans"
        >
          A tiny question for you
        </motion.p>

        {/* Question Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-warm-white leading-relaxed mb-6 sm:mb-8 px-2"
        >
          Before I show you something special...
          <br />
          <span className="gradient-text-rose italic">what do you call me with love?</span> ❤️
        </motion.h1>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <motion.div
            animate={
              isShaking
                ? { x: [-10, 10, -8, 8, -5, 5, -2, 2, 0], rotate: [-2, 2, -1, 1, 0] }
                : {}
            }
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <input
              type="text"
              value={answer}
              onChange={handleChange}
              placeholder="Type that special name... ✨"
              className={`romantic-input w-full px-5 sm:px-6 py-4 rounded-2xl text-center font-serif text-base sm:text-lg tracking-wide transition-all duration-300 ${
                isSuccess
                  ? "border-rose-400/90 shadow-[0_0_25px_rgba(212,96,122,0.45)] ring-1 ring-rose-400"
                  : isShaking
                  ? "border-rose-500/80 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  : ""
              }`}
              autoComplete="off"
              maxLength={30}
              style={{ fontSize: "16px" /* prevent iOS zoom */ }}
            />

            {/* Success checkmark badge */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-300 text-lg"
                >
                  🥰
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cute feedback / error message */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                key={errorMsg}
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm font-sans text-rose-300/90 bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-2.5 shadow-lg"
              >
                {errorMsg}
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm font-sans text-rose-200 bg-rose-900/30 border border-rose-400/40 rounded-xl px-4 py-2.5 shadow-lg"
              >
                Aww, you got it! My whole heart is yours 🥰❤️
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: 1,
              scale: isSuccess ? [1, 1.03, 1] : 1,
            }}
            transition={{ repeat: isSuccess ? Infinity : 0, duration: 2 }}
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`btn-glow w-full py-4 sm:py-5 rounded-2xl font-sans font-medium tracking-widest text-warm-white text-sm relative z-10 touch-manipulation transition-all duration-500 ${
                isSuccess
                  ? "shadow-[0_0_35px_rgba(212,96,122,0.6)] ring-2 ring-rose-300/50"
                  : ""
              }`}
            >
              <span className="relative z-10">
                {isSuccess ? "Open your surprise ✨" : "Unlock surprise ✨"}
              </span>
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-muted text-xs mt-8 sm:mt-10 font-sans"
        >
          Made with love, just for you ❤️
        </motion.p>
      </motion.div>
    </div>
  );
}
