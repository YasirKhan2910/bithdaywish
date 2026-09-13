// ============================================================
//  PERSONALIZATION CONFIG
//  Edit this file to customize the entire experience.
// ============================================================

export const config = {
  // Her name — pre-filled but she can also type it on the landing screen
  herName: "Induu",

  // Your name — used to sign the love letter
  myName: "Your Jaan",

  // Countries
  myCountry: "India",
  herCountry: "Miami",
  myFlag: "🇮🇳",
  herFlag: "🇺🇸",

  // Optional: birthday date string shown in the reveal
  birthdayDate: "September 14",

  // Background music — royalty-free romantic piano
  // Replace with your own URL if desired
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749b95b.mp3?filename=romantic-piano-120007.mp3",
  musicLabel: "♪ Our Song",

  // ── Interactive question choices ─────────────────────────
  questionChoices: [
    { emoji: "❤️", label: "Your favorite person" },
    { emoji: "✨", label: "Our memories" },
    { emoji: "🌙", label: "Random late-night conversations" },
    { emoji: "🥹", label: "The little things" },
  ],

  // ── Emotional message (Stage 4) ──────────────────────────
  emotionalLines: [
    "Happy Birthday, meri Jaanam ❤️",
    "Sometimes I wish distance was something we could simply close with our hands.",
    "Because honestly...",
    "It is really hard living without you.",
    "Hard not being able to see you whenever I want.",
    "Hard not being able to hold you when I miss you.",
    "Hard having so many things I want to tell you and having an entire ocean between us.",
    "But even with all these miles between us...",
    "You are still one of the closest people to my heart.",
    "I miss your presence.",
    "I miss your voice.",
    "I miss the little moments.",
    "And more than anything...",
    "I miss the feeling of simply having you beside me.",
    "But distance has taught me something.",
    "Love isn't measured in kilometers.",
    "It is measured by how much someone stays in your heart...",
    "Even when they're far away.",
    "Miami may have you right now...",
    "But a very big piece of my heart is with you, my Jaanam. ❤️",
  ],

  // ── Birthday reveal message (Stage 5) ────────────────────
  birthdayLines: [
    "Today is all about celebrating you, my Jaanam.",
    "You deserve all the happiness, love, peace",
    "and beautiful moments this world can give you.",
  ],

  // ── Love letter paragraphs (Stage 6) ─────────────────────
  loveLetter: {
    greeting: "My dearest Induu, my Jaanam ❤️,",
    paragraphs: [
      "There are days when I sit here, thousands of miles away, and I think about you so much that the distance feels almost physical — like a weight on my chest that doesn't lift.",
      "I think about the sound of your voice. The way you laugh. The little things you say that I replay in my head when everything else goes quiet. And on days like today — your birthday — I feel it more than ever.",
      "I wish I could be there. I wish I could surprise you at your door, watch your eyes go wide, and see that smile that I think about more than you know. I wish I could hand you flowers and make you breakfast and sit beside you and make absolutely ordinary moments feel extraordinary, just because you were in them.",
      "But I can't be there. And that's the hardest part of loving someone across an ocean. You learn to carry them with you instead. In every quiet evening, in every song that reminds you of them, in every moment where you think — 'I wish she were here.'",
      "What I can tell you is this: the distance hasn't made me love you less. If anything, it has made me more certain. More certain that you are someone I don't ever want to lose. More certain that what I feel is real, and not something that miles or time zones can dilute.",
      "You deserve someone who shows up for you. And even from here, I am trying to show up — in every message, every late night, every moment I choose you even when it would be easier not to.",
      "I look forward to the day we don't have to say goodbye through a screen. When we can exist in the same room, in the same city, in the same ordinary Tuesday. I am already in love with that version of our story.",
      "Until then — I want you to know that on your birthday, you are the first thing I thought of when I woke up. And that across every timezone and every mile between us, someone is thinking of you, rooting for you, and missing you more than words can really hold.",
      "You deserve the world, meri Jaanam. Every single piece of it.",
    ],
    closing: "Until I can finally celebrate your birthday beside you...\nI'll keep loving you from here.",
    signature: "Happy Birthday, meri Jaanam. ❤️",
  },

  // ── Final reveal lines (Stage 7) ─────────────────────────
  finalLines: [
    "If I could make one birthday wish for myself...",
    "I wouldn't wish for anything for me.",
    "I'd wish for more time with you.",
    "More conversations.",
    "More laughter.",
    "More memories.",
    "More ordinary days together.",
    "And someday...",
    "No distance.",
    "Just you and me.",
  ],
  finalSignoff: (name: string) =>
    `Someone in India is missing you, ${name} (meri Jaanam), a little more than usual tonight. ❤️`,
};
