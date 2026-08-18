import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Flame, 
  User, 
  LogOut, 
  Compass, 
  LayoutDashboard,
  Settings,
  ChevronDown
} from 'lucide-react';
import { ViewMode, UserProfile } from '../types';
import { SkillSwapLogo } from './SkillSwapLogo';

interface NavigationNavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  user: UserProfile;
  onOpenSearch: () => void;
}

export const NavigationNavbar: React.FC<NavigationNavbarProps> = ({
  currentView,
  onSelectView,
  user,
  onOpenSearch,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mockNotifications = [
    { id: '1', title: 'Session Confirmed', desc: 'Elena accepted your React ↔ Spanish session', time: '10m ago' },
    { id: '2', title: 'New Skill Match', desc: '98% compatibility with Kenji Sato for PyTorch', time: '1h ago' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectView('landing')}
            className="flex items-center gap-2.5 group text-left"
          >
            <SkillSwapLogo className="w-8 h-8" />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Skill<span className="text-cyan-600">Swap</span>
            </span>
          </button>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-400 hover:text-slate-600 transition-colors text-xs"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search skills, mentors, or topics...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-500 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5" ref={menuRef}>
          
          {/* Quick Home / App Toggle */}
          {currentView === 'landing' ? (
            <button
              onClick={() => onSelectView('dashboard')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Open App
            </button>
          ) : (
            <button
              onClick={() => onSelectView('landing')}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Home
            </button>
          )}

          {/* Streak Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{user.streakDays}d</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileMenuOpen(false);
              }}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-600" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-900">
                  <span>Notifications</span>
                  <span className="text-[10px] text-cyan-600 font-semibold">2 New</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {mockNotifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-50 text-xs flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-800">{n.title}</span>
                      <span className="text-slate-500 text-[11px]">{n.desc}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <span className="text-xs font-semibold text-slate-800 hidden sm:block max-w-[100px] truncate">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 flex flex-col gap-0.5 animate-fade-in">
                <div className="px-2.5 py-2 border-b border-slate-100 mb-1">
                  <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user.handle}</div>
                </div>

                <button
                  onClick={() => {
                    onSelectView('profile');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-medium"
                >
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    onSelectView('dashboard');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-medium"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    onSelectView('onboarding');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center gap-2 font-medium"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  Edit Skills / Setup
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    onSelectView('login');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Switch User / Sign In
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
