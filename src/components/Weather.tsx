import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  MapPin,
  Volume2,
  AlertTriangle,
  CheckCircle,
  Leaf,
  Sprout,
  Target,
  Clock,
  Navigation,
  Umbrella
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Weather() {
  const { t, currentLanguage } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const weatherData = useMemo(() => [
    { 
      day: (currentLanguage === 'hi' || !currentLanguage) ? 'आज' : 'Today', 
      temp: '28°C', 
      humidity: '65%', 
      rain: '0mm', 
      icon: Sun, 
      condition: (currentLanguage === 'hi' || !currentLanguage) ? 'धूप' : 'Sunny',
      advice: (currentLanguage === 'hi' || !currentLanguage) ? 'सिंचाई के लिए अच्छा दिन' : 'Good day for irrigation'
    },
    { 
      day: (currentLanguage === 'hi' || !currentLanguage) ? 'कल' : 'Tomorrow', 
      temp: '26°C', 
      humidity: '70%', 
      rain: '2mm', 
      icon: CloudRain, 
      condition: (currentLanguage === 'hi' || !currentLanguage) ? 'हल्की बारिश' : 'Light Rain',
      advice: (currentLanguage === 'hi' || !currentLanguage) ? 'बीज अंकुरण के लिए बेहतरीन' : 'Perfect for seed germination'
    },
    { 
      day: (currentLanguage === 'hi' || !currentLanguage) ? 'शुक्रवार' : 'Friday', 
      temp: '29°C', 
      humidity: '60%', 
      rain: '0mm', 
      icon: Sun, 
      condition: (currentLanguage === 'hi' || !currentLanguage) ? 'धूप' : 'Sunny',
      advice: (currentLanguage === 'hi' || !currentLanguage) ? 'खेत के काम के लिए उत्तम' : 'Excellent for field work'
    },
    { 
      day: (currentLanguage === 'hi' || !currentLanguage) ? 'शनिवार' : 'Saturday', 
      temp: '25°C', 
      humidity: '75%', 
      rain: '5mm', 
      icon: Cloud, 
      condition: (currentLanguage === 'hi' || !currentLanguage) ? 'बादल' : 'Cloudy',
      advice: (currentLanguage === 'hi' || !currentLanguage) ? 'पत्ती रोग की सावधानी' : 'Watch for leaf diseases'
    }
  ], [currentLanguage]);

  const currentWeather = useMemo(() => ({
    temperature: '28°C',
    humidity: '65%',
    rainfall: '0mm',
    windSpeed: '12 km/h',
    condition: (currentLanguage === 'hi' || !currentLanguage) ? 'धूप' : 'Sunny',
    location: (currentLanguage === 'hi' || !currentLanguage) ? 'पूना, महाराष्ट्र' : 'Pune, Maharashtra',
    uvIndex: '6 (मध्यम • Moderate)',
    soilTemp: '24°C'
  }), [currentLanguage]);

  const farmingAdvice = useMemo(() => [
    {
      icon: Droplets,
      title: (currentLanguage === 'hi' || !currentLanguage) ? 'सिंचाई सलाह' : 'Irrigation Advice',
      message: (currentLanguage === 'hi' || !currentLanguage)
        ? 'आज शाम 4-6 बजे के बीच सिंचाई करें। मिट्टी में पर्याप्त नमी है।' 
        : 'Irrigate between 4-6 PM today. Soil has adequate moisture.',
      priority: 'medium',
      color: 'bg-blue-500'
    },
    {
      icon: Sprout,
      title: (currentLanguage === 'hi' || !currentLanguage) ? 'बुआई समय' : 'Sowing Time',
      message: (currentLanguage === 'hi' || !currentLanguage)
        ? 'कल की हल्की बारिश के बाद मक्के की बुआई के लिए उत्तम समय होगा।' 
        : "Tomorrow's light rain will create perfect conditions for corn sowing.",
      priority: 'high',
      color: 'bg-green-500'
    },
    {
      icon: AlertTriangle,
      title: (currentLanguage === 'hi' || !currentLanguage) ? 'रोग चेतावनी' : 'Disease Alert',
      message: (currentLanguage === 'hi' || !currentLanguage)
        ? 'बढ़ती नमी के कारण पत्ती के रोग हो सकते हैं। फंगीसाइड स्प्रे तैयार रखें।' 
        : 'High humidity may cause leaf diseases. Keep fungicide spray ready.',
      priority: 'medium',
      color: 'bg-orange-500'
    }
  ], [currentLanguage]);

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    // Text-to-speech functionality would be implemented here
    setTimeout(() => setIsSpeaking(false), 2000);
    console.log('Speaking:', text);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-green-200 bg-green-50';
    }
  };
  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">मौसम • Weather</h1>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{currentWeather.location}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleSpeak(currentWeather.condition)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-2xl"
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Weather */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Sun className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {currentWeather.temperature}
            </div>
            <p className="text-xl text-gray-600 mb-2">{currentWeather.condition}</p>
            <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1">
              {currentLanguage === 'hi' ? 'खेती के लिए अच्छा' : 'Good for Farming'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    {(currentLanguage === 'hi' || !currentLanguage) ? 'नमी' : 'Humidity'}
                  </p>
                  <p className="text-lg font-bold text-blue-800">{currentWeather.humidity}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-2xl border border-cyan-200">
              <div className="flex items-center gap-3 mb-2">
                <CloudRain className="w-6 h-6 text-cyan-600" />
                <div>
                  <p className="text-sm text-cyan-700 font-medium">
                    {(currentLanguage === 'hi' || !currentLanguage) ? 'बारिश' : 'Rainfall'}
                  </p>
                  <p className="text-lg font-bold text-cyan-800">{currentWeather.rainfall}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <Wind className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-green-700 font-medium">
                    {(currentLanguage === 'hi' || !currentLanguage) ? 'हवा' : 'Wind'}
                  </p>
                  <p className="text-lg font-bold text-green-800">{currentWeather.windSpeed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <Thermometer className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-700 font-medium">
                    {(currentLanguage === 'hi' || !currentLanguage) ? 'मिट्टी का तापमान' : 'Soil Temp'}
                  </p>
                  <p className="text-lg font-bold text-orange-800">{currentWeather.soilTemp}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Farming Advice Based on Weather */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Target className="w-6 h-6 text-green-600" />
            {(currentLanguage === 'hi' || !currentLanguage) ? 'मौसम आधारित सलाह' : 'Weather-Based Advice'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {farmingAdvice.map((advice, index) => {
            const Icon = advice.icon;
            return (
              <div key={index} className={`p-4 rounded-2xl border-2 ${getPriorityColor(advice.priority)}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${advice.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{advice.title}</h4>
                      <Button
                        onClick={() => handleSpeak(advice.message)}
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{advice.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 4-Day Forecast */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            {(currentLanguage === 'hi' || !currentLanguage) ? '4 दिन का पूर्वानुमान' : '4-Day Forecast'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weatherData.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{day.day}</p>
                        <p className="text-sm text-gray-600">{day.condition}</p>
                        <p className="text-xs text-blue-600 mt-1">{day.advice}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">{day.temp}</p>
                      <div className="flex gap-3 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          {day.humidity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Umbrella className="w-3 h-3" />
                          {day.rain}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}