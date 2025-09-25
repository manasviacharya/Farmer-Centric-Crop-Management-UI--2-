import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, Mic, X, Sparkles } from 'lucide-react';

const quickQuestions = [
  "आज कितना पानी दूं?", // How much water today?
  "मौसम कैसा रहेगा?", // How will the weather be?
  "फसल कैसी है?", // How are the crops?
  "कीटनाशक कब डालूं?", // When to apply pesticide?
];

export function QuickChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'नमस्ते! मैं आपका खेती सहायक हूं। कोई भी सवाल पूछें। 🌾' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { type: 'user', text: input }]);
      setIsTyping(true);
      
      // Simulate bot response
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: 'आपके खेत के लिए सुझाव: आज 20mm पानी दें। मिट्टी में नमी कम है। 💧' 
        }]);
      }, 1500);
      setInput('');
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'आपके सवाल का जवाब तैयार कर रहा हूं... कृपया थोड़ा इंतजार करें। 🤖' 
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 rounded-full w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 animate-pulse"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-white" />
          </div>
        </div>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] z-50">
      <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">खेती गुरु चैट</CardTitle>
                <p className="text-green-100 text-xs">AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Messages */}
          <div className="max-h-64 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-green-50/30 to-white">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' 
                    : 'bg-white text-gray-800 border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-100 p-3 rounded-2xl text-sm shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-4 pb-4 bg-gray-50/50">
            <p className="text-xs text-gray-600 mb-3 font-medium">त्वरित सवाल | Quick Questions:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left justify-start h-auto p-3 text-xs bg-white hover:bg-green-50 border-green-200 hover:border-green-300 rounded-xl transition-all duration-300"
                >
                  <MessageCircle className="w-3 h-3 mr-2 text-green-600" />
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t bg-white p-4">
            <div className="flex gap-2">
              <Input
                placeholder="अपना सवाल लिखें..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 text-sm border-green-200 focus:border-green-400 rounded-xl"
              />
              <Button 
                size="sm" 
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-green-200 hover:bg-green-50 rounded-xl px-3"
              >
                <Mic className="w-4 h-4 text-green-600" />
              </Button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              🎤 बोलें या टाइप करें
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}