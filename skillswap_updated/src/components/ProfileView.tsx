import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Star, 
  Award, 
  Flame, 
  Zap, 
  Globe, 
  ThumbsUp, 
  Edit3,
  X
} from 'lucide-react';
import { UserProfile, ViewMode, VerifiedSkill } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onSelectView: (view: ViewMode) => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onSelectView, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [tagline, setTagline] = useState(user.tagline);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');

  const [endorsements, setEndorsements] = useState<Record<string, number>>({
    'React & Next.js': 48,
    'TypeScript': 52,
    'System Architecture': 31
  });

  const handleEndorse = (skillName: string) => {
    setEndorsements(prev => ({
      ...prev,
      [skillName]: (prev[skillName] || 0) + 1
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        name,
        handle,
        tagline,
        bio,
        location
      });
    }
    setIsEditing(false);
  };

  const handleAddTeachSkill = () => {
    if (!newTeachSkill.trim()) return;
    const newSkill: VerifiedSkill = {
      name: newTeachSkill.trim(),
      category: 'General',
      level: 'Intermediate',
      verified: true,
      endorsements: 1
    };
    if (onUpdateUser) {
      onUpdateUser({
        teachSkills: [...user.teachSkills, newSkill]
      });
    }
    setNewTeachSkill('');
  };

  const handleAddLearnSkill = () => {
    if (!newLearnSkill.trim()) return;
    const newSkill: VerifiedSkill = {
      name: newLearnSkill.trim(),
      category: 'General',
      level: 'Beginner',
      verified: false,
      endorsements: 0
    };
    if (onUpdateUser) {
      onUpdateUser({
        learnSkills: [...user.learnSkills, newSkill]
      });
    }
    setNewLearnSkill('');
  };

  const handleRemoveTeachSkill = (skillName: string) => {
    if (onUpdateUser) {
      onUpdateUser({
        teachSkills: user.teachSkills.filter(s => s.name !== skillName)
      });
    }
  };

  const handleRemoveLearnSkill = (skillName: string) => {
    if (onUpdateUser) {
      onUpdateUser({
        learnSkills: user.learnSkills.filter(s => s.name !== skillName)
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-16 max-w-5xl mx-auto w-full">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.name}</h1>
                {user.verified && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{user.handle} • {user.location}</p>
              <p className="text-xs text-slate-700 mt-1 max-w-xl leading-relaxed">{user.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>

            <button
              onClick={() => onSelectView('login')}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Switch User
            </button>
          </div>

        </div>

        {/* Inline Edit Mode */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Edit Profile Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-600 font-medium">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-600 font-medium">Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs text-slate-600 font-medium">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs text-slate-600 font-medium">Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-600 font-medium">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium">Total Sessions</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.totalSessionsCompleted}</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium">Hours Exchanged</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.totalHoursExchanged}h</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium">Exchange Streak</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.streakDays} Days</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium">Karma Score</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{user.karma}</div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* TEACHING SKILLS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-600" />
              Skills I Teach
            </h3>
            <span className="text-xs text-slate-400 font-medium">{user.teachSkills.length} skills</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {user.teachSkills.map((s) => (
              <div key={s.name} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {s.name}
                    {s.verified && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />}
                  </div>
                  <div className="text-[10px] text-slate-500">{s.level} • {s.category}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEndorse(s.name)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-cyan-600 text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3 text-cyan-600" />
                    {endorsements[s.name] || s.endorsements}
                  </button>
                  <button
                    onClick={() => handleRemoveTeachSkill(s.name)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    title="Remove skill"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Skill Input */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Add skill to teach (e.g. Python)..."
              value={newTeachSkill}
              onChange={(e) => setNewTeachSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddTeachSkill(); }}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
            />
            <button
              onClick={handleAddTeachSkill}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>

        {/* LEARNING OBJECTIVES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyan-600" />
              Skills I Want to Learn
            </h3>
            <span className="text-xs text-slate-400 font-medium">{user.learnSkills.length} goals</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {user.learnSkills.map((s) => (
              <div key={s.name} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">{s.name}</div>
                  <div className="text-[10px] text-slate-500">Goal: {s.level} • {s.category}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-semibold border border-cyan-100">
                    Active
                  </span>
                  <button
                    onClick={() => handleRemoveLearnSkill(s.name)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    title="Remove goal"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Goal Input */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Add skill to learn (e.g. Spanish)..."
              value={newLearnSkill}
              onChange={(e) => setNewLearnSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddLearnSkill(); }}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-cyan-600"
            />
            <button
              onClick={handleAddLearnSkill}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>

      </div>

      {/* Peer Reviews */}
      {user.reviews && user.reviews.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            Recent Peer Reviews
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.reviews.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={r.authorAvatar} alt={r.authorName} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{r.authorName}</div>
                      <div className="text-[10px] text-cyan-700 font-medium">{r.skillExchanged}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600">★ {r.rating}.0</span>
                </div>
                <p className="text-xs text-slate-600 italic mt-1">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
