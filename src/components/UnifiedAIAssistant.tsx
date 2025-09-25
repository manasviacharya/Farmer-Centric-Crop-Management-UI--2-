import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Phone,
  Activity,
  BarChart3,
  UserCheck,
  PhoneCall,
  Camera, 
  Upload, 
  CheckCircle,
  RotateCcw,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function UnifiedAIAssistant() {
  const { currentLanguage } = useLanguage();
  
  // Ensure currentLanguage is always a string
  const lang = currentLanguage || 'hi';
  
  // Voice Assistant States
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [showExpertOption, setShowExpertOption] = useState(false);
  
  // Camera/Disease Detection States
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showTreatment, setShowTreatment] = useState(false);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('chat');
  
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
  
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'assistant', message: string, timestamp?: string}>>([
    {
      type: 'assistant',
      message: "नमस्कार! मैं आपका कृषि सहायक हूँ। अपनी फसल, मौसम, या खेती के काम के बारे में कुछ भी पूछें। आप बोल सकते हैं, टाइप कर सकते हैं, या फोटो ले सकते हैं।",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Mock analysis data for disease detection
  const mockAnalysis = {
    disease: 'पत्ती का धब्बा रोग',
    diseaseEn: 'Leaf Spot Disease',
    confidence: 89,
    severity: 'medium',
    affected: 'टमाटर • Tomato',
    symptoms: [
      'पत्तियों पर भूरे धब्बे • Brown spots on leaves',
      'पत्ती का पीला होना • Yellowing of leaves',
      'धब्बों का बढ़ना • Spreading of spots'
    ],
    treatment: [
      {
        type: 'chemical',
        name: 'कॉपर सल्फेट स्प्रे',
        nameEn: 'Copper Sulfate Spray',
        dosage: '2 ग्राम प्रति लीटर पानी',
        dosageEn: '2g per liter water',
        frequency: 'सप्ताह में 2 बार • Twice a week'
      },
      {
        type: 'organic',
        name: 'नीम का तेल',
        nameEn: 'Neem Oil',
        dosage: '5 मिली प्रति लीटर पानी',
        dosageEn: '5ml per liter water',
        frequency: 'सप्ताह में 3 बार • Thrice a week'
      }
    ],
    prevention: [
      'पौधों के बीच उचित दूरी रखें • Maintain proper plant spacing',
      'ओवर वॉटरिंग से बचें • Avoid overwatering',
      'नियमित छंटाई करें • Regular pruning'
    ],
    expertContact: {
      name: 'डॉ. राजेश शर्मा',
      nameEn: 'Dr. Rajesh Sharma',
      phone: '+91 98765 43210',
      specialization: 'पौधे रोग विशेषज्ञ • Plant Disease Specialist'
    }
  };

  // Move quickActions to be computed during render to ensure lang is available
  const quickActions = useMemo(() => [
    { 
      id: 'weather', 
      icon: Cloud, 
      label: lang === 'hi' ? 'मौसम पूछें' : 'Ask Weather',
      color: 'bg-blue-500',
      question: lang === 'hi' ? 'आज का मौसम कैसा है?' : "What's today's weather?"
    },
    { 
      id: 'water', 
      icon: Droplets, 
      label: lang === 'hi' ? 'पानी सलाह' : 'Water Advice',
      color: 'bg-cyan-500',
      question: lang === 'hi' ? 'आज कितना पानी देना चाहिए?' : 'How much water should I give today?'
    },
    { 
      id: 'crop', 
      icon: Leaf, 
      label: lang === 'hi' ? 'फसल जांच' : 'Check Crop',
      color: 'bg-green-500',
      question: lang === 'hi' ? 'मेरी फसल कैसी है?' : 'How is my crop health?'
    },
    { 
      id: 'pest', 
      icon: Bug, 
      label: lang === 'hi' ? 'कीट चेतावनी' : 'Pest Alert',
      color: 'bg-red-500',
      question: lang === 'hi' ? 'कीटों से कैसे बचें?' : 'How to prevent pests?'
    },
    { 
      id: 'market', 
      icon: TrendingUp, 
      label: lang === 'hi' ? 'बाजार भाव' : 'Market Price',
      color: 'bg-orange-500',
      question: lang === 'hi' ? 'आज के बाजार भाव क्या हैं?' : "What are today's market prices?"
    },
    { 
      id: 'camera', 
      icon: Camera, 
      label: lang === 'hi' ? 'फोटो जांच' : 'Photo Check',
      color: 'bg-purple-500',
      question: lang === 'hi' ? 'फसल की फोटो लेकर बीमारी की जांच करें' : 'Take crop photo for disease detection'
    }
  ], [lang]);

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
    camera: {
      hi: "फोटो लेने के लिए कैमरा टैब पर जाएं। साफ और करीब से फोटो लें। मैं AI से आपकी फसल की बीमारी का पता लगाऊंगा।",
      en: "Go to the Camera tab to take photos. Take clear and close photos. I'll use AI to detect diseases in your crop."
    },
    cantAnswer: {
      hi: "मुझे खुशी है कि आपने यह महत्वपूर्ण सवाल पूछा। यह एक जटिल विषय है जिसके लिए विशेषज्ञ की सलाह बेहतर होगी।",
      en: "I'm glad you asked this important question. This is a complex topic that would benefit from expert consultation."
    }
  };

  const handleSpeakText = (text: string) => {
    if (voiceOutputEnabled) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
      console.log('Speaking:', text);
    }
  };

  const handleExpertCall = () => {
    window.open('tel:+911800123456');
  };

  const handleExpertChat = () => {
    window.open('https://wa.me/911800123456?text=Hello, I need expert agricultural advice. My AI assistant referred me for complex farming questions.');
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleQuestionClick('आज का मौसम कैसा है?');
      }, 3000);
    }
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      const userMessage = textInput;
      setTextInput('');
      
      setConversation(prev => [...prev, { 
        type: 'user', 
        message: userMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      setTimeout(() => {
        let aiResponse = lang === 'hi'
          ? "मैं आपकी कृषि समस्या को समझता हूँ। आपकी फसल और खेत के आधार पर सलाह दे सकता हूँ।"
          : "I understand your farming question. I can provide advice based on your crops and farm data.";
        
        const lowerInput = userMessage.toLowerCase();
        const langKey = lang === 'hi' ? 'hi' : 'en';
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
        } else if (lowerInput.includes('camera') || lowerInput.includes('photo') || lowerInput.includes('फोटो')) {
          aiResponse = sampleResponses.camera[langKey];
          setTimeout(() => setActiveTab('camera'), 2000);
        } else if (isComplexQuestion(userMessage)) {
          aiResponse = sampleResponses.cantAnswer[langKey];
          needsExpert = true;
        }
        
        setConversation(prev => [...prev, { 
          type: 'assistant', 
          message: aiResponse,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        handleSpeakText(aiResponse);
        
        if (needsExpert) {
          setTimeout(() => {
            const expertSuggestion = lang === 'hi' 
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
    if (question.includes('फोटो') || question.includes('photo')) {
      setActiveTab('camera');
      return;
    }
    
    setConversation(prev => [...prev, { 
      type: 'user', 
      message: question,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    setTimeout(() => {
      let aiResponse = lang === 'hi'
        ? "यह एक बेहतरीन सवाल है! मैं आपको विशिष्ट सलाह देता हूँ।"
        : "That's a great question! Let me provide specific guidance.";
      
      const actionId = quickActions.find(action => action.question === question)?.id;
      const langKey = lang === 'hi' ? 'hi' : 'en';
      
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

  // Camera/Disease Detection Functions
  const handleCameraCapture = () => {
    const mockImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVmOWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2YjdjNmIiPkNhcHR1cmVkIENyb3AgSW1hZ2U8L3RleHQ+PC9zdmc+';
    setCapturedImage(mockImageUrl);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(mockAnalysis);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowTreatment(false);
    setIsAnalyzing(false);
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

      {/* Tabs for different modes */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-1">
          <TabsTrigger value="chat" className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            चैट • Chat
          </TabsTrigger>
          <TabsTrigger value="camera" className="rounded-xl data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Camera className="w-4 h-4 mr-2" />
            रोग जांच • Disease Check
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6 mt-6">
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

          {/* Input Area */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex gap-3 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder={lang === 'hi' ? 'यहाँ अपना सवाल लिखें...' : 'Type your question here...'}
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
                    ? (lang === 'hi' ? 'सुन रहा हूँ... अब बोलें' : 'Listening... Speak now')
                    : (lang === 'hi' ? 'बोलने के लिए टैप करें या सवाल टाइप करें' : 'Tap to speak or type your question')
                  }
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                    🎤 {lang === 'hi' ? 'हिंदी समर्थित' : 'Hindi Supported'}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                    🌐 {lang === 'hi' ? '8 भाषाएं' : '8 Languages'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera" className="space-y-6 mt-6">
          {/* Camera Instructions */}
          {!capturedImage && !analysisResult && (
            <>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">पौधे की फोटो लें</h3>
                    <p className="text-gray-600 mb-4">Take a photo of your plant</p>
                    <div className="text-left bg-green-50 rounded-2xl p-4 space-y-2">
                      <h4 className="font-semibold text-green-800 mb-2">बेहतर परिणाम के लिए • For better results:</h4>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• साफ और करीब से फोटो लें • Take clear and close photos</li>
                        <li>• प्रभावित पत्ती या हिस्से को दिखाएं • Show affected leaf or part</li>
                        <li>• अच्छी रोशनी में फोटो लें • Take photo in good lighting</li>
                        <li>• एक बार में एक पौधा • One plant at a time</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Camera Actions */}
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={handleCameraCapture}
                  className="h-20 flex-col gap-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-3xl shadow-xl"
                >
                  <Camera className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-bold text-lg">कैमरा खोलें</div>
                    <div className="text-sm opacity-90">Open Camera</div>
                  </div>
                </Button>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="file-upload"
                  />
                  <Button 
                    asChild
                    className="w-full h-20 flex-col gap-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl shadow-xl"
                  >
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8" />
                      <div className="text-center">
                        <div className="font-bold text-lg">गैलरी से चुनें</div>
                        <div className="text-sm opacity-90">Choose from Gallery</div>
                      </div>
                    </label>
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Image Preview */}
          {capturedImage && !analysisResult && !isAnalyzing && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">पूर्वावलोकन • Preview</h3>
                    <Button 
                      onClick={resetCamera}
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      नया • New
                    </Button>
                  </div>
                  <img 
                    src={capturedImage} 
                    alt="Captured crop" 
                    className="w-full h-64 object-cover rounded-2xl mb-4"
                  />
                  <Button 
                    onClick={analyzeImage}
                    className="w-full h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg text-lg font-bold"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    विश्लेषण करें • Analyze Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Loading */}
          {isAnalyzing && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">विश्लेषण हो रहा है...</h3>
                  <p className="text-gray-600">Analyzing your crop image...</p>
                  <div className="mt-4 bg-blue-50 rounded-2xl p-4">
                    <p className="text-sm text-blue-700">AI से पौधे की बीमारी का पता लगाया जा रहा है</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Bug className="w-8 h-8 text-red-500" />
                      <div>
                        <div className="text-xl font-bold">पहचान पूर्ण • Detection Complete</div>
                      </div>
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSpeakText(analysisResult.disease)}
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={resetCamera}
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 hover:bg-gray-100 rounded-xl"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className={`p-4 rounded-2xl border-2 ${getSeverityColor(analysisResult.severity).bg} ${getSeverityColor(analysisResult.severity).border}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{analysisResult.disease}</h3>
                          <p className="text-gray-600">{analysisResult.diseaseEn}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{analysisResult.confidence}%</div>
                          <div className="text-sm text-gray-600">विश्वास • Confidence</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-blue-500 text-white">
                          {analysisResult.affected}
                        </Badge>
                        <Badge variant="outline" className={`${getSeverityColor(analysisResult.severity).text} border-current`}>
                          {analysisResult.severity === 'medium' ? 'मध्यम • Medium' : 
                           analysisResult.severity === 'high' ? 'गंभीर • High' : 'कम • Low'}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-gray-800">लक्षण • Symptoms:</h4>
                        <ul className="space-y-1">
                          {analysisResult.symptoms.map((symptom: string, index: number) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button 
                      onClick={() => setShowTreatment(!showTreatment)}
                      className="h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl font-bold text-lg"
                    >
                      <Leaf className="w-6 h-6 mr-3" />
                      उपचार देखें • View Treatment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showTreatment && (
                <>
                  {/* Treatment Options */}
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Leaf className="w-6 h-6 text-green-500" />
                        उपचार के विकल्प • Treatment Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisResult.treatment.map((treatment: any, index: number) => (
                        <div key={index} className="p-4 bg-green-50 rounded-2xl border border-green-200">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-green-800">{treatment.name}</h4>
                              <p className="text-sm text-green-600">{treatment.nameEn}</p>
                              <Badge variant="outline" className="mt-2 text-green-700 border-green-300">
                                {treatment.type === 'chemical' ? 'रासायनिक • Chemical' : 'जैविक • Organic'}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => handleSpeakText(treatment.name)}
                              size="sm"
                              variant="outline"
                              className="rounded-xl"
                            >
                              <Volume2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>मात्रा • Dosage:</strong> {treatment.dosage}
                            </div>
                            <div className="text-gray-600">{treatment.dosageEn}</div>
                            <div>
                              <strong>आवृत्ति • Frequency:</strong> {treatment.frequency}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Prevention */}
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                        बचाव • Prevention
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-50 rounded-2xl p-4">
                        <ul className="space-y-2">
                          {analysisResult.prevention.map((tip: string, index: number) => (
                            <li key={index} className="text-sm text-blue-700 flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expert Contact */}
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Phone className="w-6 h-6 text-orange-500" />
                        विशेषज्ञ से संपर्क • Expert Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-orange-800">{analysisResult.expertContact.name}</h4>
                            <p className="text-sm text-orange-600 mb-1">{analysisResult.expertContact.nameEn}</p>
                            <p className="text-sm text-orange-700">{analysisResult.expertContact.specialization}</p>
                          </div>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                            <Phone className="w-4 h-4 mr-2" />
                            कॉल करें
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Expert Connection Option */}
      {showExpertOption && (
        <Card className="bg-amber-50 border-amber-200 shadow-lg rounded-3xl">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                {lang === 'hi' ? 'विशेषज्ञ से बात करें' : 'Talk to Expert'}
              </h3>
              <p className="text-sm text-amber-700 mb-4">
                {lang === 'hi' 
                  ? "हमारे कृषि विशेषज्ञ आपकी मदद के लिए तैयार हैं"
                  : "Our agriculture experts are ready to help you"
                }
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">
                  {lang === 'hi' ? 'विशेषज्ञ उपलब्ध' : 'Expert Available'}
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
                  {lang === 'hi' ? 'कॉल करें' : 'Call Expert'}
                </span>
              </Button>
              
              <Button
                onClick={handleExpertChat}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl h-12"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {lang === 'hi' ? 'चैट करें' : 'Chat Expert'}
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
                {lang === 'hi' ? 'बाद में करूंगा' : 'Maybe later'}
              </Button>
            </div>
            
            <div className="mt-3 bg-amber-100 rounded-xl p-3">
              <p className="text-xs text-amber-800 text-center">
                📞 {lang === 'hi' 
                  ? "निःशुल्क सलाह • सुबह 6 बजे से रात 10 बजे तक उपलब्ध"
                  : "Free consultation • Available 6 AM to 10 PM"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}