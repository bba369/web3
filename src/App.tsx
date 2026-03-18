import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  BookOpen, 
  Video, 
  Trophy, 
  Zap,
  Layout,
  Code,
  Shield,
  Database,
  Globe,
  Coins,
  Users,
  Rocket,
  Sun,
  Moon,
  Languages,
  X,
  HelpCircle,
  Award,
  Info,
  ArrowRight,
  ListChecks,
  MessageSquare,
  Send,
  Loader2,
  Sparkles,
  Volume2,
  VolumeX,
  Lock,
  Star,
  TrendingUp
} from 'lucide-react';
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import confetti from 'canvas-confetti';
import { ROADMAP_DATA } from './constants';
import { Phase, Day, QuizQuestion } from './types';

const STORAGE_KEY = 'web3_mastery_progress';
const THEME_KEY = 'web3_mastery_theme';
const LANG_KEY = 'web3_mastery_lang';
const XP_KEY = 'web3_mastery_xp';

type Language = 'en' | 'np';
type Theme = 'light' | 'dark';

export default function App() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');
  const [activeQuiz, setActiveQuiz] = useState<Phase | null>(null);
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({}); // phaseId -> passed
  const [isReading, setIsReading] = useState<number | null>(null);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [xp, setXp] = useState<number>(0);
  const [generatedDays, setGeneratedDays] = useState<Record<number, Day>>({});
  const [generatedQuizzes, setGeneratedQuizzes] = useState<Record<number, QuizQuestion[]>>({});
  const [generatingDays, setGeneratingDays] = useState<Record<number, boolean>>({});
  const [generatingQuizzes, setGeneratingQuizzes] = useState<Record<number, boolean>>({});

  // Gamification calculations
  const calculateLevel = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1;
  const currentLevel = calculateLevel(xp);
  const nextLevelXp = Math.pow(currentLevel, 2) * 100;
  const currentLevelBaseXp = Math.pow(currentLevel - 1, 2) * 100;
  const progressPercent = ((xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100;

  // Load settings from local storage
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    const savedLang = localStorage.getItem(LANG_KEY) as Language;
    const savedXp = localStorage.getItem(XP_KEY);
    const savedGeneratedDays = localStorage.getItem('web3_mastery_generated_days');
    const savedGeneratedQuizzes = localStorage.getItem('web3_mastery_generated_quizzes');

    if (savedProgress) setCompletedDays(JSON.parse(savedProgress));
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
    if (savedXp) setXp(parseInt(savedXp, 10));
    if (savedGeneratedDays) setGeneratedDays(JSON.parse(savedGeneratedDays));
    if (savedGeneratedQuizzes) setGeneratedQuizzes(JSON.parse(savedGeneratedQuizzes));
    
    setIsLoaded(true);
  }, []);

  // Save settings to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
      localStorage.setItem(THEME_KEY, theme);
      localStorage.setItem(LANG_KEY, lang);
      localStorage.setItem(XP_KEY, xp.toString());
      localStorage.setItem('web3_mastery_generated_days', JSON.stringify(generatedDays));
      localStorage.setItem('web3_mastery_generated_quizzes', JSON.stringify(generatedQuizzes));
    }
  }, [completedDays, theme, lang, xp, generatedDays, generatedQuizzes, isLoaded]);

  const toggleDay = (dayId: number) => {
    setCompletedDays(prev => {
      if (prev.includes(dayId)) {
        setXp(x => Math.max(0, x - 50));
        return prev.filter(id => id !== dayId);
      } else {
        setXp(x => x + 50);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#a855f7', '#3b82f6', '#10b981']
        });
        return [...prev, dayId];
      }
    });
  };

  const generateDayContent = async (phase: Phase, day: Day) => {
    setGeneratingDays(prev => ({ ...prev, [day.id]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `You are an expert Web3 instructor. Expand on the following basic lesson content for Phase ${phase.id}: "${phase.title}", Day ${day.id}: "${day.title}".
      
      Basic Content:
      ${day.lessonContent}
      
      Return a JSON object with the following structure:
      {
        "lessonContent": "Detailed markdown content for the lesson in English (at least 3 paragraphs)",
        "nepaliLessonContent": "Detailed markdown content for the lesson translated to Nepali",
        "vocabulary": [
          { "word": "English word", "definition": "English definition", "nepaliWord": "Nepali word", "nepaliDefinition": "Nepali definition" }
        ],
        "keyPoints": [
          { "point": "English key point", "nepaliPoint": "Nepali key point" }
        ]
      }
      
      Ensure the content is highly educational, accurate, and engaging. Return ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              lessonContent: { type: Type.STRING },
              nepaliLessonContent: { type: Type.STRING },
              vocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    definition: { type: Type.STRING },
                    nepaliWord: { type: Type.STRING },
                    nepaliDefinition: { type: Type.STRING }
                  }
                }
              },
              keyPoints: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    point: { type: Type.STRING },
                    nepaliPoint: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      setGeneratedDays(prev => ({
        ...prev,
        [day.id]: {
          ...day,
          ...data,
          isGenerated: true
        }
      }));
    } catch (error) {
      console.error("Failed to generate day content:", error);
    } finally {
      setGeneratingDays(prev => ({ ...prev, [day.id]: false }));
    }
  };

  const generateQuizContent = async (phase: Phase) => {
    setGeneratingQuizzes(prev => ({ ...prev, [phase.id]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `You are an expert Web3 instructor. Generate 5 multiple-choice quiz questions for Phase ${phase.id}: "${phase.title}".
      
      Return a JSON array of objects with the following structure:
      [
        {
          "question": "English question",
          "nepaliQuestion": "Nepali question",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "nepaliOptions": ["Option 1 in Nepali", "Option 2 in Nepali", "Option 3 in Nepali", "Option 4 in Nepali"],
          "correctAnswer": 0
        }
      ]
      
      Ensure the questions are challenging but fair, testing the core concepts of the phase. Return ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                nepaliQuestion: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                nepaliOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.INTEGER }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || "[]");
      const quizzesWithIds = data.map((q: any, idx: number) => ({
        ...q,
        id: phase.id * 100 + idx + 1
      }));
      
      setGeneratedQuizzes(prev => ({
        ...prev,
        [phase.id]: quizzesWithIds
      }));
    } catch (error) {
      console.error("Failed to generate quiz content:", error);
    } finally {
      setGeneratingQuizzes(prev => ({ ...prev, [phase.id]: false }));
    }
  };

  const toggleDayExpansion = (dayId: number) => {
    setExpandedDays(prev => {
      const isExpanding = !prev.includes(dayId);
      if (isExpanding) {
        // Find the day and phase to check if generation is needed
        let targetDay: Day | undefined;
        let targetPhase: Phase | undefined;
        for (const phase of ROADMAP_DATA) {
          const d = phase.days.find(d => d.id === dayId);
          if (d) {
            targetDay = d;
            targetPhase = phase;
            break;
          }
        }

        if (targetPhase && targetPhase.id >= 2 && targetDay && !generatedDays[dayId] && !generatingDays[dayId]) {
          generateDayContent(targetPhase, targetDay);
        }
        return [...prev, dayId];
      }
      return prev.filter(id => id !== dayId);
    });
  };

  const togglePhase = (phaseId: number) => {
    const phaseIdx = ROADMAP_DATA.findIndex(p => p.id === phaseId);
    const isLocked = phaseIdx > 0 && !quizResults[ROADMAP_DATA[phaseIdx - 1].id];
    
    if (isLocked) return;

    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId) 
        : [...prev, phaseId]
    );
  };

  const handleTextToSpeech = async (dayId: number, text: string) => {
    if (isReading === dayId) {
      if (audioSource) {
        audioSource.stop();
        setAudioSource(null);
      }
      setIsReading(null);
      return;
    }

    // Stop any existing audio
    if (audioSource) {
      audioSource.stop();
    }

    setIsReading(dayId);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this lesson content clearly: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // The data is 16-bit PCM. Convert it to Float32 for Web Audio API
        const buffer = new Int16Array(bytes.buffer);
        const float32Data = new Float32Array(buffer.length);
        for (let i = 0; i < buffer.length; i++) {
          float32Data[i] = buffer[i] / 32768.0;
        }

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const audioBuffer = audioContext.createBuffer(1, float32Data.length, 24000);
        audioBuffer.getChannelData(0).set(float32Data);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        
        setAudioSource(source);
        
        source.onended = () => {
          setIsReading(null);
          setAudioSource(null);
        };
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsReading(null);
    }
  };

  const progress = useMemo(() => {
    return Math.round((completedDays.length / 100) * 100);
  }, [completedDays]);

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  const t = (en: string, np: string) => (lang === 'en' ? en : np);

  const handleSendMessage = async () => {
    if (!aiInput.trim()) return;

    const userMessage = aiInput;
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsAILoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are a Web3 Mastery Assistant. You help students learn blockchain and Web3 based on the following roadmap: ${JSON.stringify(ROADMAP_DATA)}. 
          Your responses MUST be:
          1. Clean and clear.
          2. Concise (avoid unnecessary fluff).
          3. Well-formatted using Markdown (use bold for emphasis, bullet points for lists).
          4. Helpful and encouraging.
          
          If the question is in Nepali, answer in Nepali. If in English, answer in English.`,
        },
        contents: [{ role: 'user', parts: [{ text: userMessage }] }]
      });

      const aiText = response.text || "I'm sorry, I couldn't process that.";
      setAiMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setAiMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsAILoading(false);
    }
  };

  const getPhaseIcon = (phaseId: number) => {
    switch (phaseId) {
      case 1: return <Globe className="w-5 h-5" />;
      case 2: return <Code className="w-5 h-5" />;
      case 3: return <Zap className="w-5 h-5" />;
      case 4: return <Award className="w-5 h-5" />;
      case 5: return <Users className="w-5 h-5" />;
      case 6: return <Rocket className="w-5 h-5" />;
      case 7: return <Shield className="w-5 h-5" />;
      case 8: return <Layout className="w-5 h-5" />;
      case 9: return <Database className="w-5 h-5" />;
      case 10: return <Trophy className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-zinc-50 text-zinc-900'
    } font-sans selection:bg-purple-500/30`}>
      
      {/* Sticky Gamification Header */}
      <div className={`sticky top-0 z-50 border-b backdrop-blur-xl ${
        theme === 'dark' ? 'bg-[#050505]/80 border-white/10' : 'bg-white/80 border-zinc-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h1 className={`text-sm font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {t("Web3 Mastery", "Web3 मास्टरी")}
              </h1>
            </div>
            
            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <button 
                onClick={() => setLang(lang === 'en' ? 'np' : 'en')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
                }`}
                title="Toggle Language"
              >
                <Languages className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
                }`}
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border flex-1 sm:flex-none ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className={`text-[9px] font-bold uppercase tracking-widest leading-none ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Level {currentLevel}</p>
                <p className={`text-xs font-black leading-none mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{xp} XP</p>
              </div>
            </div>
            
            {/* Desktop Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => setLang(lang === 'en' ? 'np' : 'en')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
                }`}
                title="Toggle Language"
              >
                <Languages className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
                }`}
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header / Hero */}
      <header className={`relative overflow-hidden pt-16 pb-16 px-6 border-b ${
        theme === 'dark' ? 'border-white/5' : 'border-zinc-200'
      }`}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920&h=600" 
            alt="Hero Background"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              theme === 'dark' ? 'opacity-[0.07]' : 'opacity-[0.03]'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-[#050505]/0 via-[#050505]/50 to-[#050505]' 
              : 'bg-gradient-to-b from-zinc-50/0 via-zinc-50/50 to-zinc-50'
          }`} />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${
            theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-400/10'
          }`} />
          <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${
            theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/10'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.3)]"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 mb-6">
              {t("Web3 Mastery", "Web3 मास्टरी")}
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'
            }`}>
              {t(
                "Your 100-day journey from blockchain curious to decentralized architect. Track progress, take quizzes, and build the future.",
                "ब्लकचेन जिज्ञासु देखि विकेन्द्रीकृत आर्किटेक्ट सम्मको तपाईंको १०० दिने यात्रा। प्रगति ट्र्याक गर्नुहोस्, क्विजहरू लिनुहोस्, र भविष्य निर्माण गर्नुहोस्।"
              )}
            </p>
          </motion.div>

          {/* Progress Bar Section */}
          <motion.div 
            className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Global Progress */}
            <div className={`p-6 rounded-3xl border text-left ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex justify-between items-end mb-3">
                <span className={`text-sm font-medium uppercase tracking-widest ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>{t("Global Progress", "कुल प्रगति")}</span>
                <span className={`text-3xl font-bold tabular-nums ${
                  theme === 'dark' ? 'text-white' : 'text-zinc-900'
                }`}>{progress}%</span>
              </div>
              <div className={`h-3 w-full rounded-full overflow-hidden border p-[2px] ${
                theme === 'dark' ? 'bg-black/50 border-white/10' : 'bg-zinc-100 border-zinc-300'
              }`}>
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className={`flex justify-between mt-2 text-[10px] font-mono ${
                theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                <span>{t("DAY 0", "दिन ०")}</span>
                <span>{t("DAY 100", "दिन १००")}</span>
              </div>
            </div>

            {/* Gamification Stats */}
            <div className={`p-6 rounded-3xl border text-left ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`text-sm font-medium uppercase tracking-widest ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>{t("Current Level", "हालको स्तर")}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-3xl font-bold tabular-nums ${
                      theme === 'dark' ? 'text-white' : 'text-zinc-900'
                    }`}>{currentLevel}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>Total XP</span>
                  <p className={`text-xl font-black text-purple-500`}>{xp}</p>
                </div>
              </div>
              <div className={`h-3 w-full rounded-full overflow-hidden border p-[2px] ${
                theme === 'dark' ? 'bg-black/50 border-white/10' : 'bg-zinc-100 border-zinc-300'
              }`}>
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className={`flex justify-between mt-2 text-[10px] font-mono ${
                theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                <span>{currentLevelBaseXp} XP</span>
                <span>{nextLevelXp} XP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="space-y-8">
          {ROADMAP_DATA.map((phase: Phase, phaseIdx: number) => {
            const isLocked = phaseIdx > 0 && !quizResults[ROADMAP_DATA[phaseIdx - 1].id];
            const isExpanded = expandedPhases.includes(phase.id) && !isLocked;
            const phaseCompletedCount = phase.days.filter(d => completedDays.includes(d.id)).length;
            const isPhaseComplete = phaseCompletedCount === phase.days.length;

            return (
              <motion.div 
                key={phase.id}
                className={`group border rounded-3xl transition-all duration-300 overflow-hidden ${
                  isLocked ? (theme === 'dark' ? 'opacity-50 grayscale' : 'opacity-60 grayscale') : ''
                } ${
                  isExpanded 
                    ? theme === 'dark' 
                      ? 'bg-white/[0.03] border-white/10 shadow-2xl' 
                      : 'bg-white border-zinc-200 shadow-xl'
                    : theme === 'dark'
                      ? 'bg-transparent border-white/5 hover:border-white/10'
                      : 'bg-transparent border-zinc-200 hover:border-zinc-300'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: phaseIdx * 0.05 }}
              >
                {/* Phase Banner Image */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 200 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative w-full overflow-hidden"
                    >
                      <img 
                        src={phase.bannerImage} 
                        alt={phase.title}
                        className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        theme === 'dark' ? 'from-[#050505] via-[#050505]/40' : 'from-white via-white/40'
                      } to-transparent`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Phase Header */}
                <button 
                  onClick={() => togglePhase(phase.id)}
                  className={`w-full flex items-center justify-between p-5 sm:p-8 text-left relative z-10 transition-colors ${
                    isExpanded 
                      ? theme === 'dark' ? 'bg-white/[0.02]' : 'bg-zinc-50'
                      : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isLocked ? (theme === 'dark' ? 'bg-white/5 text-zinc-600' : 'bg-zinc-100 text-zinc-400') :
                      isPhaseComplete 
                        ? 'bg-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                        : theme === 'dark'
                          ? 'bg-white/5 text-zinc-400 group-hover:text-white'
                          : 'bg-zinc-100 text-zinc-500 group-hover:text-zinc-900'
                    }`}>
                      {isLocked ? <Lock className="w-6 h-6" /> : isPhaseComplete ? <Trophy className="w-6 h-6" /> : getPhaseIcon(phase.id)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold transition-colors ${
                        isExpanded 
                          ? theme === 'dark' ? 'text-white' : 'text-zinc-900'
                          : theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                      }`}>
                        {t(phase.title, phase.nepaliTitle)}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        {isLocked ? (
                          <p className={`text-[10px] font-mono uppercase tracking-widest ${
                            theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                          }`}>
                            {t("LOCKED - PASS PREVIOUS QUIZ", "लक गरिएको - अघिल्लो क्विज पास गर्नुहोस्")}
                          </p>
                        ) : (
                          <>
                            <p className={`text-[10px] font-mono uppercase tracking-widest ${
                              theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                              {phaseCompletedCount}/10 {t("DAYS COMPLETED", "दिन पूरा भयो")}
                            </p>
                            {quizResults[phase.id] && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                <Award className="w-3 h-3" /> {t("QUIZ PASSED", "क्विज उत्तीर्ण")}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}>
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </button>

                {/* Phase Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-8 pb-10 space-y-6">
                        {/* Phase Summary */}
                        <div className={`p-4 sm:p-6 rounded-2xl border ${
                          theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'
                        }`}>
                          <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${
                            theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                          }`}>
                            <Info className="w-3 h-3" /> {t("Phase Summary", "चरण सारांश")}
                          </h4>
                          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            {t(phase.summary, phase.nepaliSummary)}
                          </p>
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                          {phase.days.map((day) => {
                            const currentDay = generatedDays[day.id] || day;
                            const isDone = completedDays.includes(currentDay.id);
                            const isExpanded = expandedDays.includes(currentDay.id);
                            const isGenerating = generatingDays[currentDay.id];
                            return (
                              <div 
                                key={currentDay.id}
                                className={`rounded-2xl border transition-all overflow-hidden ${
                                  isDone 
                                    ? theme === 'dark'
                                      ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' 
                                      : 'bg-emerald-50 border-emerald-200'
                                    : theme === 'dark'
                                      ? 'bg-black/20 border-white/5 hover:border-white/20'
                                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                                }`}
                              >
                                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5">
                                  <button
                                    onClick={() => toggleDay(currentDay.id)}
                                    className="mt-1 flex-shrink-0"
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    ) : (
                                      <Circle className={`w-6 h-6 transition-colors ${
                                        theme === 'dark' ? 'text-zinc-800 hover:text-zinc-600' : 'text-zinc-300 hover:text-zinc-400'
                                      }`} />
                                    )}
                                  </button>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-mono font-bold ${
                                          theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                                        }`}>{t(`DAY ${currentDay.id}`, `दिन ${currentDay.id}`)}</span>
                                        {!isDone && (
                                          <span className="text-[9px] font-bold text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                            <Star className="w-2.5 h-2.5" /> +50 XP
                                          </span>
                                        )}
                                        <h5 className={`text-base font-bold transition-colors ${
                                          isDone 
                                            ? theme === 'dark' ? 'text-emerald-300' : 'text-emerald-800'
                                            : theme === 'dark' ? 'text-zinc-200' : 'text-zinc-900'
                                        }`}>
                                          {t(currentDay.title, currentDay.nepaliTitle)}
                                        </h5>
                                      </div>
                                      <button 
                                        onClick={() => toggleDayExpansion(currentDay.id)}
                                        className={`p-2 rounded-lg transition-colors ${
                                          theme === 'dark' ? 'hover:bg-white/5 text-zinc-500' : 'hover:bg-zinc-100 text-zinc-400'
                                        }`}
                                      >
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                      </button>
                                    </div>
                                    <p className={`text-sm leading-relaxed mt-1 font-medium ${
                                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                                    }`}>
                                      {t(currentDay.description, currentDay.nepaliDescription)}
                                    </p>
                                  </div>
                                </div>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className={`px-0 sm:px-14 pb-6 border-t ${
                                        theme === 'dark' ? 'border-white/5' : 'border-zinc-100'
                                      }`}
                                    >
                                      {isGenerating ? (
                                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                            {t("Generating AI lesson content...", "AI पाठ सामग्री उत्पन्न गर्दै...")}
                                          </p>
                                        </div>
                                      ) : (
                                        <div className="pt-4 sm:pt-6 space-y-6">
                                          <div className={`px-4 py-5 sm:p-5 sm:rounded-xl relative ${
                                            theme === 'dark' ? 'bg-white/5' : 'bg-zinc-100 border-y sm:border border-zinc-200'
                                          }`}>
                                            <div className="flex justify-between items-start mb-2">
                                            <h6 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${
                                              theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'
                                            }`}>{t("Lesson Content", "पाठ सामग्री")}</h6>
                                              <button 
                                                onClick={() => handleTextToSpeech(currentDay.id, t(currentDay.lessonContent, currentDay.nepaliLessonContent))}
                                                className={`p-2 rounded-lg transition-all ${
                                                  isReading === currentDay.id 
                                                    ? 'bg-purple-500 text-white' 
                                                    : theme === 'dark' ? 'bg-white/5 text-zinc-400 hover:text-white' : 'bg-white text-zinc-600 hover:text-purple-600 border border-zinc-200'
                                                }`}
                                                title={t("Listen to Lesson", "पाठ सुन्नुहोस्")}
                                              >
                                                {isReading === currentDay.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                              </button>
                                            </div>
                                            <div className={`text-base leading-relaxed ${
                                              theme === 'dark' ? 'text-zinc-200' : 'text-zinc-900'
                                            }`}>
                                              <Markdown>{t(currentDay.lessonContent, currentDay.nepaliLessonContent)}</Markdown>
                                            </div>
                                            
                                            {!currentDay.isGenerated && (
                                              <div className="mt-6 flex justify-center">
                                                <button
                                                  onClick={() => generateDayContent(phase, day)}
                                                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                                                    theme === 'dark'
                                                      ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                                                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                                  }`}
                                                >
                                                  <Sparkles className="w-4 h-4" />
                                                  {t("Read More (AI Generated)", "थप पढ्नुहोस् (AI द्वारा उत्पन्न)")}
                                                </button>
                                              </div>
                                            )}
                                          </div>

                                          {currentDay.keyPoints && currentDay.keyPoints.length > 0 && (
                                            <div className="space-y-3 px-4 sm:px-0">
                                              <h6 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                                                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                                              }`}>
                                                <ListChecks className="w-3 h-3" />
                                                {t("Key Points", "मुख्य बुँदाहरू")}
                                              </h6>
                                              <ul className="space-y-2">
                                                {currentDay.keyPoints.map((kp, idx) => (
                                                  <li key={idx} className={`flex gap-3 text-sm ${
                                                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                                                  }`}>
                                                    <span className="text-purple-500 mt-1">•</span>
                                                    {t(kp.point, kp.nepaliPoint)}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}

                                          {currentDay.vocabulary && currentDay.vocabulary.length > 0 && (
                                            <div className="space-y-3 px-4 sm:px-0">
                                              <h6 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                                                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                                              }`}>
                                                <BookOpen className="w-3 h-3" />
                                                {t("Vocabulary", "शब्दावली")}
                                              </h6>
                                              <div className="grid gap-3">
                                                {currentDay.vocabulary.map((v, idx) => (
                                                  <div key={idx} className={`p-3 rounded-lg border ${
                                                    theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-zinc-100 border-zinc-200'
                                                  }`}>
                                                    <p className={`text-sm font-bold ${
                                                      theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'
                                                    }`}>
                                                      {t(v.word, v.nepaliWord)}
                                                    </p>
                                                    <p className={`text-xs mt-1 ${
                                                      theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                                                    }`}>
                                                      {t(v.definition, v.nepaliDefinition)}
                                                    </p>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}

                                          <div className="flex justify-end px-4 sm:px-0">
                                            <a 
                                              href={currentDay.referenceLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-center gap-2 text-xs font-bold text-purple-500 hover:text-purple-400 transition-colors"
                                            >
                                              {t("View Reference", "सन्दर्भ हेर्नुहोस्")} <ArrowRight className="w-3 h-3" />
                                            </a>
                                          </div>
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>

                        {/* Resources & Quiz Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Resources */}
                          <div className={`rounded-2xl p-4 sm:p-5 border ${
                            theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'
                          }`}>
                            <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${
                              theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                              <BookOpen className="w-3 h-3" /> {t("Learning Resources", "सिक्ने स्रोतहरू")}
                            </h4>
                            <div className="space-y-2">
                              {phase.resources.map((res, idx) => (
                                <a 
                                  key={idx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center justify-between p-3 rounded-xl border transition-all group/link ${
                                    theme === 'dark' 
                                      ? 'bg-black/40 border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5' 
                                      : 'bg-white border-zinc-200 hover:border-purple-400 hover:bg-purple-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {res.type === 'video' ? <Video className="w-4 h-4 text-red-500" /> : <BookOpen className="w-4 h-4 text-blue-500" />}
                                    <span className={`text-sm transition-colors ${
                                      theme === 'dark' ? 'text-zinc-300 group-hover/link:text-white' : 'text-zinc-600 group-hover/link:text-zinc-900'
                                    }`}>{t(res.title, res.nepaliTitle)}</span>
                                  </div>
                                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover/link:text-zinc-400" />
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Quiz Card */}
                          <div className={`rounded-2xl p-4 sm:p-5 border flex flex-col justify-between ${
                            theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'
                          }`}>
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <h4 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                                }`}>
                                  <HelpCircle className="w-3 h-3" /> {t("Knowledge Check", "ज्ञान परीक्षण")}
                                </h4>
                                {!quizResults[phase.id] && (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-full">
                                    <Star className="w-3 h-3" /> +200 XP
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {t("Test your understanding of this phase with a quick quiz.", "द्रुत क्विजको साथ यो चरणको आफ्नो बुझाइ परीक्षण गर्नुहोस्।")}
                              </p>
                            </div>
                            <button 
                              onClick={() => {
                                if (phase.id >= 2 && !generatedQuizzes[phase.id] && !generatingQuizzes[phase.id]) {
                                  generateQuizContent(phase);
                                }
                                setActiveQuiz(phase);
                              }}
                              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                                quizResults[phase.id]
                                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
                                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]'
                              }`}
                            >
                              {quizResults[phase.id] ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                              {quizResults[phase.id] ? t("Retake Quiz", "पुन: क्विज लिनुहोस्") : t("Start Quiz", "क्विज सुरु गर्नुहोस्")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-20 py-12 px-6 border-t ${
        theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-200 bg-zinc-50'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-none">Web3 Mastery</h4>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-mono">Decentralize Everything</p>
            </div>
          </div>
          
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">Ethereum</a>
            <a href="https://bitcoin.org" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">Bitcoin</a>
            <a href="https://web3.foundation" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">Web3 Foundation</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
            © 2026 Web3 Mastery Roadmap • Built for the Decentralized Future
          </p>
        </div>
      </footer>

      {/* Quiz Modal */}
      {/* AI Assistant Button */}
      <button 
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-8 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border z-50 flex flex-col ${
              theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-zinc-200'
            }`}
            style={{ height: '500px' }}
          >
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-purple-600/10 to-blue-600/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <h3 className="font-bold text-sm">{t("Web3 Assistant", "Web3 सहायक")}</h3>
              </div>
              <button onClick={() => setIsAIOpen(false)} className="p-1 hover:bg-white/5 rounded-full">
                <X className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-xs text-zinc-500">
                    {t("Ask me anything about the Web3 roadmap!", "Web3 रोडम्यापको बारेमा मलाई केहि सोध्नुहोस्!")}
                  </p>
                </div>
              )}
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none' 
                      : theme === 'dark' ? 'bg-white/5 text-zinc-300 rounded-tl-none' : 'bg-zinc-100 text-zinc-700 rounded-tl-none'
                  }`}>
                    <div className="markdown-body">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isAILoading && (
                <div className="flex justify-start">
                  <div className={`p-3 rounded-2xl rounded-tl-none ${theme === 'dark' ? 'bg-white/5' : 'bg-zinc-100'}`}>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t("Type your question...", "आफ्नो प्रश्न टाइप गर्नुहोस्...")}
                  className={`w-full p-3 pr-12 rounded-xl text-xs border focus:outline-none transition-all ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/5 focus:border-purple-500/50 text-white' 
                      : 'bg-zinc-50 border-zinc-200 focus:border-purple-400 text-zinc-900'
                  }`}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isAILoading || !aiInput.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-500 hover:text-purple-400 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeQuiz && (
          <QuizModal 
            phase={activeQuiz} 
            quizzes={generatedQuizzes[activeQuiz.id] || activeQuiz.quizzes}
            isGenerating={generatingQuizzes[activeQuiz.id] || false}
            lang={lang} 
            theme={theme}
            onClose={() => setActiveQuiz(null)}
            onComplete={(passed) => {
              if (passed) {
                setQuizResults(prev => ({ ...prev, [activeQuiz.id]: true }));
                setXp(x => x + 200);
                confetti({
                  particleCount: 150,
                  spread: 100,
                  origin: { y: 0.5 },
                  colors: ['#a855f7', '#3b82f6', '#10b981', '#f59e0b']
                });
                
                // Unlock next phase automatically
                const currentPhaseIdx = ROADMAP_DATA.findIndex(p => p.id === activeQuiz.id);
                if (currentPhaseIdx < ROADMAP_DATA.length - 1) {
                  const nextPhaseId = ROADMAP_DATA[currentPhaseIdx + 1].id;
                  if (!expandedPhases.includes(nextPhaseId)) {
                    setExpandedPhases(prev => [...prev, nextPhaseId]);
                  }
                }
              }
              setActiveQuiz(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`border-t py-16 px-6 text-center ${
        theme === 'dark' ? 'border-white/5' : 'border-zinc-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-10 mb-10">
            <div className="text-center">
              <p className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{completedDays.length}</p>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
              }`}>{t("Days Mastered", "दिनहरू पूरा")}</p>
            </div>
            <div className={`w-px h-12 ${theme === 'dark' ? 'bg-white/10' : 'bg-zinc-200'}`} />
            <div className="text-center">
              <p className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{100 - completedDays.length}</p>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
              }`}>{t("Remaining", "बाँकी")}</p>
            </div>
          </div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {t("Built for the decentralized future. Keep building.", "विकेन्द्रीकृत भविष्यको लागि निर्मित। निर्माण जारी राख्नुहोस्।")}
          </p>
        </div>
      </footer>
    </div>
  );
}

interface QuizModalProps {
  phase: Phase;
  quizzes: QuizQuestion[];
  isGenerating: boolean;
  lang: Language;
  theme: Theme;
  onClose: () => void;
  onComplete: (passed: boolean) => void;
}

function QuizModal({ phase, quizzes, isGenerating, lang, theme, onClose, onComplete }: QuizModalProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const t = (en: string, np: string) => (lang === 'en' ? en : np);

  const currentQuestion = quizzes[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === quizzes.length - 1;

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const score = useMemo(() => {
    return answers.reduce((acc, ans, idx) => {
      return ans === quizzes[idx].correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [answers, quizzes]);

  const passed = score === quizzes.length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border ${
          theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-zinc-200'
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-500" />
              {t("Phase Quiz", "चरण क्विज")}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {t("Generating AI quiz questions...", "AI क्विज प्रश्नहरू उत्पन्न गर्दै...")}
              </p>
            </div>
          ) : !showResults && currentQuestion ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>{t("Question", "प्रश्न")} {currentQuestionIdx + 1} / {quizzes.length}</span>
                <div className="flex gap-1">
                  {quizzes.map((_, i) => (
                    <div key={i} className={`w-6 h-1 rounded-full ${i <= currentQuestionIdx ? 'bg-purple-500' : 'bg-zinc-800'}`} />
                  ))}
                </div>
              </div>
              
              <h4 className="text-lg font-bold leading-tight">
                {t(currentQuestion.question, currentQuestion.nepaliQuestion)}
              </h4>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all font-medium ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 text-zinc-300 hover:text-white'
                        : 'bg-zinc-50 border-zinc-200 hover:border-purple-400 hover:bg-purple-50 text-zinc-700 hover:text-zinc-900'
                    }`}
                  >
                    {t(option, currentQuestion.nepaliOptions[idx])}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${
                passed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {passed ? <Trophy className="w-10 h-10" /> : <X className="w-10 h-10" />}
              </div>
              <h4 className="text-2xl font-bold mb-2">
                {passed ? t("Perfect Score!", "उत्कृष्ट स्कोर!") : t("Keep Learning", "सिक्दै जानुहोस्")}
              </h4>
              <p className="text-zinc-500 mb-8">
                {t(`You got ${score} out of ${quizzes.length} correct.`, `तपाईंले ${quizzes.length} मध्ये ${score} सही पाउनुभयो।`)}
              </p>
              <button 
                onClick={() => onComplete(passed)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                {t("Continue Journey", "यात्रा जारी राख्नुहोस्")}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
