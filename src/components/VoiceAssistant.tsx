import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Mic, 
  MicOff, 
  Send, 
  MessageCircle,
  Volume2,
  VolumeX,
  HelpCircle,
  Cloud,
  Droplets,
  Leaf,
  Bug,
  TrendingUp,
  MapPin,
  Phone,
  Activity,
  BarChart3,
  UserCheck,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function VoiceAssistant() {
  const { t, currentLanguage } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [showExpertOption, setShowExpertOption] = useState(false);
  
  // Define complex/difficult questions that should trigger expert suggestion
  const complexTopics = [
    'disease', 'रोग', 'बीमारी', 'infection', 'संक्रमण',
    'soil problem', 'मिट्टी समस्या', 'soil analysis', 'मिट्टी जांच',
    'fertilizer problem', 'खाद समस्या', 'chemical', 'रसायन',
    'crop failure', 'फसल खराब', 'plant death', 'पौधे मर',
    'unusual symptom', 'अजीब लक्षण', 'strange', 'अजीब',
    'emergency', 'आपातकाल', 'urgent', 'जरूरी',
    'legal', 'कानूनी', 'insurance', 'बीमा',
    'government scheme detail', 'सरकारी योजना विस्तार'
  ];
  
  // Function to check if question is complex and needs expert help
  const isComplexQuestion = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    return complexTopics.some(topic => lowerQuestion.includes(topic.toLowerCase()));
  };
  
  // Initialize conversation with a safe default
  const getInitialMessage = () => {
    return currentLanguage === 'hi' 
      ? "नमस्कार! मैं आपका कृषि सहायक हूँ। अपनी फसल, मौसम, या खेती के काम के बारे में कुछ भी पूछें। आप बोल सकते हैं या टाइप कर सकते हैं।"
      : "Hello! I'm your farming assistant. Ask me anything about your crops, weather, or farming tasks. You can speak or type.";
  };
  
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'assistant', message: string, timestamp?: string}>>([
    {
      type: 'assistant',
      message: getInitialMessage(),
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Move quickActions to be computed during render to ensure currentLanguage is available
  const quickActions = useMemo(() => [
    { 
      id: 'weather', 
      icon: Cloud, 
      label: currentLanguage === 'hi' ? 'मौसम पूछें' : 'Ask Weather',
      color: 'bg-blue-500',
      question: currentLanguage === 'hi' ? 'आज का मौसम कैसा है?' : "What's today's weather?"
    },
    { 
      id: 'water', 
      icon: Droplets, 
      label: currentLanguage === 'hi' ? 'पानी सलाह' : 'Water Advice',
      color: 'bg-cyan-500',
      question: currentLanguage === 'hi' ? 'आज कितना पानी देना चाहिए?' : 'How much water should I give today?'
    },
    { 
      id: 'crop', 
      icon: Leaf, 
      label: currentLanguage === 'hi' ? 'फसल जांच' : 'Check Crop',
      color: 'bg-green-500',
      question: currentLanguage === 'hi' ? 'मेरी फसल कैसी है?' : 'How is my crop health?'
    },
    { 
      id: 'pest', 
      icon: Bug, 
      label: currentLanguage === 'hi' ? 'कीट चेतावनी' : 'Pest Alert',
      color: 'bg-red-500',
      question: currentLanguage === 'hi' ? 'कीटों से कैसे बचें?' : 'How to prevent pests?'
    },
    { 
      id: 'market', 
      icon: TrendingUp, 
      label: currentLanguage === 'hi' ? 'बाजार भाव' : 'Market Price',
      color: 'bg-orange-500',
      question: currentLanguage === 'hi' ? 'आज के बाजार भाव क्या हैं?' : "What are today's market prices?"
    },
    { 
      id: 'expert', 
      icon: Phone, 
      label: currentLanguage === 'hi' ? 'विशेषज्ञ संपर्क' : 'Expert Contact',
      color: 'bg-purple-500',
      question: currentLanguage === 'hi' ? 'विशेषज्ञ से कैसे संपर्क करें?' : 'How to contact an expert?'
    }
  ], [currentLanguage]);

  const sampleResponses = {
    weather: {
      hi: "आज का मौसम अच्छा है। तापमान 28°C है, धूप है। आज फसल की सिंचाई के लिए उपयुक्त समय है। कल हल्की बारिश हो सकती है।",
      en: "Today's weather is good. Temperature is 28°C, sunny. Perfect time for crop irrigation. Light rain expected tomorrow."
    },
    water: {
      hi: "मिट्टी की नमी के आधार पर, आज गेहूं के खेत में 25mm पानी दें। चावल के खेत में 15mm पानी चाहिए। मौसम सूखा है, इसलिए सिंचाई जरूरी है।",
      en: "Based on soil moisture, give 25mm water to wheat field today. Rice field needs 15mm water. Weather is dry, so irrigation is important."
    },
    crop: {
      hi: "आपकी गेहूं की फसल 85% स्वस्थ है - बहुत अच्छी! मक्के में 65% स्वास्थ्य है - कीटों की जांच करें। चावल को ध्यान की जरूरत है - 40% स्वास्थ्य है।",
      en: "Your wheat crop is 85% healthy - excellent! Corn shows 65% health - check for pests. Rice needs attention at 40% health - consider fertilization."
    },
    pest: {
      hi: "इस मौसम में तना छेदक कीट की संभावना है। नीम का तेल स्प्रे करें। सप्ताह में 2 बार छिड़काव करें। पीले स्टिकी ट्रैप भी लगाएं।",
      en: "Stem borer pests are likely this season. Apply neem oil spray. Spray twice a week. Also install yellow sticky traps."
    },
    market: {
      hi: "आज के मंडी भाव: गेहूं ₹2,450/क्विंटल (+₹50), चावल ₹3,200/क्विंटल (-₹30), मक्का ₹1,850/क्विंटल। पूना मंडी के भाव हैं।",
      en: "Today's mandi rates: Wheat ₹2,450/quintal (+₹50), Rice ₹3,200/quintal (-₹30), Corn ₹1,850/quintal. Pune mandi rates."
    },
    expert: {
      hi: "डॉ. राजेश शर्मा - पौधे रोग विशेषज्ञ: +91 98765 43210। कृषि विभाग हेल्पलाइन: 1551। निःशुल्क सलाह के लिए सुबह 10-शाम 5 बजे तक कॉल करें।",
      en: "Dr. Rajesh Sharma - Plant Disease Specialist: +91 98765 43210. Agriculture Dept Helpline: 1551. Call 10 AM-5 PM for free advice."
    },
    cantAnswer: {
      hi: "मुझे खुशी है कि आपने यह महत्वपूर्ण सवाल पूछा। यह एक जटिल विषय है जिसके लिए विशेषज्ञ की सलाह बेहतर होगी।",
      en: "I'm glad you asked this important question. This is a complex topic that would benefit from expert consultation."
    }
  };

  const handleSpeakText = (text: string) => {
    if (voiceOutputEnabled) {
      setIsSpeaking(true);
      // Text-to-speech functionality would be implemented here
      setTimeout(() => setIsSpeaking(false), 2000);
      console.log('Speaking:', text);
    }
  };

  const handleExpertCall = () => {
    // Connect to agriculture expert helpline
    window.open('tel:+911800123456');
  };

  const handleExpertChat = () => {
    // Connect to WhatsApp expert support
    window.open('https://wa.me/911800123456?text=Hello, I need expert agricultural advice. My AI assistant referred me for complex farming questions.');
  };

  const connectToExpert = () => {
    const langKey = (currentLanguage === 'hi' || !currentLanguage) ? 'hi' : 'en';
    const connectingMessage = currentLanguage === 'hi' 
      ? "आपको कृषि विशेषज्ञ से जोड़ रहे हैं। कृपया थोड़ा इंतज़ार करें..."
      : "Connecting you to an agriculture expert. Please wait...";
    
    setConversation(prev => [...prev, { 
      type: 'assistant', 
      message: connectingMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Show expert connection options after a brief delay
    setTimeout(() => {
      setShowExpertOption(true);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop voice recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        // Simulate voice input
        handleQuestionClick('आज का मौसम कैसा है?');
      }, 3000);
    }
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      const userMessage = textInput;
      setTextInput('');
      
      // Add user message
      setConversation(prev => [...prev, { 
        type: 'user', 
        message: userMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      // Simulate AI response
      setTimeout(() => {
        let aiResponse = (currentLanguage === 'hi' || !currentLanguage)
          ? "मैं आपकी कृषि समस्या को समझता हूँ। आपकी फसल और खेत के आधार पर सलाह दे सकता हूँ।"
          : "I understand your farming question. I can provide advice based on your crops and farm data.";
        
        // Check for specific responses
        const lowerInput = userMessage.toLowerCase();
        const langKey = (currentLanguage === 'hi' || !currentLanguage) ? 'hi' : 'en';
        let needsExpert = false;
        
        if (lowerInput.includes('weather') || lowerInput.includes('मौसम')) {
          aiResponse = sampleResponses.weather[langKey];
        } else if (lowerInput.includes('water') || lowerInput.includes('पानी')) {
          aiResponse = sampleResponses.water[langKey];
        } else if (lowerInput.includes('crop') || lowerInput.includes('फसल')) {
          aiResponse = sampleResponses.crop[langKey];
        } else if (lowerInput.includes('pest') || lowerInput.includes('कीट')) {
          aiResponse = sampleResponses.pest[langKey];
        } else if (lowerInput.includes('market') || lowerInput.includes('बाजार')) {
          aiResponse = sampleResponses.market[langKey];
        } else if (lowerInput.includes('expert') || lowerInput.includes('विशेषज्ञ')) {
          aiResponse = sampleResponses.expert[langKey];
        } else if (isComplexQuestion(userMessage)) {
          // For complex questions, suggest expert consultation
          aiResponse = sampleResponses.cantAnswer[langKey];
          needsExpert = true;
        }
        
        setConversation(prev => [...prev, { 
          type: 'assistant', 
          message: aiResponse,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        handleSpeakText(aiResponse);
        
        // If it's a complex question, show expert suggestion after AI response
        if (needsExpert) {
          setTimeout(() => {
            const expertSuggestion = currentLanguage === 'hi' 
              ? "क्या आप किसी कृषि विशेषज्ञ से बात करना चाहेंगे? वे आपकी इस समस्या का बेहतर समाधान दे सकते हैं।"
              : "Would you like to connect with an agriculture expert? They can provide better solutions for this issue.";
            
            setConversation(prev => [...prev, { 
              type: 'assistant', 
              message: expertSuggestion,
              timestamp: new Date().toLocaleTimeString()
            }]);
            
            setShowExpertOption(true);
            handleSpeakText(expertSuggestion);
          }, 2000);
        }
      }, 1500);
    }
  };

  const handleQuestionClick = (question: string) => {
    setConversation(prev => [...prev, { 
      type: 'user', 
      message: question,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    setTimeout(() => {
      let aiResponse = (currentLanguage === 'hi' || !currentLanguage)
        ? "यह एक बेहतरीन सवाल है! मैं आपको विशिष्ट सलाह देता हूँ।"
        : "That's a great question! Let me provide specific guidance.";
      
      // Get appropriate response
      const actionId = quickActions.find(action => action.question === question)?.id;
      const langKey = (currentLanguage === 'hi' || !currentLanguage) ? 'hi' : 'en';
      
      if (actionId && sampleResponses[actionId as keyof typeof sampleResponses]) {
        aiResponse = sampleResponses[actionId as keyof typeof sampleResponses][langKey];
      }
      
      setConversation(prev => [...prev, { 
        type: 'assistant', 
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      handleSpeakText(aiResponse);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI सहायक • Smart Assistant</h1>
                <p className="text-green-100 text-sm">
                  {isListening ? 'सुन रहा हूँ... • Listening...' : 'ऑनलाइन और तैयार • Online & Ready'}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-2xl"
            >
              {voiceOutputEnabled ? (
                <Volume2 className="w-6 h-6" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">127</div>
            <div className="text-xs text-gray-600">कुल सवाल • Questions</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">94%</div>
            <div className="text-xs text-gray-600">सटीकता • Accuracy</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">2.3s</div>
            <div className="text-xs text-gray-600">औसत समय • Avg Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-green-600" />
            त्वरित कार्य • Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  onClick={() => handleQuestionClick(action.question)}
                  className={`h-16 flex-col gap-2 ${action.color} hover:opacity-90 text-white rounded-2xl shadow-lg`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {action.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conversation */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            बातचीत • Conversation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                    : 'bg-gray-100 text-gray-800 border'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                  {msg.timestamp && (
                    <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </p>
                  )}
                  {msg.type === 'assistant' && (
                    <Button
                      onClick={() => handleSpeakText(msg.message)}
                      size="sm"
                      variant="ghost"
                      className={`mt-2 h-8 px-2 ${isSpeaking ? 'animate-pulse' : ''}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Connection Option */}
      {showExpertOption && (
        <Card className="bg-amber-50 border-amber-200 shadow-lg rounded-3xl">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                {t('ai.talkToExpert')}
              </h3>
              <p className="text-sm text-amber-700 mb-4">
                {currentLanguage === 'hi' 
                  ? "हमारे कृषि विशेषज्ञ आपकी मदद के लिए तैयार हैं"
                  : "Our agriculture experts are ready to help you"
                }
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">
                  {t('ai.expertAvailable')}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleExpertCall}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-2xl h-12"
              >
                <PhoneCall className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {t('ai.callExpert')}
                </span>
              </Button>
              
              <Button
                onClick={handleExpertChat}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-12"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {t('ai.chatExpert')}
                </span>
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <Button
                onClick={() => setShowExpertOption(false)}
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-700 text-xs"
              >
                {currentLanguage === 'hi' ? 'बाद में करूंगा' : 'Maybe later'}
              </Button>
            </div>
            
            <div className="mt-3 bg-amber-100 rounded-xl p-3">
              <p className="text-xs text-amber-800 text-center">
                📞 {currentLanguage === 'hi' 
                  ? "निःशुल्क सलाह • सुबह 6 बजे से रात 10 बजे तक उपलब्ध"
                  : "Free consultation • Available 6 AM to 10 PM"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Input Area */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
        <CardContent className="p-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Input
                placeholder={(currentLanguage === 'hi' || !currentLanguage) ? 'यहाँ अपना सवाल लिखें...' : 'Type your question here...'}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
                className="h-14 text-base rounded-2xl border-2 border-gray-200 focus:border-green-400"
              />
            </div>
            <Button
              onClick={handleSendText}
              disabled={!textInput.trim()}
              className="h-14 w-14 bg-green-500 hover:bg-green-600 rounded-2xl"
            >
              <Send className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleVoiceToggle}
              className={`w-20 h-20 rounded-full transition-all duration-300 shadow-xl ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-2">
              {isListening 
                ? ((currentLanguage === 'hi' || !currentLanguage) ? 'सुन रहा हूँ... अब बोलें' : 'Listening... Speak now')
                : ((currentLanguage === 'hi' || !currentLanguage) ? 'बोलने के लिए टैप करें या सवाल टाइप करें' : 'Tap to speak or type your question')
              }
            </p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                🎤 {(currentLanguage === 'hi' || !currentLanguage) ? 'हिंदी समर्थित' : 'Hindi Supported'}
              </Badge>
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                🌐 {(currentLanguage === 'hi' || !currentLanguage) ? '8 भाषाएं' : '8 Languages'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}