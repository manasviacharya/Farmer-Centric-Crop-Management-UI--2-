import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Eye, 
  EyeOff, 
  Smartphone,
  Mail,
  User,
  MapPin,
  Wheat,
  Shield,
  ArrowRight,
  CheckCircle,
  Phone,
  Plus,
  X
} from 'lucide-react';

interface SignInProps {
  onSignIn: (userData: any) => void;
}

// Indian states and major cities for farm location dropdown
const INDIAN_LOCATIONS = [
  { state: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati'] },
  { state: 'Assam', cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Bongaigaon'] },
  { state: 'Bihar', cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif'] },
  { state: 'Chhattisgarh', cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur'] },
  { state: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh'] },
  { state: 'Haryana', cities: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar'] },
  { state: 'Himachal Pradesh', cities: ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Una', 'Bilaspur', 'Chamba'] },
  { state: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh'] },
  { state: 'Karnataka', cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere'] },
  { state: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha'] },
  { state: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas'] },
  { state: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati'] },
  { state: 'Odisha', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore'] },
  { state: 'Punjab', cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur'] },
  { state: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Bhilwara'] },
  { state: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode'] },
  { state: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar'] },
  { state: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'] },
  { state: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Bardhaman'] }
];

export function SignIn({ onSignIn }: SignInProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cropInputs, setCropInputs] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    farmLocation: '',
    farmSize: '',
    cropTypes: '',
    experience: '',
    agreeTerms: false,
    rememberMe: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'फोन नंबर आवश्यक है';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'वैध भारतीय फोन नंबर दर्ज करें';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'पासवर्ड आवश्यक है';
    } else if (formData.password.length < 6) {
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
    }

    if (isSignUp) {
      // Name validation for signup
      if (!formData.name.trim()) {
        newErrors.name = 'नाम आवश्यक है';
      }

      // Email validation for signup
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'वैध ईमेल पता दर्ज करें';
      }

      // Confirm password
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'पासवर्ड मेल नहीं खाते';
      }

      // Farm details
      if (!formData.farmLocation.trim()) {
        newErrors.farmLocation = 'खेत का स्थान आवश्यक है';
      }

      if (!formData.farmSize.trim()) {
        newErrors.farmSize = 'खेत का आकार आवश्यक है';
      }

      // Terms agreement
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'नियम और शर्तों से सहमति आवश्यक है';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const userData = {
        name: formData.name || 'किसान भाई',
        phone: formData.phone,
        email: formData.email,
        farmLocation: formData.farmLocation || 'भारत',
        farmSize: formData.farmSize || '2 हेक्टेयर',
        cropTypes: formData.cropTypes || 'गेहूं, चावल',
        experience: formData.experience || '5 साल',
        isNewUser: isSignUp
      };
      
      onSignIn(userData);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addCropInput = () => {
    setCropInputs(prev => [...prev, '']);
  };

  const removeCropInput = (index: number) => {
    if (cropInputs.length > 1) {
      setCropInputs(prev => prev.filter((_, i) => i !== index));
      updateCropTypes(cropInputs.filter((_, i) => i !== index));
    }
  };

  const updateCropInput = (index: number, value: string) => {
    const newCropInputs = [...cropInputs];
    newCropInputs[index] = value;
    setCropInputs(newCropInputs);
    updateCropTypes(newCropInputs);
  };

  const updateCropTypes = (crops: string[]) => {
    const validCrops = crops.filter(crop => crop.trim() !== '');
    setFormData(prev => ({ ...prev, cropTypes: validCrops.join(', ') }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#3e9c3b] to-[#78d175] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('app.title')}</h1>
          <p className="text-gray-600">{t('app.subtitle') || 'आपका स्मार्ट कृषि सहायक'}</p>
          <p className="text-sm text-gray-500">Your Smart Farming Assistant</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#3e9c3b] to-[#78d175] text-white p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-center flex-1">
                <div className="text-xl font-bold mb-1">
                  {isSignUp ? (t('auth.createAccount') || 'नया खाता बनाएं') : (t('auth.signIn') || 'साइन इन करें')}
                </div>
                <div className="text-green-100 text-sm">
                  {isSignUp ? 'Create New Account' : 'Sign In to Continue'}
                </div>
              </CardTitle>
              
              {/* Language Toggle - Integrated into header */}
              <div className="ml-4">
                <LanguageToggle compact />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      पूरा नाम | Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="अपना पूरा नाम दर्ज करें"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`rounded-xl ${errors.name ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      ईमेल | Email (वैकल्पिक)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`rounded-xl ${errors.email ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              )}

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  मोबाइल नंबर | Mobile Number *
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-500">
                    <span className="text-sm">🇮🇳 +91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`pl-20 rounded-xl ${errors.phone ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}
                    maxLength={10}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 mb-2">
                  <Shield className="w-4 h-4" />
                  पासवर्ड | Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="अपना पासवर्ड दर्ज करें"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pr-12 rounded-xl ${errors.password ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {isSignUp && (
                <div className="space-y-4">
                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700 mb-2">
                      <Shield className="w-4 h-4" />
                      पासवर्ड पुष्टि | Confirm Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="पासवर्ड दोबारा दर्ज करें"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`rounded-xl ${errors.confirmPassword ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <Separator className="my-4" />

                  {/* Farm Details Header */}
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 flex items-center justify-center gap-2">
                      <Wheat className="w-5 h-5 text-[#3e9c3b]" />
                      खेती की जानकारी | Farm Details
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">आपके खेत के बारे में बताएं</p>
                  </div>

                  {/* Farm Location */}
                  <div>
                    <Label htmlFor="farmLocation" className="flex items-center gap-2 text-gray-700 mb-2">
                      <MapPin className="w-4 h-4" />
                      खेत का स्थान | Farm Location *
                    </Label>
                    <Select value={formData.farmLocation} onValueChange={(value) => handleInputChange('farmLocation', value)}>
                      <SelectTrigger className={`rounded-xl ${errors.farmLocation ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}>
                        <SelectValue placeholder="राज्य और शहर चुनें | Select State & City" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {INDIAN_LOCATIONS.map((location) => (
                          <div key={location.state}>
                            <div className="font-semibold text-gray-900 px-2 py-1 bg-gray-50 text-sm">
                              {location.state}
                            </div>
                            {location.cities.map((city) => (
                              <SelectItem 
                                key={`${location.state}-${city}`} 
                                value={`${city}, ${location.state}`}
                                className="pl-6"
                              >
                                {city}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.farmLocation && <p className="text-red-500 text-sm mt-1">{errors.farmLocation}</p>}
                  </div>

                  {/* Farm Size and Experience */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="farmSize" className="text-gray-700 mb-2 block text-sm">
                        खेत का आकार *
                      </Label>
                      <Input
                        id="farmSize"
                        type="text"
                        placeholder="5 हेक्टेयर"
                        value={formData.farmSize}
                        onChange={(e) => handleInputChange('farmSize', e.target.value)}
                        className={`rounded-xl ${errors.farmSize ? 'border-red-300' : 'border-[#78d175]'} focus:border-[#3e9c3b]`}
                      />
                      {errors.farmSize && <p className="text-red-500 text-xs mt-1">{errors.farmSize}</p>}
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-gray-700 mb-2 block text-sm">
                        अनुभव (वैकल्पिक)
                      </Label>
                      <Input
                        id="experience"
                        type="text"
                        placeholder="10 साल"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="rounded-xl border-[#78d175] focus:border-[#3e9c3b]"
                      />
                    </div>
                  </div>

                  {/* Crop Types with Dynamic Inputs */}
                  <div>
                    <Label className="flex items-center justify-between gap-2 text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Wheat className="w-4 h-4" />
                        मुख्य फसलें | Main Crops (वैकल्पिक)
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCropInput}
                        className="h-8 w-8 p-0 border-[#78d175] text-[#3e9c3b] hover:bg-[#78d175]/10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </Label>
                    <div className="space-y-2">
                      {cropInputs.map((crop, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            type="text"
                            placeholder={index === 0 ? "गेहूं" : `फसल ${index + 1}`}
                            value={crop}
                            onChange={(e) => updateCropInput(index, e.target.value)}
                            className="rounded-xl border-[#78d175] focus:border-[#3e9c3b] flex-1"
                          />
                          {cropInputs.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeCropInput(index)}
                              className="h-10 w-10 p-0 border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms Agreement - Fixed */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', !!checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        मैं <span className="text-[#3e9c3b] underline">नियम और शर्तों</span> से सहमत हूं और <span className="text-[#3e9c3b] underline">गोपनीयता नीति</span> को स्वीकार करता हूं।
                      </Label>
                      {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
                    </div>
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', !!checked)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                      मुझे याद रखें
                    </Label>
                  </div>
                  <Button variant="link" className="text-[#3e9c3b] text-sm p-0 h-auto">
                    पासवर्ड भूल गए?
                  </Button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#3e9c3b] to-[#78d175] hover:from-[#3e9c3b] hover:to-[#3e9c3b] text-white rounded-xl h-12 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isSignUp ? 'खाता बनाया जा रहा है...' : 'साइन इन हो रहे हैं...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isSignUp ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>खाता बनाएं | Create Account</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" />
                        <span>साइन इन करें | Sign In</span>
                      </>
                    )}
                  </div>
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Toggle Sign In/Sign Up */}
            <div className="text-center">
              <p className="text-gray-600 mb-3">
                {isSignUp ? 'पहले से खाता है?' : 'नया उपयोगकर्ता हैं?'}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setCropInputs(['']);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    farmLocation: '',
                    farmSize: '',
                    cropTypes: '',
                    experience: '',
                    agreeTerms: false,
                    rememberMe: false
                  });
                  setErrors({});
                }}
                className="w-full border-[#78d175] text-[#3e9c3b] hover:bg-[#78d175]/10 rounded-xl h-10"
              >
                {isSignUp ? 'साइन इन करें | Sign In' : 'नया खाता बनाएं | Create Account'}
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                साइन इन करके आप खेती गुरु के सभी स्मार्ट फीचर्स का उपयोग कर सकेंगे। 
                आपकी व्यक्तिगत जानकारी पूर्णतः सुरक्षित रहेगी।
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}