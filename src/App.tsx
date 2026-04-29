import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import {
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,

} from 'lucide-react';

// --- TYPES ---
interface QuizQuestion {
  id: number;
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

// --- DATA ---
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    sentence: "By the time I arrived at the station, the train _______.",
    options: ["left", "had left", "has left"],
    correct: 1,
    explanation: "We use 'had left' because the train departing happened BEFORE I arrived."
  },
  {
    id: 2,
    sentence: "¿Cuál es la estructura correcta para el NEGATIVO del Past Perfect?",
    options: ["Had not + Verb (Present)", "Has not + Verb (Past)", "Had not + Past Participle"],
    correct: 2,
    explanation: "The negative formula is always HAD + NOT + PARTICIPLE (3rd column)."
  },
  {
    id: 3,
    sentence: "He realized he _______ his keys at the office.",
    options: ["forgot", "had forgotten", "has forgotten"],
    correct: 1,
    explanation: "Forgetting the keys happened before he realized it."
  },
  {
    id: 4,
    sentence: "¿Cuándo usamos principalmente el Past Perfect?",
    options: ["Para acciones que pasan ahora", "Para el 'pasado del pasado'", "Para planes futuros"],
    correct: 1,
    explanation: "We use it for the action that finished FIRST between two past events."
  },
  {
    id: 5,
    sentence: "¿Cuál es la forma correcta de hacer una PREGUNTA?",
    options: ["Had + Subject + Participle?", "Subject + Had + Participle?", "Did + Subject + Had?"],
    correct: 0,
    explanation: "In questions, the auxiliary HAD always comes first."
  },
  {
    id: 6,
    sentence: "The grass was yellow because it _______ for weeks.",
    options: ["didn't rain", "hadn't rained", "hasn't rained"],
    correct: 1,
    explanation: "The lack of rain happened before the grass turned yellow."
  },
  {
    id: 7,
    sentence: "They _______ already _______ when I called them.",
    options: ["have / left", "did / leave", "had / left"],
    correct: 2,
    explanation: "They left before the call took place."
  },
  {
    id: 8,
    sentence: "She was tired because she _______ all day.",
    options: ["had worked", "has worked", "works"],
    correct: 0,
    explanation: "She worked all day before feeling tired."
  },
  {
    id: 9,
    sentence: "When you see the expression 'By the time', which tense usually accompanies it for the earliest action?",
    options: ["Present Perfect", "Past Simple", "Past Perfect"],
    correct: 2,
    explanation: "'By the time' usually introduces one action in Past Simple and the other in Past Perfect."
  },
  {
    id: 10,
    sentence: "The teacher _______ the lesson when I entered the classroom.",
    options: ["started", "had started", "was starting"],
    correct: 1,
    explanation: "The lesson had already started before I entered."
  },
  {
    id: 11,
    sentence: "Which of these is a correct IRREGULAR participle?",
    options: ["Eated", "Ate", "Eaten"],
    correct: 2,
    explanation: "Eaten is the participle (3rd column) of the verb eat."
  },
  {
    id: 12,
    sentence: "I _______ never _______ such a beautiful place before I went to Hawaii.",
    options: ["had / seen", "have / seen", "did / see"],
    correct: 0,
    explanation: "It is a previous experience relative to a point in the past."
  },
  {
    id: 13,
    sentence: "When I arrived home, my sister _______ the dinner.",
    options: ["had cooked", "cooked", "was cooking"],
    correct: 0,
    explanation: "She had finished dinner before my arrival."
  },
  {
    id: 14,
    sentence: "Which word is NOT typically used with the Past Perfect?",
    options: ["Already", "Never", "Tomorrow"],
    correct: 2,
    explanation: "Tomorrow is for the future, not for the past of the past."
  },
  {
    id: 15,
    sentence: "Affirmative form: 'She _______ to the store before it closed.'",
    options: ["has went", "had gone", "had went"],
    correct: 1,
    explanation: "The participle of 'go' is 'gone'. 'Went' is past simple."
  },
  {
    id: 16,
    sentence: "I _______ already _______ the house when it started to rain.",
    options: ["had / left", "has / left", "did / leave"],
    correct: 0,
    explanation: "I left the house BEFORE it started to rain."
  },
  {
    id: 17,
    sentence: "What is the ONLY auxiliary used for all subjects (I, You, He, She, They) in this tense?",
    options: ["Has", "Have", "Had"],
    correct: 2,
    explanation: "Unlike Present Perfect, we always use HAD for all subjects here."
  },
  {
    id: 18,
    sentence: "She hadn't _______ that movie before last night.",
    options: ["saw", "seen", "see"],
    correct: 1,
    explanation: "Be careful: the participle of 'see' is 'seen'."
  },
  {
    id: 19,
    sentence: "The phone _______ ringing by the time I found it.",
    options: ["had stopped", "has stopped", "stopped"],
    correct: 0,
    explanation: "The phone stopped ringing before I found it."
  },
  {
    id: 20,
    sentence: "Identify the error in: 'I had went to the park yesterday.'",
    options: ["Missing 'already'", "Auxiliary should be 'has'", "The participle of 'go' is 'gone', not 'went'"],
    correct: 2,
    explanation: "'Went' is past simple. In Past Perfect we need the 3rd column: 'gone'."
  },
  {
    id: 21,
    sentence: "She _______ for three hours before she decided to take a break.",
    options: ["has studied", "studied", "had studied"],
    correct: 2,
    explanation: "She studied before the decision to take a break."
  },
  {
    id: 22,
    sentence: "The cake was burnt because I _______ the oven on too high.",
    options: ["had set", "set", "was setting"],
    correct: 0,
    explanation: "Setting the oven happened before the cake got burnt."
  },
  {
    id: 23,
    sentence: "By the time they arrived, we _______ everything.",
    options: ["finished", "had finished", "have finished"],
    correct: 1,
    explanation: "We finished everything before their arrival."
  },
  {
    id: 24,
    sentence: "I didn't have any money because I _______ my wallet at home.",
    options: ["left", "have left", "had left"],
    correct: 2,
    explanation: "Leaving the wallet happened before not having money."
  },
  {
    id: 25,
    sentence: "Had your brother _______ to you before he moved to London?",
    options: ["speak", "spoke", "spoken"],
    correct: 2,
    explanation: "We need the past participle 'spoken' after 'Had'."
  },
  {
    id: 26,
    sentence: "They _______ never _______ a professional football match before yesterday.",
    options: ["had / seen", "have / seen", "did / see"],
    correct: 0,
    explanation: "It refers to a lack of experience before a specific past event."
  },
  {
    id: 27,
    sentence: "The streets were wet because it _______ a lot during the night.",
    options: ["had rained", "rained", "was raining"],
    correct: 0,
    explanation: "It rained before the observation that streets were wet."
  },
  {
    id: 28,
    sentence: "When we got home, we saw that someone _______ in through the window.",
    options: ["broke", "has broken", "had broken"],
    correct: 2,
    explanation: "The break-in happened before we got home."
  },
  {
    id: 29,
    sentence: "He was happy because he _______ his exams.",
    options: ["had passed", "passed", "has passed"],
    correct: 0,
    explanation: "Passing the exams happened before he was happy."
  },
  {
    id: 30,
    sentence: "Why had she _______ so much work before the meeting started?",
    options: ["do", "did", "done"],
    correct: 2,
    explanation: "'Done' is the past participle used with 'had'."
  },
  {
    id: 31,
    sentence: "I _______ never _______ that kind of food before I visited Japan.",
    options: ["had / tried", "have / tried", "did / try"],
    correct: 0,
    explanation: "Trying the food was a previous experience to the visit."
  },
  {
    id: 32,
    sentence: "The house was quiet because everyone _______ to bed.",
    options: ["went", "had gone", "has gone"],
    correct: 1,
    explanation: "Everyone went to bed before the house became quiet."
  },
  {
    id: 33,
    sentence: "They were late because their car _______ down.",
    options: ["broke", "had broken", "was breaking"],
    correct: 1,
    explanation: "The car breaking down happened before they were late."
  },
  {
    id: 34,
    sentence: "By the time the police arrived, the thieves _______.",
    options: ["escaped", "have escaped", "had escaped"],
    correct: 2,
    explanation: "The escape happened before the police arrival."
  },
  {
    id: 35,
    sentence: "I was hungry as I _______ anything since breakfast.",
    options: ["didn't eat", "hadn't eaten", "haven't eaten"],
    correct: 1,
    explanation: "Not eating happened before the feeling of hunger."
  }
];

const SectionTitle = ({ children, color = "bg-blue-500" }: { children: React.ReactNode, color?: string }) => (
  <div className={`inline-block px-6 py-2 ${color} comic-border-style -rotate-2 mb-8`}>
    <h2 className="text-4xl font-comic text-white tracking-widest uppercase">{children}</h2>
  </div>
);

const ComicPanel = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={`comic-panel mb-12 ${className}`}
  >
    <div className="absolute inset-0 halftone pointer-events-none" />
    {children}
  </motion.div>
);

export default function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Shuffle questions on mount
  const shuffleQuestions = () => {
    // Tomamos exactamente 10 preguntas aleatorias
    const shuffled = [...QUIZ_QUESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  React.useEffect(() => {
    shuffleQuestions();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handleOptionClick = (index: number) => {
    if (showFeedback || !questions.length || isFinished) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === questions[currentQuestion].correct) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    // Si todavía no estamos en la última pregunta (índice 9 para 10 preguntas)
    if (currentQuestion < 9) {
      setSelectedOption(null);
      setShowFeedback(false);
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Al terminar la pregunta 10, mostramos resultados
      setIsFinished(true);
    }
  };

  const isCorrect = questions.length > 0 && selectedOption === questions[currentQuestion].correct;

  if (!questions.length) return <div className="min-h-screen bg-yellow-400 flex items-center justify-center font-comic text-4xl p-10 text-center border-8 border-black shadow-[20px_20px_0px_#000]">LOADING GRAMMAR MISSION...</div>;

  const getRank = () => {
    if (correctCount === 10) return { title: "GRAMMAR LEGEND", color: "text-yellow-400" };
    if (correctCount >= 8) return { title: "TIME HERO", color: "text-blue-400" };
    if (correctCount >= 5) return { title: "VIGILANTE", color: "text-green-400" };
    return { title: "RECRUIT", color: "text-red-400" };
  };

  return (
    <div className="min-h-screen relative overflow-hidden comic-grid">
      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 halftone pointer-events-none"
        style={{ translateY: bgY }}
      />

      {/* Floating Onomatopoeias */}
      <Onomatopoeia text="POW!" top="10%" left="5%" delay={1} color="text-yellow-400" />
      <Onomatopoeia text="ZAP!" top="40%" right="5%" delay={2} color="text-blue-400" />
      <Onomatopoeia text="BAM!" bottom="20%" left="8%" delay={1.5} color="text-red-400" />
      <Onomatopoeia text="WOW!" bottom="5%" right="10%" delay={0.5} color="text-green-400" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-4 bg-red-600 z-50 origin-left border-b-2 border-black"
        style={{ scaleX }}
      />

      <main className="max-w-4xl mx-auto px-4 py-24 relative z-10">

        {/* HERO SECTION */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block bg-white comic-border-style p-12 mb-6 relative"
          >
            <div className="absolute -top-10 -right-10 bg-yellow-400 text-black p-4 comic-border-style rotate-12 font-comic text-2xl">
              ACTION!
            </div>
            <h1 className="text-7xl md:text-9xl font-comic tracking-tighter uppercase leading-none">
              The <span className="text-red-600">Past</span> <br />
              <span className="text-blue-600">Perfect</span>
            </h1>
            <p className="font-comic text-2xl mt-4 text-slate-600 italic">"The Past of the Past!"</p>
          </motion.div>
        </div>

        {/* DEFINITION SECTION */}
        <ComicPanel className="bg-white overflow-hidden">
          <SectionTitle>What on earth is this? (For Dummies)</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 items-center font-comic">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="bg-yellow-100 p-4 border-2 border-black rotate-1">
                <p className="text-2xl leading-tight">
                  Imagine the past is a line... <br />
                  <span className="text-red-600 text-3xl font-black">THE PAST PERFECT IS WHO GOT THERE FIRST.</span>
                </p>
              </div>
              <p className="text-xl text-slate-700">
                It's the <span className="underline decoration-blue-500 decoration-4">Past of the Past</span>. We use it to say that something had already finished before something else happened.
              </p>
              <div className="bg-blue-600 text-white p-2 text-center -rotate-1">
                Example: "When I arrived (Past), she HAD ALREADY LEFT (Past Perfect)."
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-slate-50 p-6 comic-border-style rotate-1 relative"
            >
              <div className="absolute -top-4 -left-4 bg-red-600 text-white px-3 py-1 font-comic text-xl">THE MAGIC FORMULA</div>
              <div className="flex flex-col gap-2 font-mono text-3xl font-black bg-white p-6 border-2 border-black text-center">
                <span className="text-red-600">HAD</span>
                <span className="text-sm font-sans font-normal">+</span>
                <span className="text-blue-600 uppercase">PARTICIPLE</span>
              </div>
              <p className="text-center font-sans text-sm mt-2 text-slate-500">(The participle is the 3rd column of verbs: gone, eaten, seen...)</p>
            </motion.div>
          </div>
        </ComicPanel>


        {/* VERB TABLE SECTION */}
        <ComicPanel className="bg-slate-100">
          <SectionTitle color="bg-cyan-600">The Verb Vault</SectionTitle>
          <p className="font-comic text-xl mb-6 italic">"You need the 3rd column for Past Perfect magic!"</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse comic-border-style bg-white overflow-hidden">
              <thead>
                <tr className="bg-slate-800 text-white font-comic uppercase tracking-widest text-lg">
                  <th className="p-4 border-2 border-black">Present</th>
                  <th className="p-4 border-2 border-black">Past Simple</th>
                  <th className="p-4 border-2 border-black bg-blue-600">Participle (3rd)</th>
                </tr>
              </thead>
              <tbody className="font-bold text-center">
                {[
                  { pres: "Eat", past: "Ate", part: "Eaten" },
                  { pres: "Go", past: "Went", part: "Gone" },
                  { pres: "See", past: "Saw", part: "Seen" },
                  { pres: "Do", past: "Did", part: "Done" },
                  { pres: "Write", past: "Wrote", part: "Written" },
                  { pres: "Take", past: "Took", part: "Taken" },
                  { pres: "Forget", past: "Forgot", part: "Forgotten" },
                  { pres: "Leave", past: "Left", part: "Left" },
                ].map((verb, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="p-3 border-2 border-black">{verb.pres}</td>
                    <td className="p-3 border-2 border-black">{verb.past}</td>
                    <td className="p-3 border-2 border-black bg-blue-50 text-blue-700">{verb.part}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            * Remember: Regular verbs just end in -ED (Worked, Walked, Answered).
          </p>
        </ComicPanel>

        {/* HOW TO USE SECTION */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="comic-panel bg-green-50 rotate-1">
            <div className="bg-green-600 text-white font-comic px-2 py-1 absolute -top-4 left-4 border-2 border-black">✅ AFFIRMATIVE</div>
            <p className="font-bold text-center mt-4">Subject + <span className="text-red-600">HAD</span> + 3rd column verb</p>
            <p className="text-sm italic mt-4 bg-white p-2 border border-black">"I had eaten sushi."</p>
          </div>

          <div className="comic-panel bg-red-50 -rotate-1">
            <div className="bg-red-600 text-white font-comic px-2 py-1 absolute -top-4 left-4 border-2 border-black">❌ NEGATIVE</div>
            <p className="font-bold text-center mt-4">Subject + <span className="text-red-600">HADN'T</span> + 3rd column verb</p>
            <p className="text-sm italic mt-4 bg-white p-2 border border-black">"She hadn't studied."</p>
          </div>

          <div className="comic-panel bg-blue-50 rotate-1">
            <div className="bg-blue-600 text-white font-comic px-2 py-1 absolute -top-4 left-4 border-2 border-black">❓ QUESTION</div>
            <p className="font-bold text-center mt-4"><span className="text-red-600">HAD</span> + Subject + 3rd column verb?</p>
            <p className="text-sm italic mt-4 bg-white p-2 border border-black">"Had they arrived?"</p>
          </div>
        </div>

        {/* WHEN TO USE SECTION */}
        <ComicPanel className="bg-yellow-50">
          <SectionTitle color="bg-orange-500">When do we use this thing?</SectionTitle>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-comic">1</div>
              <div>
                <h4 className="font-comic text-2xl">To bring order to chaos</h4>
                <p>If you're telling two things that happened yesterday, the Past Perfect marks the one that happened FIRST. Without it, we wouldn't know the order!</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-comic">2</div>
              <div>
                <h4 className="font-comic text-2xl">With "spy" words</h4>
                <p>Look for it when you see: <span className="font-bold underline italic text-blue-700">Before, After, By the time, Already.</span></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-comic">3</div>
              <div>
                <h4 className="font-comic text-2xl">Excuses and regrets</h4>
                <p>Ideal for explaining why something DIDN'T happen: "I couldn't go because I <span className="font-bold">had already</span> bought tickets for the movies."</p>
              </div>
            </div>
          </div>
        </ComicPanel>

        {/* MORE EXAMPLES SECTION */}
        <ComicPanel>
          <SectionTitle color="bg-purple-600">Example Gallery</SectionTitle>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="speech-bubble bg-white">
                <p className="text-lg">"The battery <span className="text-red-600 font-black">HAD DIED</span> before I finished the call."</p>
                <p className="text-xs text-slate-500 mt-1 uppercase font-comic">1. Battery dies | 2. Call ends</p>
              </div>
              <div className="speech-bubble bg-blue-50">
                <p className="text-lg">"I recognized her because I <span className="text-blue-600 font-black">HAD SEEN</span> her on TV."</p>
                <p className="text-xs text-slate-500 mt-1 uppercase font-comic">1. Saw her on TV | 2. Recognized her</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="speech-bubble bg-yellow-50">
                <p className="text-lg">"We <span className="text-orange-600 font-black">HAD ALREADY PAID</span> the bill when they offered us a discount."</p>
                <p className="text-xs text-slate-500 mt-1 uppercase font-comic">Bad luck! We paid first.</p>
              </div>
              <div className="speech-bubble bg-red-50">
                <p className="text-lg">"He was sad because he <span className="text-red-700 font-black">HAD LOST</span> his dog."</p>
                <p className="text-xs text-slate-500 mt-1 uppercase font-comic">1. Lost the dog | 2. He was sad</p>
              </div>
            </div>
          </div>
        </ComicPanel>

        {/* TIMELINE SECTION */}
        <ComicPanel className="bg-blue-50">
          <SectionTitle color="bg-red-600">Time Travel</SectionTitle>
          <div className="relative py-20 px-4">
            <div className="h-4 bg-black w-full absolute top-1/2 left-0 -translate-y-1/2 rounded-full" />

            <div className="grid grid-cols-3 gap-4 relative z-10">
              <TimelinePoint
                title="Action A"
                desc="Past Perfect"
                color="bg-red-600"
                delay={0.2}
                isAction
              />
              <TimelinePoint
                title="Action B"
                desc="Past Simple"
                color="bg-blue-600"
                delay={0.4}
                isAction
              />
              <div className="flex flex-col items-center justify-end h-full">
                <motion.div
                  className="font-comic text-4xl uppercase text-slate-400"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Now
                </motion.div>
              </div>
            </div>
          </div>
        </ComicPanel>

        {/* QUIZ SECTION */}
        <ComicPanel className="bg-slate-900 border-yellow-400 min-h-[600px] flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <SectionTitle color="bg-yellow-400">Challenge Mode!</SectionTitle>
            <div className="bg-white text-black font-comic px-4 py-2 comic-border-style">
              {isFinished ? 'MISSION COMPLETE' : `STEP: ${currentQuestion + 1}/${questions.length}`}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentQuestion}
                initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.1, opacity: 0, rotate: 5 }}
                className="space-y-8 flex-1"
              >
                <div className="text-3xl font-black bg-slate-800 p-10 comic-border-style border-white text-white leading-tight">
                  "{questions[currentQuestion].sentence}"
                </div>

                <div className="grid gap-6">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <QuizButton
                      key={idx}
                      text={option}
                      index={idx}
                      selected={selectedOption === idx}
                      isCorrect={idx === questions[currentQuestion].correct}
                      showFeedback={showFeedback}
                      onClick={() => handleOptionClick(idx)}
                    />
                  ))}
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 comic-border-style border-white flex flex-col md:flex-row gap-6 ${isCorrect ? 'bg-green-600' : 'bg-red-600'} text-white`}
                  >
                    <div className="shrink-0 flex items-center justify-center">
                      {isCorrect ? <CheckCircle2 className="w-16 h-16" /> : <XCircle className="w-16 h-16" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-comic text-3xl uppercase mb-2">{isCorrect ? 'Incredible!' : 'Watch out!'}</h4>
                      <p className="text-white text-lg font-medium opacity-90 mb-4">{questions[currentQuestion].explanation}</p>
                      <button
                        onClick={nextQuestion}
                        className="bg-black text-white px-8 py-3 font-comic text-xl uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors comic-border-style border-white"
                      >
                        {currentQuestion === questions.length - 1 ? 'Finish Mission' : 'Next Panel'} <ArrowRight className="inline ml-2" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="text-8xl mb-4">🏆</div>
                <h3 className="text-5xl font-comic text-white uppercase tracking-tighter">Mission Complete</h3>

                <div className="space-y-2">
                  <p className="text-2xl text-slate-400 font-comic uppercase">Your Rank:</p>
                  <p className={`text-7xl font-comic uppercase tracking-widest ${getRank().color}`}>
                    {getRank().title}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-slate-800 p-6 comic-border-style border-green-500">
                    <p className="text-xl text-slate-400 font-comic uppercase">Correct</p>
                    <p className="text-4xl text-green-500 font-black">{correctCount}</p>
                  </div>
                  <div className="bg-slate-800 p-6 comic-border-style border-red-500">
                    <p className="text-xl text-slate-400 font-comic uppercase">Wrong</p>
                    <p className="text-4xl text-red-500 font-black">{questions.length - correctCount}</p>
                  </div>
                </div>

                <button
                  onClick={shuffleQuestions}
                  className="bg-yellow-400 text-black px-12 py-4 font-comic text-2xl uppercase tracking-widest hover:bg-white transition-all comic-border-style"
                >
                  Restart Mission
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </ComicPanel>

        {/* FOOTER */}
        <footer className="text-center mt-32">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="bg-black text-white px-8 py-4 inline-block -rotate-1 cursor-pointer"
          >
            <span className="font-comic text-3xl tracking-widest uppercase">THE END?</span>
          </motion.div>
          <p className="mt-4 font-comic uppercase text-slate-500">To be continued in your next English class...</p>
        </footer>

      </main>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function Onomatopoeia({ text, top, left, right, bottom, delay, color }: any) {
  return (
    <motion.span
      className={`onomatopoeia ${color}`}
      style={{ top, left, right, bottom }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [-5, 5, -5],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        delay
      }}
    >
      {text}
    </motion.span>
  );
}

function TimelinePoint({ title, desc, color, delay, isAction }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <div className={`w-8 h-8 ${color} border-4 border-black rounded-full mb-6 z-20`} />
      <div className="bg-white p-4 comic-border-style text-center relative">
        {isAction && <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 ${color} rotate-45 border-t-2 border-l-2 border-black`} />}
        <span className={`font-black block text-xl ${color.replace('bg-', 'text-')}`}>{title}</span>
        <span className="text-sm font-bold opacity-60 uppercase">{desc}</span>
      </div>
    </motion.div>
  );
}

function QuizButton({ text, index, selected, isCorrect, showFeedback, onClick }: any) {
  const shake = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  return (
    <motion.button
      disabled={showFeedback}
      onClick={onClick}
      animate={showFeedback && selected && !isCorrect ? shake : {}}
      className={`
        p-6 text-left font-black text-2xl transition-all comic-border-style border-white relative group
        ${selected ? (isCorrect ? 'bg-green-600 scale-105' : 'bg-red-600') : 'bg-slate-800 hover:bg-slate-700'}
        ${showFeedback && isCorrect ? 'bg-green-600' : ''}
        text-white
      `}
    >
      <div className="flex items-center gap-4">
        <span className="text-yellow-400 font-comic text-3xl opacity-50">{index + 1}</span>
        <span>{text}</span>
      </div>
      {showFeedback && isCorrect && selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white"
        >
          <Zap fill="white" />
        </motion.div>
      )}
    </motion.button>
  );
}

