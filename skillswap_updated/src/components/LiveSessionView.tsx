import React, { useState, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  PhoneOff, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Award, 
  MessageSquare,
  Users,
  PenTool,
  Brain,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ViewMode } from '../types';
import { MENTORS_LIST } from '../data/mockData';

interface LiveSessionViewProps {
  user: UserProfile;
  onLeaveSession: () => void;
}

export const LiveSessionView: React.FC<LiveSessionViewProps> = ({ user, onLeaveSession }) => {
  const mentor = MENTORS_LIST[0]; // Elena Rostova
  
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'whiteboard' | 'goals'>('transcript');
  
  const [notesText, setNotesText] = useState('// Shared Whiteboard & Code Scratchpad\nfunction handleExchange() {\n  console.log("React state logic exchanged for Spanish fluency!");\n}');
  const [showXpModal, setShowXpModal] = useState(false);

  // AI Live Transcript Feed State
  const [transcriptItems, setTranscriptItems] = useState<{ id: string; speaker: string; text: string; time: string }[]>([
    { id: '1', speaker: mentor.name, text: '¡Hola Alex! Let’s start with 20 minutes of React server action concepts.', time: '00:05' },
    { id: '2', speaker: user.name, text: 'Sounds great! I prepared an async state machine snippet for us.', time: '00:18' }
  ]);

  // Timer counter
  const [seconds, setSeconds] = useState(1240);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishSession = () => {
    setShowXpModal(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="h-[calc(100vh-100px)] glass-panel rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between animate-fade-in relative shadow-xl bg-white">
      
      {/* CLASSROOM TOP BAR */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-10 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Skill Exchange Classroom
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30 animate-pulse">
                LIVE
              </span>
            </div>
            <div className="text-xs text-purple-300">
              Exchange: {user.teachSkills[0]?.name} ↔ {mentor.teachSkills[0]?.name}
            </div>
          </div>
        </div>

        {/* Timer & Finish Session Trigger */}
        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {formatTime(seconds)}
          </div>

          <button
            onClick={handleFinishSession}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Complete & Claim XP
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA: VIDEO GRID + SIDE PANEL */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        
        {/* VIDEO CLASSROOM CANVAS (2 Cols) */}
        <div className="lg:col-span-2 p-4 bg-slate-900 flex flex-col gap-4 relative justify-between">
          
          {/* Main Peer Video Frame */}
          <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center min-h-[300px]">
            {camOn ? (
              <img
                src={mentor.coverImage || mentor.avatar}
                alt={mentor.name}
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-full object-cover" />
                <span className="text-xs font-bold text-white">{mentor.name} (Camera Paused)</span>
              </div>
            )}

            {/* Peer Name Tag */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {mentor.name} (Instructor)
            </div>

            {/* Self Video PIP Preview */}
            <div className="absolute top-4 right-4 w-32 h-24 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden shadow-2xl">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1.5 rounded text-white font-bold">You</div>
            </div>
          </div>

          {/* FLOATING CLASSROOM CONTROLS BAR */}
          <div className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 flex items-center justify-center gap-4 z-20 max-w-md mx-auto w-full">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3 rounded-xl border transition-all ${
                micOn ? 'bg-slate-700 text-white border-slate-600' : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCamOn(!camOn)}
              className={`p-3 rounded-xl border transition-all ${
                camOn ? 'bg-slate-700 text-white border-slate-600' : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}
            >
              {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setScreenSharing(!screenSharing)}
              className={`p-3 rounded-xl border transition-all ${
                screenSharing ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-700 text-white border-slate-600'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>

            <button
              onClick={onLeaveSession}
              className="p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* SIDE PANEL: TRANSCRIPT / WHITEBOARD / GOALS (1 Col) */}
        <div className="bg-slate-50 border-l border-slate-200 p-4 flex flex-col justify-between gap-4">
          
          {/* Side Tab Switcher */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/80 rounded-xl border border-slate-300">
            {[
              { id: 'transcript', label: 'AI Notes', icon: Brain },
              { id: 'whiteboard', label: 'Scratchpad', icon: PenTool },
              { id: 'goals', label: 'Goals', icon: CheckCircle2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSel = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isSel ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            
            {/* AI TRANSCRIPT */}
            {activeTab === 'transcript' && (
              <div className="flex flex-col gap-3">
                <div className="text-[10px] uppercase font-bold text-cyan-800 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-600" /> Real-time Gemini Auto Transcription
                </div>

                {transcriptItems.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1 text-xs shadow-xs">
                    <div className="flex items-center justify-between font-bold text-purple-800">
                      <span>{item.speaker}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* WHITEBOARD / CODE SCRATCHPAD */}
            {activeTab === 'whiteboard' && (
              <div className="flex flex-col gap-2 h-full">
                <div className="text-[10px] uppercase font-bold text-purple-700">Collaborative Code & Notes</div>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full h-64 bg-white border border-slate-300 rounded-xl p-3 font-mono text-xs text-slate-900 focus:outline-none focus:border-purple-600 shadow-xs"
                />
              </div>
            )}

            {/* GOALS CHECKLIST */}
            {activeTab === 'goals' && (
              <div className="flex flex-col gap-3">
                <div className="text-[10px] uppercase font-bold text-amber-700">Session Learning Milestones</div>
                {[
                  'Cover React custom hook state decoupling',
                  'Practice 20 minutes of conversational Spanish idioms',
                  'Exchange code review notes'
                ].map((g, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 flex items-center gap-2 font-semibold shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* POST SESSION XP CELEBRATION MODAL */}
      {showXpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl flex flex-col items-center text-center gap-6 animate-scale-up relative">
            <button onClick={() => setShowXpModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 p-[2px] shadow-xl">
              <div className="w-full h-full bg-purple-50 rounded-full flex items-center justify-center text-amber-500">
                <Award className="w-10 h-10" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Skill Swap Completed!</h3>
              <p className="text-xs text-slate-600 mt-1">You and {mentor.name} successfully exchanged 45 minutes of expertise!</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-purple-800">+250 XP Awarded</span>
                <span className="text-lg font-black text-slate-900">Level 18</span>
              </div>
              <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-cyan-800">+50 Karma Gained</span>
                <span className="text-lg font-black text-slate-900">100% Reciprocal</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowXpModal(false);
                onLeaveSession();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/20"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
