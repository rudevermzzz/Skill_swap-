import React, { useState } from 'react';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Smile, 
  Code, 
  Phone, 
  Video, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Play, 
  Pause,
  Sparkles,
  Calendar
} from 'lucide-react';
import { ChatMessage, UserProfile, ViewMode } from '../types';
import { SAMPLE_CHAT_MESSAGES, MENTORS_LIST } from '../data/mockData';

interface MessagingViewProps {
  user: UserProfile;
  onLaunchSession: (sessionId: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({ user, onLaunchSession }) => {
  const [activePeer, setActivePeer] = useState<UserProfile>(MENTORS_LIST[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate instant peer AI response
    setTimeout(() => {
      const peerReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: activePeer.id,
        senderName: activePeer.name,
        senderAvatar: activePeer.avatar,
        text: `Awesome explanation! I reviewed the code. Looking forward to our live session!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: [{ emoji: '🔥', count: 1, userReacted: false }]
      };
      setMessages(prev => [...prev, peerReply]);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-120px)] glass-panel rounded-3xl border border-slate-200/90 overflow-hidden grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 animate-fade-in shadow-xl bg-white">
      
      {/* LEFT COLUMN: DM / PEER CHAT LIST */}
      <div className="bg-slate-50 border-r border-slate-200 flex flex-col justify-between p-4 gap-4">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Skill Exchanges
            </h2>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full border border-purple-200">
              3 Active
            </span>
          </div>

          {/* Search Peer */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-white border border-slate-300 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-xs"
            />
          </div>

          {/* Peer List */}
          <div className="flex flex-col gap-1.5 overflow-y-auto">
            {MENTORS_LIST.map((mentor) => {
              const isActive = activePeer.id === mentor.id;
              return (
                <button
                  key={mentor.id}
                  onClick={() => setActivePeer(mentor)}
                  className={`p-3 rounded-2xl flex items-center justify-between text-left transition-all border ${
                    isActive
                      ? 'bg-purple-50 border-purple-300 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        {mentor.name}
                        {mentor.verified && <CheckCircle2 className="w-3 h-3 text-cyan-600" />}
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {mentor.teachSkills[0]?.name}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* User Card */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs">
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover ring-1 ring-purple-500/20" />
          <div className="truncate">
            <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
            <div className="text-[10px] text-purple-700 font-semibold">Online & Available</div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: CHAT WINDOW */}
      <div className="md:col-span-2 lg:col-span-3 bg-white flex flex-col justify-between">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={activePeer.avatar} alt={activePeer.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200" />
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                {activePeer.name}
                <span className="text-[10px] text-cyan-800 bg-cyan-100 px-2 py-0.2 rounded-full border border-cyan-200 font-semibold">
                  {activePeer.timezone}
                </span>
              </div>
              <div className="text-xs text-purple-700 font-medium">
                Swapping: {user.teachSkills[0]?.name} ↔ {activePeer.teachSkills[0]?.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchSession('session-101')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5 text-cyan-200" />
              Launch Classroom
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-250px)] bg-slate-50/50">
          {messages.map((m) => {
            const isMe = m.senderId === user.id;

            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 max-w-lg ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <img src={m.senderAvatar} alt={m.senderName} className="w-8 h-8 rounded-xl object-cover shrink-0 mt-1 shadow-xs" />

                <div className={`flex flex-col gap-1.5 p-4 rounded-2xl text-xs leading-relaxed ${
                  isMe 
                    ? 'bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-500/20' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                }`}>
                  <div className={`flex items-center justify-between gap-4 text-[10px] font-bold ${isMe ? 'opacity-90' : 'text-slate-400'}`}>
                    <span>{m.senderName}</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <p className="font-medium">{m.text}</p>

                  {/* Code Snippet Attachment */}
                  {m.codeSnippet && (
                    <div className="mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      <pre><code>{m.codeSnippet.code}</code></pre>
                    </div>
                  )}

                  {/* Audio Message Attachment */}
                  {m.isAudio && (
                    <div className="mt-2 p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                      <button
                        onClick={() => setPlayingAudioId(playingAudioId === m.id ? null : m.id)}
                        className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center border border-cyan-300"
                      >
                        {playingAudioId === m.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-cyan-600 ${playingAudioId === m.id ? 'w-2/3 animate-pulse' : 'w-1/3'}`} />
                        </div>
                        <span className="text-[9px] text-slate-500 font-medium">Audio Voice Note • {m.audioDuration}</span>
                      </div>
                    </div>
                  )}

                  {/* Reactions */}
                  {m.reactions && (
                    <div className="flex gap-1 mt-1">
                      {m.reactions.map((r, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-amber-700 font-bold">
                          {r.emoji} {r.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <button type="button" className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-200">
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder={`Message ${activePeer.name}... (e.g. Share code or schedule swap)`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-xs"
          />

          <button
            type="button"
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2.5 rounded-xl border transition-all ${
              isRecording ? 'bg-red-50 text-red-600 border-red-300 animate-pulse' : 'text-slate-500 hover:text-slate-800 border-transparent'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
