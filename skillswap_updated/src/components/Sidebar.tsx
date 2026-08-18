import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Sparkles, 
  MessageSquare, 
  Video, 
  Trophy, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';
import { ViewMode, UserProfile } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  user
}) => {
  const menuItems: { id: ViewMode; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Mentors', icon: Compass },
    { id: 'aimatch', label: 'AI Matchmaker', icon: Sparkles, badge: 'AI' },
    { id: 'messaging', label: 'Messages', icon: MessageSquare, badge: '3' },
    { id: 'livesession', label: 'Live Session', icon: Video },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside
      className={`fixed left-4 top-20 bottom-4 z-40 transition-all duration-200 ease-out bg-white rounded-2xl flex flex-col justify-between p-3 border border-slate-200 shadow-sm ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Upper navigation */}
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-colors group ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                }`}
              />

              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Stats & Collapse Footer */}
      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
        {!collapsed && (
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
              <span className="flex items-center gap-1 text-slate-800 font-semibold">
                <Zap className="w-3 h-3 text-cyan-600" /> Lvl {user.level}
              </span>
              <span className="text-slate-500 text-[10px]">{user.xp} XP</span>
            </div>
            {/* Simple XP Progress Bar */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-600 h-full rounded-full"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
