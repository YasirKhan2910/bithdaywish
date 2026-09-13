import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ParticleBackground from "./components/ParticleBackground";
import FloatingHearts from "./components/FloatingHearts";
import MusicPlayer from "./components/MusicPlayer";
import CursorGlow from "./components/CursorGlow";

import NameInput from "./stages/NameInput";
import WelcomeScreen from "./stages/WelcomeScreen";
import InteractiveQuestion from "./stages/InteractiveQuestion";
import DistanceAnimation from "./stages/DistanceAnimation";
import EmotionalMessage from "./stages/EmotionalMessage";
import BirthdayReveal from "./stages/BirthdayReveal";
import LoveLetter from "./stages/LoveLetter";
import FinalReveal from "./stages/FinalReveal";

type Stage =
  | "name-input"
  | "welcome"
  | "question"
  | "distance"
  | "emotional"
  | "birthday"
  | "letter"
  | "final";

const STAGE_ORDER: Stage[] = [
  "name-input",
  "welcome",
  "question",
  "distance",
  "emotional",
  "birthday",
  "letter",
  "final",
];

// Particle intensity per stage
const INTENSITY: Record<Stage, "low" | "medium" | "high"> = {
  "name-input": "medium",
  welcome: "medium",
  question: "low",
  distance: "low",
  emotional: "medium",
  birthday: "high",
  letter: "low",
  final: "medium",
};

// Floating hearts visibility
const SHOW_HEARTS: Record<Stage, boolean> = {
  "name-input": false,
  welcome: false,
  question: false,
  distance: false,
  emotional: true,
  birthday: true,
  letter: true,
  final: true,
};

export default function App() {
  const [stage, setStage] = useState<Stage>("name-input");
  const [name, setName] = useState<string>("");
  const [musicVisible, setMusicVisible] = useState(false);

  const advance = () => {
    const idx = STAGE_ORDER.indexOf(stage);
    if (idx < STAGE_ORDER.length - 1) {
      setStage(STAGE_ORDER[idx + 1]);
    }
  };

  const handleNameSubmit = (n: string) => {
    setName(n);
    setMusicVisible(true); // show music player after first interaction
    advance();
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, filter: "blur(4px)" },
  };

  const pageTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <div className="relative min-h-screen bg-midnight overflow-x-hidden">
      {/* Persistent layers */}
      <CursorGlow />
      <ParticleBackground intensity={INTENSITY[stage]} />
      {SHOW_HEARTS[stage] && (
        <FloatingHearts count={stage === "birthday" ? 20 : 12} intense={stage === "birthday"} />
      )}
      <MusicPlayer visible={musicVisible} />

      {/* Stage content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="relative z-10 min-h-screen"
        >
          {stage === "name-input" && (
            <NameInput onSubmit={handleNameSubmit} />
          )}
          {stage === "welcome" && (
            <WelcomeScreen name={name} onContinue={advance} />
          )}
          {stage === "question" && (
            <InteractiveQuestion onContinue={advance} />
          )}
          {stage === "distance" && (
            <DistanceAnimation onContinue={advance} />
          )}
          {stage === "emotional" && (
            <EmotionalMessage name={name} onContinue={advance} />
          )}
          {stage === "birthday" && (
            <BirthdayReveal name={name} onContinue={advance} />
          )}
          {stage === "letter" && (
            <LoveLetter name={name} onContinue={advance} />
          )}
          {stage === "final" && (
            <FinalReveal name={name} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      {stage !== "name-input" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex gap-2"
        >
          {STAGE_ORDER.slice(1).map((s) => {
            const idx = STAGE_ORDER.indexOf(s);
            const currentIdx = STAGE_ORDER.indexOf(stage);
            return (
              <div
                key={s}
                className={`rounded-full transition-all duration-500 ${
                  idx === currentIdx
                    ? "w-6 h-1.5 bg-rose-400"
                    : idx < currentIdx
                    ? "w-1.5 h-1.5 bg-rose-600/60"
                    : "w-1.5 h-1.5 bg-white/10"
                }`}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
