import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  FileText, 
  Search, 
  Volume2, 
  Mic, 
  Banknote, 
  Droplets, 
  Leaf, 
  Truck, 
  Home, 
  Shield,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle,
  Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function GovernmentSchemes() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी • All', icon: FileText, color: 'bg-gray-500' },
    { id: 'subsidy', name: 'सब्सिडी • Subsidy', icon: Banknote, color: 'bg-green-500' },
    { id: 'water', name: 'पानी • Water', icon: Droplets, color: 'bg-blue-500' },
    { id: 'fertilizer', name: 'खाद • Fertilizer', icon: Leaf, color: 'bg-emerald-500' },
    { id: 'transport', name: 'परिवहन • Transport', icon: Truck, color: 'bg-orange-500' },
    { id: 'housing', name: 'आवास • Housing', icon: Home, color: 'bg-purple-500' },
    { id: 'insurance', name: 'बीमा • Insurance', icon: Shield, color: 'bg-red-500' }
  ];

  const schemes = [
    {
      id: 1,
      name: 'प्रधानमंत्री किसान सम्मान निधि',
      nameEn: 'PM Kisan Samman Nidhi',
      amount: '₹6,000/वर्ष',
      description: 'सभी किसानों को वित्तीय सहायता',
      descriptionEn: 'Financial aid to all farmers',
      category: 'subsidy',
      eligibility: 'सभी किसान • All farmers',
      status: 'active',
      location: 'पूरे भारत में • Pan India',
      deadline: '31 मार्च 2025',
      icon: Banknote,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 2,
      name: 'प्रधानमंत्री फसल बीमा योजना',
      nameEn: 'PM Fasal Bima Yojana',
      amount: 'नुकसान कवर • Loss Cover',
      description: 'फसल के नुकसान की भरपाई',
      descriptionEn: 'Crop loss compensation',
      category: 'insurance',
      eligibility: 'सभी किसान • All farmers',
      status: 'active',
      location: 'पूरे भारत में • Pan India',
      deadline: '30 अप्रैल 2025',
      icon: Shield,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 3,
      name: 'ड्रिप सिंचाई सब्सिडी',
      nameEn: 'Drip Irrigation Subsidy',
      amount: '50% सब्सिडी • 50% Subsidy',
      description: 'पानी की बचत के लिए ड्रिप सिस्टम',
      descriptionEn: 'Drip system for water conservation',
      category: 'water',
      eligibility: 'छोटे किसान • Small farmers',
      status: 'active',
      location: 'महाराष्ट्र • Maharashtra',
      deadline: '15 जून 2025',
      icon: Droplets,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 4,
      name: 'ऑर्गैनिक खेती प्रोत्साहन',
      nameEn: 'Organic Farming Incentive',
      amount: '₹10,000/हेक्टेयर',
      description: 'जैविक खेती को बढ़ावा',
      descriptionEn: 'Promoting organic farming',
      category: 'fertilizer',
      eligibility: 'प्रमाणित किसान • Certified farmers',
      status: 'new',
      location: 'पूरे भारत में • Pan India',
      deadline: '31 जुलाई 2025',
      icon: Leaf,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search functionality would be implemented here
    setTimeout(() => setIsListening(false), 3000);
  };

  const handleSpeak = (text: string) => {
    // Text-to-speech functionality would be implemented here
    console.log('Speaking:', text);
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">सरकारी योजनाएं</h1>
              <p className="text-orange-100 text-sm">Government Schemes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="योजना खोजें... • Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-2xl border-2 border-gray-200 focus:border-orange-400"
              />
            </div>
            <Button
              onClick={handleVoiceSearch}
              className={`h-14 w-14 rounded-2xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              <Mic className="w-6 h-6" />
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`flex-shrink-0 h-12 px-4 rounded-2xl transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg`
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-2'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const Icon = scheme.icon;
          return (
            <Card key={scheme.id} className={`bg-white/90 backdrop-blur-sm border-2 ${scheme.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${scheme.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{scheme.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{scheme.nameEn}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${scheme.color} text-white font-semibold px-3 py-1`}>
                            {scheme.amount}
                          </Badge>
                          {scheme.status === 'new' && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                              नई • New
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleSpeak(scheme.description)}
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-800 leading-relaxed">{scheme.description}</p>
                      <p className="text-sm text-gray-600">{scheme.descriptionEn}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">
                          <strong>पात्रता • Eligibility:</strong> {scheme.eligibility}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">
                          <strong>क्षेत्र • Area:</strong> {scheme.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700">
                          <strong>अंतिम तारीख • Deadline:</strong> {scheme.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl h-12">
                        <span className="mr-2">आवेदन करें • Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="rounded-2xl h-12 px-4 border-2">
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <CardContent className="p-8 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">कोई योजना नहीं मिली</h3>
            <p className="text-gray-600">No schemes found for your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}