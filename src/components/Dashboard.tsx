import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Droplets, 
  Leaf, 
  Bug, 
  TrendingUp, 
  ArrowUp,
  Calendar,
  Target,
  Mic,
  Camera,
  MapPin,
  Banknote,
  FileText,
  MessageSquare,
  Navigation,
  Sun,
  CloudRain,
  Bell,
  Wind,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { QuickChat } from './QuickChat';
import { LanguageToggle } from './LanguageToggle';
import { AIAssistantSection } from './AIAssistantSection';
import { useLanguage } from '../contexts/LanguageContext';

const yieldData = [
  { month: 'Jan', yield: 65, color: '#10b981' },
  { month: 'Feb', yield: 70, color: '#10b981' },
  { month: 'Mar', yield: 85, color: '#059669' },
  { month: 'Apr', yield: 90, color: '#047857' },
  { month: 'May', yield: 95, color: '#065f46' },
  { month: 'Jun', yield: 88, color: '#059669' }
];



interface DashboardProps {
  shouldScrollToRecommendations?: boolean;
  onScrollComplete?: () => void;
}

export function Dashboard({ shouldScrollToRecommendations = false, onScrollComplete }: DashboardProps) {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
    setTimeout(() => setIsListening(false), 3000);
  };

  const handleCameraSearch = () => {
    // Camera functionality for disease detection would be implemented here
    console.log('Opening camera for crop disease detection');
  };

  useEffect(() => {
    if (shouldScrollToRecommendations && recommendationsRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        if (recommendationsRef.current) {
          // Calculate the offset to account for the header
          const headerHeight = 100; // Approximate header height
          const elementTop = recommendationsRef.current.offsetTop - headerHeight;
          
          // Scroll to the element
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
          });
          
          // Add a visual highlight effect
          recommendationsRef.current.style.boxShadow = '0 0 20px 4px rgba(62, 156, 59, 0.4)';
          recommendationsRef.current.style.transition = 'box-shadow 0.3s ease';
          
          // Remove the highlight after 2 seconds
          setTimeout(() => {
            if (recommendationsRef.current) {
              recommendationsRef.current.style.boxShadow = '';
            }
          }, 2000);
        }
        
        // Call onScrollComplete after the scroll animation
        setTimeout(() => {
          onScrollComplete?.();
        }, 1000);
      }, 200);
    }
  }, [shouldScrollToRecommendations, onScrollComplete]);

  const quickStats = [
    { label: t('dashboard.cropArea'), value: `5.2 ${t('common.hectare')}`, icon: Target, color: 'bg-blue-500', change: '' },
    { label: 'पानी की आवश्यकता • Water Needed', value: `200 ${t('common.liters')}`, icon: Droplets, color: 'bg-cyan-500', change: 'आज • Today' },
    { label: t('dashboard.nextHarvest'), value: `12 ${t('common.days')}`, icon: Calendar, color: 'bg-orange-500', change: '' }
  ];

  const recommendations = [
    {
      icon: Droplets,
      title: 'सिंचाई की आवश्यकता',
      titleEn: 'Irrigation Needed',
      description: 'आज अपने गेहूं के खेत में पानी दें। मिट्टी में नमी कम है।',
      descriptionEn: 'Water your wheat field today. Soil moisture is low.',
      priority: 'high',
      action: 'अभी पानी दें'
    },
    {
      icon: Leaf,
      title: 'उर्वरक का समय',
      titleEn: 'Fertilization Due',
      description: 'इस सप्ताह मक्के के खेत में नाइट्रोजन उर्वरक डालें।',
      descriptionEn: 'Apply nitrogen fertilizer to corn field this week.',
      priority: 'medium',
      action: 'उर्वरक डालें'
    },
    {
      icon: Bug,
      title: 'कीट चेतावनी',
      titleEn: 'Pest Alert',
      description: 'चावल के खेत में कीट गतिविधि की जांच करें।',
      descriptionEn: 'Check rice field for pest activity.',
      priority: 'high',
      action: 'जांच करें'
    }
  ];



  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <>
      <div className="space-y-6 p-4 pb-20">
        {/* Welcome Section with Location */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{t('dashboard.welcome', { name: 'राजेश जी' })}</h2>
              <div className="flex items-center gap-2 text-green-100 text-sm">
                <MapPin className="w-4 h-4" />
                <span>पूना, महाराष्ट्र • Pune, Maharashtra</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">28°C</div>
              <div className="text-green-100 text-sm">���️ धूप</div>
            </div>
          </div>
          
          {/* Weather Summary */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-5 h-5" />
              <span className="font-semibold">मौसम सारांश • Weather Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4" />
                  <span className="font-semibold">हवा • Wind</span>
                </div>
                <div className="text-lg font-bold">12 km/h</div>
                <div className="text-xs text-green-200">पूर्व • East</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4" />
                  <span className="font-semibold">दृश्यता • Visibility</span>
                </div>
                <div className="text-lg font-bold">10 km</div>
                <div className="text-xs text-blue-200">स्पष्ट • Clear</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white/10 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span>🌅 सूर्योदय: 6:24 AM</span>
                <span>🌅 सूर्यास्त: 6:45 PM</span>
              </div>
              <div className="mt-2 text-xs text-center text-green-100">
                <CloudRain className="w-3 h-3 inline mr-1" />
                कल बारिश की संभावना • Rain expected tomorrow
              </div>
            </div>
          </div>
        </div>

        {/* Prominent Voice & Camera Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={handleVoiceInput}
            className={`h-20 flex-col gap-3 transition-all duration-300 rounded-3xl shadow-xl text-white ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse' 
                : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            <Mic className="w-8 h-8" />
            <div className="text-center">
              <div className="font-bold text-base">
                {isListening ? 'सुन रहा हूँ...' : 'आवाज़ से पूछें'}
              </div>
              <div className="text-xs opacity-90">
                {isListening ? 'Listening...' : 'Voice Search'}
              </div>
            </div>
          </Button>
          
          <Button 
            onClick={handleCameraSearch}
            className="h-20 flex-col gap-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 rounded-3xl shadow-xl"
          >
            <Camera className="w-8 h-8" />
            <div className="text-center">
              <div className="font-bold text-base">रोग जांच</div>
              <div className="text-xs opacity-90">Disease Check</div>
            </div>
          </Button>
        </div>

        {/* Quick Access Features */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="h-16 flex-col gap-2 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg"
          >
            <FileText className="w-6 h-6" />
            <div className="text-xs font-semibold text-center">
              <div>योजनाएं</div>
              <div className="opacity-80">Schemes</div>
            </div>
          </Button>
          
          <Button 
            className="h-16 flex-col gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl shadow-lg"
          >
            <Navigation className="w-6 h-6" />
            <div className="text-xs font-semibold text-center">
              <div>मौसम</div>
              <div className="opacity-80">Weather</div>
            </div>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900 truncate">{stat.value}</p>
                    {stat.subValue && (
                      <p className="text-sm text-gray-700 truncate">{stat.subValue}</p>
                    )}
                    <p className="text-xs text-gray-600 truncate">{stat.label}</p>
                    {stat.change && (
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>



        {/* Predicted Yield Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">{t('dashboard.yieldPrediction')}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Bar dataKey="yield" radius={[8, 8, 0, 0]}>
                    {yieldData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-2xl">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-800 mb-1">88%</p>
                <p className="text-green-700 font-medium">{t('dashboard.expectedYield')}</p>
                <p className="text-green-600 text-sm mt-1">{t('dashboard.aboveAverage')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Section */}
        <AIAssistantSection />



        {/* Personalized Recommendations */}
        <Card ref={recommendationsRef} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center relative">
                <Bell className="w-5 h-5 text-white" />
                {shouldScrollToRecommendations && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                )}
              </div>
              <div>
                <div className="text-lg font-bold">आज की सिफारिशें • {t('dashboard.recommendations')}</div>
                <div className="text-sm text-gray-600">Today's Important Tasks</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div key={index} className={`p-4 rounded-2xl border-2 ${getPriorityColor(rec.priority)} shadow-sm hover:shadow-md transition-all duration-300`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${rec.priority === 'high' ? 'bg-red-500' : rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-base mb-1">{rec.title}</h4>
                          <h5 className="text-sm opacity-70 mb-2">{rec.titleEn}</h5>
                        </div>
                        <Button size="sm" className="bg-white/80 text-gray-700 hover:bg-white border shadow-sm rounded-xl text-xs px-3">
                          {rec.action}
                        </Button>
                      </div>
                      <p className="text-sm leading-relaxed mb-1">{rec.description}</p>
                      <p className="text-xs opacity-70">{rec.descriptionEn}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Chat Component */}
      <QuickChat />
    </>
  );
}