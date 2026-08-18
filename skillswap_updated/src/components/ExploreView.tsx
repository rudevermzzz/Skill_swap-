import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Globe, 
  MessageSquare, 
  X, 
  ArrowRight,
  ShieldCheck,
  Video
} from 'lucide-react';
import { UserProfile, ViewMode } from '../types';
import { MENTORS_LIST } from '../data/mockData';

interface ExploreViewProps {
  onSelectView: (view: ViewMode) => void;
  onSelectMentorForMatch: (mentor: UserProfile) => void;
  onLaunchSession: (sessionId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectView,
  onSelectMentorForMatch,
  onLaunchSession
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState<UserProfile | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const categories = ['All', 'Frontend', 'AI/ML', 'Languages', 'Design', 'Backend', 'Business'];

  const filteredMentors = MENTORS_LIST.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.teachSkills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.learnSkills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || 
      m.teachSkills.some(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-8 pb-16 animate-fade-in">
      
      {/* EXPLORE HEADER & FILTERS */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-cyan-700">Global Peer Marketplace</div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Explore Verified Mentors</h1>
          <p className="text-xs text-slate-600 mt-1">Discover peers offering the skills you want to master in exchange for what you know.</p>
        </div>

        {/* Search & Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search skills (e.g. React, Spanish, PyTorch) or names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-purple-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none transition-colors shadow-xs placeholder-slate-400"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-purple-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MENTORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor, index) => {
          // Dynamic compatibility score simulation
          const score = 95 + (index % 4);

          return (
            <div
              key={mentor.id}
              className="glass-panel-hover p-6 rounded-3xl border border-slate-200/90 flex flex-col justify-between gap-6 relative group shadow-sm bg-white"
            >
              
              {/* Header Avatar & Compatibility Badge */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/30"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      {mentor.name}
                      {mentor.verified && <CheckCircle2 className="w-4 h-4 text-cyan-600" />}
                    </h3>
                    <p className="text-xs text-slate-500">{mentor.location}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-700 mt-0.5 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {mentor.rating} ({mentor.totalSessionsCompleted} sessions)
                    </div>
                  </div>
                </div>

                {/* Compatibility Ring Badge */}
                <div className="flex flex-col items-center">
                  <div className="relative w-11 h-11 flex items-center justify-center rounded-full bg-cyan-50 border border-cyan-300 shadow-sm">
                    <span className="text-xs font-black text-cyan-800">{score}%</span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold mt-1">AI Synergy</span>
                </div>
              </div>

              {/* Tagline & Bio */}
              <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                "{mentor.bio}"
              </p>

              {/* Skills Exchange Matrix */}
              <div className="flex flex-col gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-purple-700 tracking-wider">Offers:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {mentor.teachSkills.map((s) => (
                      <span key={s.name} className="px-2.5 py-0.5 rounded-md bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold">
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase text-cyan-800 tracking-wider">Wants to learn:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {mentor.learnSkills.map((s) => (
                      <span key={s.name} className="px-2.5 py-0.5 rounded-md bg-cyan-100 border border-cyan-200 text-cyan-900 text-xs font-bold">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    onSelectMentorForMatch(mentor);
                    onSelectView('aimatch');
                  }}
                  className="py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  AI Breakdown
                </button>

                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setBookingModalOpen(true);
                  }}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Session
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* BOOKING MODAL */}
      {bookingModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl flex flex-col gap-6 relative">
            
            <button
              onClick={() => {
                setBookingModalOpen(false);
                setBookedSuccess(false);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {bookedSuccess ? (
              <div className="flex flex-col items-center text-center gap-4 py-8 animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Skill Session Request Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-sm">
                  We reserved your 45-minute exchange session with <strong className="text-purple-700">{selectedMentor.name}</strong>.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => {
                      setBookingModalOpen(false);
                      setBookedSuccess(false);
                      onLaunchSession('session-101');
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-500/20"
                  >
                    Go to Classroom
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                  <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/20" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Schedule Swap with {selectedMentor.name}</h3>
                    <p className="text-xs text-purple-700 font-semibold">{selectedMentor.timezone} • {selectedMentor.rating} ★</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Select Available Slot</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-purple-600 font-medium">
                      {selectedMentor.availability.map((a, i) => (
                        <option key={i} value={a}>{a} ({selectedMentor.timezone})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Skill Exchange Goal Notes</label>
                    <textarea
                      rows={3}
                      placeholder="E.g. Let's spend 20 minutes on React server components and 25 minutes on Spanish conversational practice."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-purple-600 placeholder-slate-400"
                    />
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-700" />
                    <span>Reciprocal Exchange: 1h taught = 1h learned. Zero financial cost.</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookedSuccess(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
                >
                  Confirm Free Skill Swap Request
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
