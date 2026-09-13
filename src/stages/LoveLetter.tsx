import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { config } from "../config";

interface LoveLetterProps {
  name: string;
  onContinue: () => void;
}

function LetterParagraph({ text, name, index }: { text: string; name: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="font-script text-base sm:text-lg text-warm-white/75 leading-loose"
    >
      {text.replace("[NAME]", name)}
    </motion.p>
  );
}

export default function LoveLetter({ name, onContinue }: LoveLetterProps) {
  const { greeting, paragraphs, closing, signature } = config.loveLetter;
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 py-16 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-12"
      >
        <p className="text-muted text-xs tracking-[0.3em] uppercase mb-3 font-sans">
          A little something
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl gradient-text-rose">
          from my heart...
        </h2>
        <div className="divider-rose w-32 mx-auto mt-5" />
      </motion.div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="letter-paper rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 max-w-2xl w-full relative overflow-hidden shadow-2xl"
      >
        {/* Decorative corner */}
        <div
          className="absolute top-0 left-0 w-20 h-20 opacity-20"
          style={{
            background: "radial-gradient(circle at 0 0, rgba(212,96,122,0.6), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-20 h-20 opacity-20"
          style={{
            background: "radial-gradient(circle at 100% 100%, rgba(240,192,112,0.4), transparent)",
          }}
        />

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-script text-xl sm:text-2xl text-rose-300 mb-6"
        >
          {greeting}
        </motion.p>

        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <LetterParagraph
              key={i}
              text={p}
              name={name}
              index={i}
            />
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-10 pt-8 border-t border-rose-500/10 space-y-2"
          onAnimationComplete={() => setTimeout(() => setShowButton(true), 800)}
        >
          <p className="font-script text-base sm:text-lg text-warm-white/60 leading-relaxed whitespace-pre-line">
            {closing}
          </p>
          <p className="font-script text-xl sm:text-2xl gradient-text-rose mt-4">
            {signature}
          </p>
          <p className="font-script text-base text-soft-pink/60 mt-2">
            — {config.myName} ❤️
          </p>
        </motion.div>
      </motion.div>

      {/* Continue */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-glow px-10 py-4 rounded-full text-sm font-sans tracking-widest text-warm-white"
            style={{ cursor: "none" }}
          >
            <span className="relative z-10">One last thing... ❤️</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
