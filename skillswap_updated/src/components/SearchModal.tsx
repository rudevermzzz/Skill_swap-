import React, { useState } from 'react';
import { Search, X, Sparkles, User, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { ViewMode } from '../types';
import { MENTORS_LIST } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: ViewMode) => void;
  onSelectMentor?: (mentorId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectView,
  onSelectMentor
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredMentors = MENTORS_LIST.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.teachSkills.some(s => s.name.toLowerCase().includes(query.toLowerCase())) ||
    m.learnSkills.some(s => s.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl glass-panel rounded-2xl border border-purple-500/30 p-4 shadow-2xl overflow-hidden flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 bg-zinc-900/90 rounded-xl border border-white/10">
          <Search className="w-5 h-5 text-purple-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Spanish, PyTorch), mentors, or views..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Views navigation suggestions */}
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Quick Navigation</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'AI Matchmaker', view: 'aimatch' as ViewMode, icon: Sparkles, color: 'text-cyan-400' },
              { label: 'Explore Mentors', view: 'explore' as ViewMode, icon: Compass, color: 'text-purple-400' },
              { label: 'Live Session', view: 'livesession' as ViewMode, icon: BookOpen, color: 'text-red-400' },
              { label: 'Leaderboard', view: 'leaderboard' as ViewMode, icon: User, color: 'text-amber-400' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectView(item.view);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-purple-500/30 flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-all text-left group"
                >
                  <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results */}
        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Matching Mentors & Skills</div>
          {filteredMentors.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 text-xs">
              No exact mentor matches found for "{query}". Try searching for React, Spanish, or PyTorch!
            </div>
          ) : (
            filteredMentors.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  if (onSelectMentor) onSelectMentor(m.id);
                  onSelectView('explore');
                  onClose();
                }}
                className="p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/40 hover:bg-purple-950/20 cursor-pointer flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      {m.name}
                      <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.2 rounded-full border border-cyan-500/20">
                        ⭐ {m.rating}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 line-clamp-1">{m.tagline}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        <div className="text-[10px] text-zinc-500 text-center border-t border-white/5 pt-2">
          Press <kbd className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded">ESC</kbd> or click outside to dismiss
        </div>
      </div>
    </div>
  );
};
