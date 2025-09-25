import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Weather } from './components/Weather';
import { FarmerProfile } from './components/FarmerProfile';
import { Settings } from './components/Settings';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { UnifiedAIAssistant } from './components/UnifiedAIAssistant';
import { SignIn } from './components/SignIn';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { LanguageToggle } from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { 
  Home, 
  Cloud, 
  User, 
  Settings as SettingsIcon, 
  MessageCircle,
  FileText,
  Wifi,
  WifiOff,
  Bell,
  LogOut,
  Globe
} from 'lucide-react';

type TabType = 'dashboard' | 'weather' | 'schemes' | 'assistant' | 'profile' | 'settings';

interface UserData {
  name: string;
  phone: string;
  email?: string;
  farmLocation: string;
  farmSize: string;
  cropTypes: string;
  experience: string;
  isNewUser: boolean;
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [shouldScrollToRecommendations, setShouldScrollToRecommendations] = useState(false);
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard' as TabType, label: t('nav.home'), icon: Home },
    { id: 'schemes' as TabType, label: t('nav.schemes'), icon: FileText },
    { id: 'assistant' as TabType, label: t('nav.assistant'), icon: MessageCircle },
    { id: 'profile' as TabType, label: t('nav.profile'), icon: User }
  ];

  const handleSignIn = (data: UserData) => {
    setUserData(data);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setActiveTab('dashboard');
  };

  const handleNotificationClick = () => {
    setActiveTab('dashboard');
    setShouldScrollToRecommendations(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            shouldScrollToRecommendations={shouldScrollToRecommendations}
            onScrollComplete={() => setShouldScrollToRecommendations(false)}
          />
        );
      case 'weather':
        return <Weather />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'profile':
        return <FarmerProfile userData={userData} />;
      case 'settings':
        return <Settings />;
      case 'assistant':
        return <UnifiedAIAssistant />;
      default:
        return (
          <Dashboard 
            shouldScrollToRecommendations={shouldScrollToRecommendations}
            onScrollComplete={() => setShouldScrollToRecommendations(false)}
          />
        );
    }
  };

  // Show sign-in screen if not authenticated
  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#FAF0E6] via-[#F5F5DC] to-[#FFF8DC] text-gray-800 shadow-xl border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gray-200/50">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide">{t('app.title')}</h1>
                <p className="text-gray-600 text-xs font-medium">
                  {t('dashboard.welcome', { name: userData?.name || 'User' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Notification Bell */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNotificationClick}
                className="text-gray-700 hover:bg-gray-200/50 rounded-full w-8 h-8 p-0 relative"
                title="View Today's Recommendations"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FF9800] rounded-full"></div>
              </Button>
              
              {/* Online/Offline Indicator */}
              <Badge 
                className={`${
                  isOnline 
                    ? 'bg-white/70 text-gray-700 border-gray-300 hover:bg-white/90' 
                    : 'bg-[#FF9800]/90 text-white border-[#FF9800]'
                } backdrop-blur-sm px-2 py-1 rounded-full font-medium shadow-sm text-xs`}
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 mr-1.5" />
                    {t('app.online')}
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 mr-1.5" />
                    {t('app.offline')}
                  </>
                )}
              </Badge>

              {/* Sign Out Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-700 hover:bg-gray-200/50 rounded-full w-8 h-8 p-0"
                title={t('app.signOut')}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gradient-to-r from-[#FFFAF0] via-[#FAF0E6] to-[#F5F5DC] backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <div className="px-1 py-1.5">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex-col gap-0.5 h-12 transition-all duration-300 rounded-xl mx-0.5 ${
                    isActive 
                      ? 'text-[#4CAF50] bg-[#4CAF50]/10 shadow-lg border-2 border-[#4CAF50]/20' 
                      : 'text-gray-700 hover:text-[#4CAF50] hover:bg-gray-100/50'
                  }`}
                >
                  <div className={`p-1 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-[#4CAF50]/15' : 'hover:bg-gray-100/50'
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#4CAF50]' : ''}`} />
                  </div>
                  <div className="text-center">
                    <span className={`text-[10px] font-medium leading-tight ${isActive ? 'text-[#4CAF50]' : ''}`}>
                      {tab.label}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
