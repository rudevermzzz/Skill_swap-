import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Plus, 
  X, 
  Calendar, 
  Clock, 
  Video, 
  BookOpen, 
  Code, 
  Users,
  Loader2,
  Check
} from 'lucide-react';
import { ViewMode, OnboardingData } from '../types';
import { CATEGORY_SKILLS } from '../data/mockData';
import { SkillSwapLogo } from './SkillSwapLogo';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onCancel: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [teachSkills, setTeachSkills] = useState<string[]>(['React & Next.js', 'TypeScript']);
  const [learnSkills, setLearnSkills] = useState<string[]>(['Native Spanish', 'PyTorch & AI']);
  const [teachSearch, setTeachSearch] = useState('');
  const [learnSearch, setLearnSearch] = useState('');
  
  const [timezone, setTimezone] = useState('UTC-8 (PST)');
  const [availabilityDays, setAvailabilityDays] = useState<string[]>(['Mon Evening', 'Wed Evening', 'Sat Morning']);
  const [preferredStyle, setPreferredStyle] = useState('Live Project');

  const [aiGenerating, setAiGenerating] = useState(false);
  const [generatedBio, setGeneratedBio] = useState('');

  const toggleTeachSkill = (skill: string) => {
    if (teachSkills.includes(skill)) {
      setTeachSkills(teachSkills.filter(s => s !== skill));
    } else {
      setTeachSkills([...teachSkills, skill]);
    }
  };

  const toggleLearnSkill = (skill: string) => {
    if (learnSkills.includes(skill)) {
      setLearnSkills(learnSkills.filter(s => s !== skill));
    } else {
      setLearnSkills([...learnSkills, skill]);
    }
  };

  const toggleDay = (day: string) => {
    if (availabilityDays.includes(day)) {
      setAvailabilityDays(availabilityDays.filter(d => d !== day));
    } else {
      setAvailabilityDays([...availabilityDays, day]);
    }
  };

  const handleTriggerAiGen = async () => {
    setAiGenerating(true);
    try {
      const res = await fetch('/api/ai/profile-gen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teachSkills, learnSkills, style: preferredStyle, timezone })
      });
      const data = await res.json();
      setGeneratedBio(data.bio || `Passionate mentor eager to exchange skills in ${teachSkills[0]} for ${learnSkills[0]}.`);
    } catch {
      setGeneratedBio(`Senior mentor specializing in ${teachSkills.join(', ')}. Eager to learn ${learnSkills.join(', ')} through interactive peer exchanges.`);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleNextStep = () => {
    if (step === 4) {
      setStep(5);
      handleTriggerAiGen();
    } else if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete({
        teachSkills,
        learnSkills,
        availabilityDays,
        timezone,
        preferredStyle,
        generatedBio
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="w-full max-w-3xl glass-panel rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl relative z-10 flex flex-col gap-8 bg-white">
        
        {/* Step Progress Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <span className="text-purple-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Onboarding Step {step} of 5
            </span>
            <span>{step * 20}% Complete</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
            <div 
              className="bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${step * 20}%` }}
            />
          </div>
        </div>

        {/* STEP 1: SKILLS YOU CAN TEACH */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Select skills you can teach</h2>
              <p className="text-xs text-slate-600 mt-1">Pick at least 1 skill you feel comfortable mentoring peers in.</p>
            </div>

            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search skills (e.g. React, Spanish, Figma)..."
                value={teachSearch}
                onChange={(e) => setTeachSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-purple-600 shadow-xs"
              />
            </div>

            {/* Selected Chips */}
            {teachSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-xs font-bold text-purple-900 w-full mb-1">Your Teaching Skills ({teachSkills.length}):</span>
                {teachSkills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                    {s}
                    <button onClick={() => toggleTeachSkill(s)} className="hover:text-purple-200"><X className="w-3.5 h-3.5" /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Available Skills Grid */}
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
              {CATEGORY_SKILLS.filter(s => s.toLowerCase().includes(teachSearch.toLowerCase())).map(skill => {
                const isSelected = teachSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleTeachSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-purple-300 hover:text-purple-900'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SKILLS YOU WANT TO LEARN */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Select skills you want to learn</h2>
              <p className="text-xs text-slate-600 mt-1">Our AI matchmaker will find peers whose teaching offers match your goals.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search skills you want to learn..."
                value={learnSearch}
                onChange={(e) => setLearnSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 shadow-xs"
              />
            </div>

            {/* Selected Chips */}
            {learnSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                <span className="text-xs font-bold text-cyan-900 w-full mb-1">Learning Goals ({learnSkills.length}):</span>
                {learnSkills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-cyan-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                    {s}
                    <button onClick={() => toggleLearnSkill(s)} className="hover:text-cyan-200"><X className="w-3.5 h-3.5" /></button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
              {CATEGORY_SKILLS.filter(s => s.toLowerCase().includes(learnSearch.toLowerCase())).map(skill => {
                const isSelected = learnSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleLearnSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-cyan-300 hover:text-cyan-900'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: AVAILABILITY & TIMEZONE */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Set availability & timezone</h2>
              <p className="text-xs text-slate-600 mt-1">AI uses your schedule to suggest sessions with zero calendar friction.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700">Primary Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-purple-600 shadow-xs"
              >
                <option value="UTC-8 (PST)">UTC-8 (PST - San Francisco, Vancouver)</option>
                <option value="UTC-5 (EST)">UTC-5 (EST - New York, Toronto)</option>
                <option value="UTC+0 (GMT)">UTC+0 (GMT - London, Dublin)</option>
                <option value="UTC+1 (CET)">UTC+1 (CET - Madrid, Paris, Berlin)</option>
                <option value="UTC+9 (JST)">UTC+9 (JST - Tokyo, Seoul)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700">Preferred Session Slot Windows</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  'Mon Evening', 'Tue Evening', 'Wed Evening',
                  'Thu Evening', 'Fri Evening', 'Sat Morning',
                  'Sat Afternoon', 'Sun Morning', 'Sun Afternoon'
                ].map(slot => {
                  const isSel = availabilityDays.includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleDay(slot)}
                      className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all ${
                        isSel
                          ? 'bg-purple-100 border-purple-300 text-purple-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        {slot}
                      </span>
                      {isSel && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: LEARNING STYLE */}
        {step === 4 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Choose your learning style</h2>
              <p className="text-xs text-slate-600 mt-1">How do you prefer conducting 1-on-1 skill exchanges?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'Live Project',
                  title: 'Live Co-Building',
                  desc: 'Build real apps, code together, or write text live.',
                  icon: Code,
                  color: 'text-purple-600'
                },
                {
                  id: 'Video & Discussion',
                  title: 'Conversational Mentorship',
                  desc: 'Structured Q&A, language practice, and advice.',
                  icon: Video,
                  color: 'text-cyan-600'
                },
                {
                  id: 'Structured Mentorship',
                  title: 'Guided Curriculum',
                  desc: 'Follow a weekly AI-generated step-by-step roadmap.',
                  icon: BookOpen,
                  color: 'text-amber-600'
                },
                {
                  id: 'Interactive Sandbox',
                  title: 'Figma & Whiteboard',
                  desc: 'Visual brainstorming, design system teardowns.',
                  icon: Users,
                  color: 'text-emerald-600'
                }
              ].map(st => {
                const Icon = st.icon;
                const isSel = preferredStyle === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setPreferredStyle(st.id)}
                    className={`p-5 rounded-2xl border text-left flex flex-col gap-3 transition-all ${
                      isSel
                        ? 'bg-purple-50 border-purple-400 shadow-md shadow-purple-500/10'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-6 h-6 ${st.color}`} />
                      {isSel && <CheckCircle2 className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{st.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: AI PROFILE GENERATOR PREVIEW */}
        {step === 5 && (
          <div className="flex flex-col gap-6 animate-fade-in text-center py-4">
            <SkillSwapLogo className="w-16 h-16 mx-auto" />

            <div>
              <h2 className="text-2xl font-black text-slate-900">AI Profile Synthesis Complete</h2>
              <p className="text-xs text-slate-600 mt-1">We generated your custom mentor profile and initialized your exchange balance.</p>
            </div>

            {aiGenerating ? (
              <div className="p-8 glass-panel rounded-2xl border border-purple-200 flex flex-col items-center justify-center gap-3 bg-purple-50/50">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                <span className="text-xs text-purple-800 font-bold">Gemini AI is crafting your bio & roadmap...</span>
              </div>
            ) : (
              <div className="p-6 glass-panel rounded-2xl border border-purple-200 text-left flex flex-col gap-4 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Generated Bio & Persona</span>
                  <span className="text-[10px] bg-cyan-100 text-cyan-900 px-2.5 py-0.5 rounded-full font-bold border border-cyan-200">
                    Level 1 Mentor
                  </span>
                </div>

                <p className="text-sm text-slate-800 leading-relaxed italic font-medium">
                  "{generatedBio}"
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-purple-700">Offering:</span>
                    <div className="font-bold text-slate-900 mt-0.5">{teachSkills.join(', ')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-cyan-800">Learning:</span>
                    <div className="font-bold text-slate-900 mt-0.5">{learnSkills.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP BUTTONS FOOTER */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
              Skip for now
            </button>
          )}

          <button
            onClick={handleNextStep}
            disabled={aiGenerating}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:opacity-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {step === 5 ? 'Launch SkillSwap Experience' : 'Continue Step'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
