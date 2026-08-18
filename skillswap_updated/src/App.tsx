import React, { useState } from 'react';
import { ViewMode, UserProfile } from './types';
import { CURRENT_USER } from './data/mockData';
import { NavigationNavbar } from './components/NavigationNavbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { DashboardView } from './components/DashboardView';
import { ExploreView } from './components/ExploreView';
import { AIMatchmakerView } from './components/AIMatchmakerView';
import { ProfileView } from './components/ProfileView';
import { MessagingView } from './components/MessagingView';
import { LiveSessionView } from './components/LiveSessionView';
import { LeaderboardView } from './components/LeaderboardView';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [user, setUser] = useState<UserProfile>(CURRENT_USER);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedMentorForMatch, setSelectedMentorForMatch] = useState<UserProfile | null>(null);

  const handleOnboardingComplete = (data: any) => {
    setUser(prev => ({
      ...prev,
      bio: data.generatedBio || prev.bio,
      learningStyle: data.preferredStyle || prev.learningStyle,
      timezone: data.timezone || prev.timezone
    }));
    setCurrentView('dashboard');
  };

  const handleLoginSuccess = (loggedInUser?: UserProfile) => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setCurrentView('dashboard');
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updated
    }));
  };

  const isFullWidthPage = currentView === 'landing' || currentView === 'login' || currentView === 'onboarding';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* Top Navbar */}
      <NavigationNavbar
        currentView={currentView}
        onSelectView={setCurrentView}
        user={user}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Layout */}
      {isFullWidthPage ? (
        <div className="flex-1">
          {currentView === 'landing' && (
            <LandingPage onSelectView={setCurrentView} />
          )}

          {currentView === 'login' && (
            <LoginPage
              onSelectView={setCurrentView}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {currentView === 'onboarding' && (
            <OnboardingFlow
              onComplete={handleOnboardingComplete}
              onCancel={() => setCurrentView('dashboard')}
            />
          )}
        </div>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 flex gap-6 relative">
          
          {/* Floating Sidebar */}
          <Sidebar
            currentView={currentView}
            onSelectView={setCurrentView}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            user={user}
          />

          {/* View Container */}
          <main
            className={`flex-1 transition-all duration-200 ${
              sidebarCollapsed ? 'pl-20' : 'pl-60'
            }`}
          >
            {currentView === 'dashboard' && (
              <DashboardView
                user={user}
                onSelectView={setCurrentView}
                onLaunchSession={() => setCurrentView('livesession')}
              />
            )}

            {currentView === 'explore' && (
              <ExploreView
                onSelectView={setCurrentView}
                onSelectMentorForMatch={(m) => {
                  setSelectedMentorForMatch(m);
                  setCurrentView('aimatch');
                }}
                onLaunchSession={() => setCurrentView('livesession')}
              />
            )}

            {currentView === 'aimatch' && (
              <AIMatchmakerView
                user={user}
                selectedMentorForMatch={selectedMentorForMatch}
                onSelectView={setCurrentView}
                onLaunchSession={() => setCurrentView('livesession')}
              />
            )}

            {currentView === 'profile' && (
              <ProfileView
                user={user}
                onSelectView={setCurrentView}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {currentView === 'messaging' && (
              <MessagingView
                user={user}
                onLaunchSession={() => setCurrentView('livesession')}
              />
            )}

            {currentView === 'livesession' && (
              <LiveSessionView
                user={user}
                onLeaveSession={() => setCurrentView('dashboard')}
              />
            )}

            {currentView === 'leaderboard' && (
              <LeaderboardView />
            )}
          </main>

        </div>
      )}

      {/* Global CMD+K Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectView={setCurrentView}
      />

    </div>
  );
}
