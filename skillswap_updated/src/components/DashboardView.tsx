import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Video, 
  Clock, 
  Calendar, 
  Zap, 
  Compass, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { ViewMode, UserProfile, SessionItem } from '../types';
import { UPCOMING_SESSIONS, MENTORS_LIST } from '../data/mockData';

interface DashboardViewProps {
  user: UserProfile;
  onSelectView: (view: ViewMode) => void;
  onLaunchSession: (sessionId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onSelectView,
  onLaunchSession
}) => {
  return (
    <div className="flex flex-col gap-6 pb-16 max-w-5xl mx-auto w-full">
      
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{user.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onSelectView('aimatch')}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI Matchmaker
          </button>

          <button
            onClick={() => onSelectView('explore')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            Explore
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-600" /> Total XP
          </div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.xp.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1">Level {user.level} Fellow</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500" /> Karma Score
          </div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.karma}</div>
          <div className="text-[10px] text-slate-400 mt-1">Top 2% Mentor</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" /> Active Streak
          </div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.streakDays} Days</div>
          <div className="text-[10px] text-slate-400 mt-1">Daily Exchange Active</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-600" /> Exchanged Hours
          </div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.totalHoursExchanged}h</div>
          <div className="text-[10px] text-slate-400 mt-1">{user.totalSessionsCompleted} Sessions Completed</div>
        </div>
      </div>

      {/* Main Grid: Upcoming Sessions & Recommended Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* UPCOMING SESSIONS */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-600" />
              Upcoming Exchange Sessions
            </h3>
            <button
              onClick={() => onSelectView('messaging')}
              className="text-xs text-cyan-700 hover:text-cyan-800 font-medium"
            >
              Schedule New
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {UPCOMING_SESSIONS.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={session.peerAvatar}
                    alt={session.peerName}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>{session.peerName}</span>
                      <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                        {session.dateTime}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium mt-0.5">
                      {session.teachSkill} <span className="text-slate-400">↔</span> {session.learnSkill}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onLaunchSession(session.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors self-end sm:self-center shrink-0"
                >
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  Join Room
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED MENTORS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-600" />
              Recommended Swappers
            </h3>
            <button
              onClick={() => onSelectView('explore')}
              className="text-xs text-cyan-700 hover:text-cyan-800 font-medium"
            >
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {MENTORS_LIST.slice(0, 3).map((mentor) => (
              <div
                key={mentor.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                      {mentor.name}
                      {mentor.verified && <CheckCircle2 className="w-3 h-3 text-cyan-600 shrink-0" />}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Teaches {mentor.teachSkills[0]?.name}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectView('aimatch')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-cyan-600 hover:bg-white text-slate-700 text-xs font-semibold shrink-0 transition-colors"
                >
                  Match
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
