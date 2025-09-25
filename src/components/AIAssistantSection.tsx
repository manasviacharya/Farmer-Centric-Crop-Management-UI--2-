import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  Sparkles, 
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const recentConversations = [
  {
    question: 'आज कितना पानी दूं?',
    answer: '20mm पानी दें, मिट्टी में नमी कम है',
    time: '5 मिनट पहले',
    type: 'irrigation'
  },
  {
    question: 'कीट नियंत्रण कब करें?',
    answer: 'अगले 2 दिन में नीम का तेल छिड़कें',
    time: '1 घंटा पहले',
    type: 'pest'
  },
  {
    question: 'फसल की स्थिति?',
    answer: 'गेहूं 85% स्वस्थ, मक्का को उर्वरक चाहिए',
    time: '3 घंटे पहले',
    type: 'health'
  }
];

export function AIAssistantSection() {
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const { t } = useLanguage();

  const quickActions = [
    { label: t('ai.askWeather'), icon: '🌤️', query: 'आज का मौसम कैसा है?' },
    { label: t('ai.checkCrop'), icon: '🌾', query: 'मेरी फसल कैसी है?' },
    { label: t('ai.waterAdvice'), icon: '💧', query: 'कितना पानी दूं?' },
    { label: t('ai.marketPrice'), icon: '💰', query: 'आज के बाजार भाव क्या हैं?' }
  ];

  const handleQuickAction = (query: string) => {
    setInput(query);
    setIsAsking(true);
    // Simulate processing
    setTimeout(() => {
      setIsAsking(false);
      setInput('');
    }, 2000);
  };

  const handleSend = () => {
    if (input.trim()) {
      setIsAsking(true);
      setTimeout(() => {
        setIsAsking(false);
        setInput('');
      }, 2000);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-gray-800">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold">{t('ai.title')}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-normal">{t('ai.subtitle')}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Ask Input */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl border border-green-200">
          <div className="flex gap-2 mb-3">
            <Input
              placeholder={t('ai.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border-green-200 focus:border-green-400 rounded-xl bg-white/80"
              disabled={isAsking}
            />
            <Button 
              size="sm" 
              onClick={handleSend}
              disabled={!input.trim() || isAsking}
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl px-4"
            >
              {isAsking ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-200 hover:bg-green-50 rounded-xl px-3"
            >
              <Mic className="w-4 h-4 text-green-600" />
            </Button>
          </div>

          {isAsking && (
            <div className="bg-white/80 p-3 rounded-xl border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-700">{t('ai.processing')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            {t('ai.quickActions')}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.query)}
                className="h-auto p-3 flex-col gap-2 bg-white/80 hover:bg-green-50 border-green-200 hover:border-green-300 rounded-xl transition-all duration-300"
                disabled={isAsking}
              >
                <div className="text-xl">{action.icon}</div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Conversations */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            {t('ai.recentChats')}
          </h4>
          <div className="space-y-2">
            {recentConversations.map((conv, index) => (
              <div key={index} className="bg-white/80 p-3 rounded-xl border border-gray-100 hover:border-green-200 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-medium text-gray-800">{conv.question}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      conv.type === 'irrigation' ? 'text-blue-700 border-blue-200' :
                      conv.type === 'pest' ? 'text-orange-700 border-orange-200' :
                      'text-green-700 border-green-200'
                    }`}
                  >
                    {conv.type === 'irrigation' ? '💧' : conv.type === 'pest' ? '🐛' : '🌾'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{conv.answer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{conv.time}</span>
                  <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 rounded-lg h-6 px-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span className="text-xs">{t('ai.askAgain')}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-purple-700">127</div>
              <div className="text-xs text-purple-600">{t('ai.totalQuestions')}</div>
            </div>
            <div>
              <div className="text-xl font-bold text-pink-700">98%</div>
              <div className="text-xs text-pink-600">{t('ai.accuracy')}</div>
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-700">2.3s</div>
              <div className="text-xs text-indigo-600">{t('ai.avgTime')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}