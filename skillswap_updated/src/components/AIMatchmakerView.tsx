import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Globe, 
  TrendingUp, 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  Loader2,
  Share2,
  RotateCcw
} from 'lucide-react';
import { UserProfile, ViewMode, AIMatchResult } from '../types';
import { MENTORS_LIST } from '../data/mockData';

interface AIMatchmakerViewProps {
  user: UserProfile;
  selectedMentorForMatch?: UserProfile | null;
  onSelectView: (view: ViewMode) => void;
  onLaunchSession: (sessionId: string) => void;
}

export const AIMatchmakerView: React.FC<AIMatchmakerViewProps> = ({
  user,
  selectedMentorForMatch,
  onSelectView,
  onLaunchSession
}) => {
  const [targetMentor, setTargetMentor] = useState<UserProfile>(selectedMentorForMatch || MENTORS_LIST[0]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [matchResult, setMatchResult] = useState<AIMatchResult | null>(null);

  // Run AI calculation
  const handleComputeMatch = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/ai/matchmaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userTeach: user.teachSkills[0]?.name,
          userLearn: user.learnSkills[0]?.name,
          targetName: targetMentor.name,
          targetTeach: targetMentor.teachSkills[0]?.name,
          targetLearn: targetMentor.learnSkills[0]?.name,
          timezone: user.timezone,
          style: user.learningStyle
        })
      });

      const data = await res.json();
      setMatchResult({
        id: 'match-1',
        peer: targetMentor,
        matchScore: data.matchScore || 98,
        compatibilityLabel: data.compatibilityLabel || 'Synergistic Masterclass Pairing',
        synergyReasons: data.synergyReasons || [
          `Complementary Swap: You teach ${user.teachSkills[0]?.name || 'React'} while ${targetMentor.name} teaches ${targetMentor.teachSkills[0]?.name || 'Spanish'}.`,
          `Timezone Overlap: Convenient 3-hour shared window.`,
          `Matching Learning Style: Both prefer ${user.learningStyle}.`,
          `Karma Trust Metrics: Both swappers have 98%+ session completion rates.`
        ],
        predictedSuccessRate: data.predictedSuccessRate || '98.4%',
        sharedInterests: ['Open Source', 'Language Immersion', 'UI Systems'],
        suggestedRoadmap: data.suggestedRoadmap || [
          { week: 'Week 1', focus: 'Foundations & Goal Setting', details: `30m ${user.teachSkills[0]?.name || 'React'} basics + 30m ${targetMentor.teachSkills[0]?.name || 'Spanish'} conversation.` },
          { week: 'Week 2', focus: 'Practical Project Building', details: 'Build a small app interface while discussing logic in Spanish.' },
          { week: 'Week 3', focus: 'Advanced Concepts & Fluency', details: 'State management deep dive & technical Spanish terminology.' },
          { week: 'Week 4', focus: 'Capstone Presentation', details: 'Present the project in Spanish with live React code execution.' }
        ]
      });
    } catch {
      setMatchResult({
        id: 'match-fallback',
        peer: targetMentor,
        matchScore: 98,
        compatibilityLabel: 'Synergistic Masterclass Pairing',
        synergyReasons: [
          `Perfect Reciprocal Skill Delta: You teach ${user.teachSkills[0]?.name} while ${targetMentor.name} teaches ${targetMentor.teachSkills[0]?.name}.`,
          `High Engagement Signals: Both profiles have 4.9+ ratings & 100% completion karma.`,
          `Optimal Modality Alignment: Both prefer live interactive co-building.`
        ],
        predictedSuccessRate: '98.5%',
        sharedInterests: ['Tech', 'Language', 'Product Design'],
        suggestedRoadmap: [
          { week: 'Week 1', focus: 'Foundations & Setup', details: '30m React state architecture + 30m Spanish idiom practice.' },
          { week: 'Week 2', focus: 'Interactive Building', details: 'Build compound components while practicing Spanish vocabulary.' },
          { week: 'Week 3', focus: 'Deep Dive & Polish', details: 'Async state management & complex conversational scenarios.' },
          { week: 'Week 4', focus: 'Capstone Exchange', details: 'Deliver a bilingual live demo session.' }
        ]
      });
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    handleComputeMatch();
  }, [targetMentor]);

  return (
    <div className="flex flex-col gap-8 pb-16 animate-fade-in relative">
      
      {/* Animated Neural Backdrop Canvas Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-400/10 via-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-900 text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Gemini 3.6 Neural Matrix Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">AI Compatibility Matchmaker</h1>
          <p className="text-xs text-slate-600 mt-1">Analyzing multi-dimensional skill vectors, timezone synergy, and learning velocity.</p>
        </div>

        {/* Target Mentor Picker Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Match with:</span>
          <select
            value={targetMentor.id}
            onChange={(e) => {
              const found = MENTORS_LIST.find(m => m.id === e.target.value);
              if (found) setTargetMentor(found);
            }}
            className="bg-white border border-purple-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none shadow-xs"
          >
            {MENTORS_LIST.map(m => (
              <option key={m.id} value={m.id}>{m.name} ({m.teachSkills[0]?.name})</option>
            ))}
          </select>
        </div>
      </div>

      {/* COMPUTING / THINKING ANIMATION STATE */}
      {isCalculating ? (
        <div className="p-16 glass-panel rounded-3xl border border-purple-200 flex flex-col items-center justify-center text-center gap-4 my-8 shadow-sm">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin flex items-center justify-center" />
            <Brain className="w-8 h-8 text-cyan-600 absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="text-lg font-bold text-slate-900">Computing Neural Synergy Vectors...</div>
          <p className="text-xs text-purple-700 max-w-sm font-medium">
            Evaluating {user.teachSkills[0]?.name} vs {targetMentor.teachSkills[0]?.name} compatibility & schedule overlap...
          </p>
        </div>
      ) : matchResult ? (
        <div className="flex flex-col gap-8">
          
          {/* TOP MATCH SCORE HERO CARD */}
          <div className="p-8 glass-panel rounded-3xl border border-purple-200 shadow-xl relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-white">
            
            {/* Left: Swapper Pair Avatar visual */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-md" />
                <span className="text-xs font-bold text-slate-900">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-purple-700 font-bold">{user.teachSkills[0]?.name}</span>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-100 border border-cyan-300 text-cyan-800 animate-pulse shadow-sm">
                <Zap className="w-6 h-6" />
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <img src={matchResult.peer.avatar} alt={matchResult.peer.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-md" />
                <span className="text-xs font-bold text-slate-900">{matchResult.peer.name.split(' ')[0]}</span>
                <span className="text-[10px] text-cyan-800 font-bold">{matchResult.peer.teachSkills[0]?.name}</span>
              </div>
            </div>

            {/* Center: Match Score Gauge */}
            <div className="flex flex-col items-center text-center gap-2">
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-500 p-[3px] shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-gradient-purple">{matchResult.matchScore}%</span>
                  <span className="text-[9px] uppercase font-extrabold text-cyan-700">Match Index</span>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900 mt-1">{matchResult.compatibilityLabel}</span>
            </div>

            {/* Right: Predicted Success & Instant Book */}
            <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Predicted Exchange Outcome:</span>
                <span className="text-emerald-600 font-bold">{matchResult.predictedSuccessRate}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Timezone Delta:</span>
                <span className="text-purple-700 font-bold">Optimal (+2h overlap)</span>
              </div>
              <button
                onClick={() => onLaunchSession('session-101')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-1"
              >
                Launch AI Exchange Session
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* TWO COLUMN BREAKDOWN: SYNERGY REASONS + ROADMAP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* WHY YOU MATCH BREAKDOWN */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Why You Match (AI Vector Signals)
                </h3>
                <span className="text-xs text-cyan-700 font-bold">4 Signals</span>
              </div>

              <div className="flex flex-col gap-3">
                {matchResult.synergyReasons.map((reason, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                    <div className="p-2 rounded-xl bg-purple-100 border border-purple-200 text-purple-800 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GENERATED 4-WEEK ROADMAP */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-200 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-600" />
                  AI Generated Exchange Curriculum
                </h3>
                <span className="text-xs text-cyan-800 font-bold bg-cyan-100 px-2 py-0.5 rounded-full">4-Week Milestones</span>
              </div>

              <div className="flex flex-col gap-3">
                {matchResult.suggestedRoadmap.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-1.5 relative overflow-hidden shadow-xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span className="text-purple-700 uppercase tracking-wider">{item.week}</span>
                      <span className="text-cyan-800">{item.focus}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
};
