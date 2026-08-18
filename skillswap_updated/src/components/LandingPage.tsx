import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  CheckCircle2, 
  Zap, 
  Video, 
  ShieldCheck, 
  Flame, 
  Users, 
  Repeat, 
  ChevronDown, 
  Star,
  Compass,
  Lock,
  Code,
  Award
} from 'lucide-react';
import { ViewMode } from '../types';
import { MENTORS_LIST } from '../data/mockData';
import { SkillSwapLogo } from './SkillSwapLogo';

interface LandingPageProps {
  onSelectView: (view: ViewMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectView }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive Swap Playground State on Landing Page
  const [offerSkill, setOfferSkill] = useState('React & TypeScript');
  const [wantSkill, setWantSkill] = useState('Native Spanish');

  const stats = [
    { label: 'Active Swappers', value: '42,800+' },
    { label: 'Sessions Exchanged', value: '185,000+' },
    { label: 'Countries Represented', value: '124' },
    { label: 'Avg AI Match Accuracy', value: '98.6%' },
  ];

  const faqs = [
    {
      q: 'How does SkillSwap work without money?',
      a: 'SkillSwap operates on a peer-to-peer reciprocity model. When you teach a skill to a peer for 1 hour, you earn 1 hour of Learning Credits + Karma XP, which you can use to learn any other skill from any verified mentor on the platform.'
    },
    {
      q: 'How does the AI Matchmaker ensure compatibility?',
      a: 'Our Gemini-powered AI engine analyzes 8 core signals: skills offered, skills needed, complementary timezones, preferred learning modality (e.g. live project vs structured), language fluency, and karma completion metrics.'
    },
    {
      q: 'Are skill levels verified?',
      a: 'Yes! Mentors undergo peer verification, portfolio code reviews, and community endorsements. Verified badges are awarded when mentors complete at least 10 high-rated exchange hours.'
    },
    {
      q: 'What if I am a beginner at teaching?',
      a: 'SkillSwap provides AI-generated session agendas, icebreaker cards, and collaborative whiteboards so anyone can comfortably teach what they know.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-purple-600 selection:text-white">
      
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-200/50 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col gap-24">

        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center pt-8 gap-8 max-w-4xl mx-auto">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 shadow-xs text-xs font-bold text-purple-900">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The Zero-Dollar Skill Exchange Powered by AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-slate-900">
            Learn <span className="text-gradient-purple">Anything</span>.<br />
            Teach <span className="text-gradient-cyan">Everything</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
            No money involved. Swap your expertise with global mentors using AI-powered matching, live video classrooms, and gamified XP progression.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onSelectView('onboarding')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold text-base hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-purple-500/20 group"
            >
              Start Skill Swapping Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onSelectView('aimatch')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-base border border-slate-300 transition-all flex items-center justify-center gap-2.5 shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-cyan-600" />
              Try AI Matchmaker
            </button>
          </div>

          {/* INTERACTIVE SWAP SIMULATOR WIDGET */}
          <div className="w-full mt-6 p-6 glass-panel rounded-3xl border border-purple-200 shadow-xl flex flex-col gap-6 text-left relative overflow-hidden group bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
                <Repeat className="w-4 h-4 text-cyan-600" />
                Live Skill Match Simulator
              </div>
              <span className="text-[11px] text-slate-500 font-mono font-bold">100% Reciprocal • 0 Fees</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              
              {/* You Teach */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-purple-200 flex flex-col gap-2">
                <label className="text-xs font-bold text-purple-900 uppercase">I can teach:</label>
                <select
                  value={offerSkill}
                  onChange={(e) => setOfferSkill(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-purple-600 font-semibold shadow-xs"
                >
                  <option value="React & TypeScript">React & TypeScript</option>
                  <option value="Figma Design Systems">Figma Design Systems</option>
                  <option value="Python & AI Models">Python & AI Models</option>
                  <option value="SaaS Growth Marketing">SaaS Growth Marketing</option>
                </select>
              </div>

              {/* You Learn */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-cyan-200 flex flex-col gap-2">
                <label className="text-xs font-bold text-cyan-900 uppercase">I want to learn:</label>
                <select
                  value={wantSkill}
                  onChange={(e) => setWantSkill(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-cyan-600 font-semibold shadow-xs"
                >
                  <option value="Native Spanish">Native Spanish</option>
                  <option value="PyTorch & Deep Learning">PyTorch & Deep Learning</option>
                  <option value="Japanese Language">Japanese Language</option>
                  <option value="Rust & WebAssembly">Rust & WebAssembly</option>
                </select>
              </div>

            </div>

            {/* Instant AI Match Preview Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  98%
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">AI Match Found: Elena Rostova</div>
                  <div className="text-xs text-slate-600 font-medium">Teaches {wantSkill} • Learning {offerSkill}</div>
                </div>
              </div>
              <button
                onClick={() => onSelectView('aimatch')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                Inspect AI Match
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </section>

        {/* LIVE STATS COUNTER */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border border-slate-200 hover:border-purple-300 transition-all bg-white shadow-xs">
              <span className="text-3xl sm:text-4xl font-black text-gradient-purple">{s.value}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </section>

        {/* FEATURED MENTORS SHOWCASE */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-800 mb-1">Top Tier Exchange Mentors</div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Learn directly from verified experts.</h2>
            </div>
            <button
              onClick={() => onSelectView('explore')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5"
            >
              Explore all 1,200+ Mentors
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MENTORS_LIST.slice(0, 3).map((mentor) => (
              <div
                key={mentor.id}
                className="glass-panel-hover p-6 rounded-3xl border border-slate-200 flex flex-col justify-between gap-6 relative group bg-white shadow-xs hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/20"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                      {mentor.name}
                      {mentor.verified && <CheckCircle2 className="w-4 h-4 text-cyan-600" />}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{mentor.location}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-700 mt-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {mentor.rating} ({mentor.totalSessionsCompleted} sessions)
                    </div>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-col gap-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase">Teaches:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {mentor.teachSkills.map((s) => (
                        <span key={s.name} className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-cyan-800 uppercase">Wants to learn:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {mentor.learnSkills.map((s) => (
                        <span key={s.name} className="px-2.5 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-semibold">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectView('aimatch')}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  Request AI Compatibility Match
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS TIMELINE */}
        <section className="flex flex-col gap-12 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 relative overflow-hidden shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-purple-700 mb-2">Architected for Reciprocity</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How SkillSwap Works in 4 Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Define Skills',
                desc: 'Specify what you excel at teaching and what you want to master.',
                icon: Code
              },
              {
                step: '02',
                title: 'AI Matching',
                desc: 'Our neural algorithm computes timezone, style & synergy compatibility.',
                icon: Sparkles
              },
              {
                step: '03',
                title: 'Live Classroom',
                desc: 'Connect in an interactive video room with AI auto-transcription & whiteboard.',
                icon: Video
              },
              {
                step: '04',
                title: 'Earn XP & Badges',
                desc: 'Gain verified reputation, level up your rank & unlock certificates.',
                icon: Award
              }
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-purple-300">{st.step}</span>
                    <div className="p-2.5 rounded-xl bg-purple-100 border border-purple-200 text-purple-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-800 mb-1">Frequently Asked Questions</div>
            <h2 className="text-3xl font-black text-slate-900">Everything you need to know.</h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-purple-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-600 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CALL TO ACTION */}
        <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 border border-purple-600 flex flex-col items-center text-center gap-6 relative overflow-hidden shadow-xl text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-200">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl leading-tight">
            Ready to exchange skills with the world?
          </h2>
          <p className="text-sm text-purple-100 max-w-md font-medium">
            Join 42,000+ developers, designers, polyglots, and creators learning without paywalls.
          </p>
          <button
            onClick={() => onSelectView('onboarding')}
            className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2"
          >
            Create Your Free SkillSwap Profile
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200 py-8 px-6 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-slate-700 font-bold">
          <SkillSwapLogo className="w-5 h-5" />
          SkillSwap Protocol © 2026. All rights reserved.
        </div>
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms of Exchange</a>
          <a href="#" className="hover:text-slate-900 transition-colors">AI Ethics</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Community Guidelines</a>
        </div>
      </footer>

    </div>
  );
};
