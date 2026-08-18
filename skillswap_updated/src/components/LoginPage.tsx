import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check, 
  Sparkles,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { ViewMode, UserProfile } from '../types';
import { SkillSwapLogo } from './SkillSwapLogo';
import { CURRENT_USER, MENTORS_LIST } from '../data/mockData';

interface LoginPageProps {
  onSelectView: (view: ViewMode) => void;
  onLoginSuccess: (user?: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSelectView, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDemoId, setSelectedDemoId] = useState<string>(CURRENT_USER.id);

  // Available profiles for quick 1-click test login
  const availableUsers: UserProfile[] = [
    CURRENT_USER,
    ...MENTORS_LIST.slice(0, 3)
  ];

  const handleDemoSelect = (u: UserProfile) => {
    setSelectedDemoId(u.id);
    setName(u.name);
    setEmail(u.handle ? `${u.handle.replace('@', '')}@skillswap.dev` : 'user@skillswap.dev');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find matching demo user or create a new user profile
    const matchedUser = availableUsers.find(u => u.id === selectedDemoId);
    if (matchedUser && !isSignUp) {
      onLoginSuccess(matchedUser);
    } else {
      const newUser: UserProfile = {
        ...CURRENT_USER,
        id: `user-${Date.now()}`,
        name: name.trim() || 'New Swapper',
        handle: name ? `@${name.toLowerCase().replace(/\s+/g, '')}` : '@swapper',
        tagline: 'Ready to exchange knowledge and build projects',
        bio: 'New member exploring peer skills and AI matchmaking.',
      };
      onLoginSuccess(newUser);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6">
      
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden my-4">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkillSwapLogo className="w-8 h-8" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isSignUp ? 'Create SkillSwap Account' : 'Sign in to SkillSwap'}
              </h2>
              <p className="text-xs text-slate-500">Peer-to-peer knowledge & skill exchange</p>
            </div>
          </div>

          <button
            onClick={() => onSelectView('dashboard')}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-6">

          {/* Quick 1-Click Profile Selection */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Quick 1-Click Demo Profiles
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {availableUsers.map((u) => {
                const isSelected = selectedDemoId === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleDemoSelect(u)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-600 bg-cyan-50/50 ring-1 ring-cyan-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 truncate flex items-center justify-between">
                        {u.name}
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {u.teachSkills[0]?.name || 'Mentor'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] text-slate-400 uppercase font-semibold">
              Or login with credentials
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required={isSignUp}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-600 focus:bg-white rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@skillswap.dev"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-600 focus:bg-white rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {!isSignUp && (
                  <span className="text-[11px] text-slate-400">demo: anything</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-600 focus:bg-white rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{isSignUp ? 'Create Account & Sign In' : 'Sign In with Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5">
            <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-semibold text-cyan-700 hover:text-cyan-800"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
