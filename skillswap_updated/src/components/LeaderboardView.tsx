import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Star, 
  Zap, 
  Award, 
  CheckCircle2, 
  ThumbsUp, 
  Globe 
} from 'lucide-react';
import { LeaderboardUser } from '../types';
import { LEADERBOARD_USERS } from '../data/mockData';

export const LeaderboardView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('monthly');
  const [applauseMap, setApplauseMap] = useState<Record<string, number>>({});

  const handleApplause = (id: string) => {
    setApplauseMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const topThree = LEADERBOARD_USERS.slice(0, 3);
  const restUsers = LEADERBOARD_USERS.slice(3);

  return (
    <div className="flex flex-col gap-8 pb-16 animate-fade-in">
      
      {/* LEADERBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-2 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            SkillSwap Hall of Fame
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Global Leaderboard & Ranks</h1>
          <p className="text-xs text-slate-600 mt-1">Celebrating top reciprocal mentors based on XP, karma, and exchange streaks.</p>
        </div>

        {/* Timeframe Filter Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300">
          {(['weekly', 'monthly', 'alltime'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                timeframe === tf
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-end">
        
        {/* RANK 2 (Left Podium) */}
        {topThree[1] && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col items-center text-center gap-3 relative order-2 md:order-1 bg-white shadow-sm">
            <div className="absolute -top-4 px-3 py-1 bg-slate-100 border border-slate-300 rounded-full text-slate-700 font-extrabold text-xs">
              #2 SILVER
            </div>
            <img src={topThree[1].avatar} alt={topThree[1].name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-300 mt-2" />
            <div>
              <h3 className="text-base font-bold text-slate-900">{topThree[1].name}</h3>
              <p className="text-xs text-purple-700 font-medium">{topThree[1].topSkill}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> {topThree[1].xp.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* RANK 1 (Center Tallest Podium) */}
        {topThree[0] && (
          <div className="glass-panel p-8 rounded-3xl border-2 border-amber-400 flex flex-col items-center text-center gap-4 relative shadow-xl shadow-amber-500/10 order-1 md:order-2 bg-gradient-to-b from-amber-50/50 to-white">
            <div className="absolute -top-5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-slate-950 font-black text-xs flex items-center gap-1 shadow-md">
              <Crown className="w-4 h-4 fill-slate-950" /> #1 GRANDMASTER
            </div>
            <img src={topThree[0].avatar} alt={topThree[0].name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-400 mt-2 shadow-lg" />
            <div>
              <h3 className="text-lg font-black text-slate-900">{topThree[0].name}</h3>
              <p className="text-xs text-cyan-800 font-bold">{topThree[0].topSkill}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300 shadow-xs">
              <Zap className="w-4 h-4 text-amber-600" /> {topThree[0].xp.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* RANK 3 (Right Podium) */}
        {topThree[2] && (
          <div className="glass-panel p-6 rounded-3xl border border-amber-200 flex flex-col items-center text-center gap-3 relative order-3 bg-white shadow-sm">
            <div className="absolute -top-4 px-3 py-1 bg-amber-50 border border-amber-300 rounded-full text-amber-900 font-extrabold text-xs">
              #3 BRONZE
            </div>
            <img src={topThree[2].avatar} alt={topThree[2].name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-300 mt-2" />
            <div>
              <h3 className="text-base font-bold text-slate-900">{topThree[2].name}</h3>
              <p className="text-xs text-purple-700 font-medium">{topThree[2].topSkill}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> {topThree[2].xp.toLocaleString()} XP
            </div>
          </div>
        )}

      </div>

      {/* FULL LEADERBOARD TABLE LIST */}
      <div className="glass-panel rounded-3xl border border-slate-200/90 p-6 flex flex-col gap-4 bg-white shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Award className="w-5 h-5 text-purple-600" />
          Full Swapper Rankings
        </h3>

        <div className="flex flex-col gap-2">
          {LEADERBOARD_USERS.map((u) => (
            <div
              key={u.id}
              className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all border ${
                u.name.includes('(You)')
                  ? 'bg-purple-50/90 border-purple-300 text-slate-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-6 font-black text-sm text-center text-purple-700">#{u.rank}</span>
                <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200" />
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {u.name}
                    <span className="text-[10px] text-slate-500">{u.country}</span>
                  </div>
                  <div className="text-xs text-purple-700 font-medium">{u.topSkill}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-900">{u.xp.toLocaleString()} XP</span>
                  <span className="text-[10px] text-amber-700 font-bold">{u.karma} Karma</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {u.streak}d
                </div>

                <button
                  onClick={() => handleApplause(u.id)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-cyan-600" />
                  {applauseMap[u.id] || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
