import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'hi' | 'en' | 'pa' | 'ta' | 'te' | 'mr' | 'gu' | 'bn';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation object - organized by language and then by keys
const translations = {
  en: {
    // App General
    'app.title': 'Kheti Guru',
    'app.subtitle': 'Your Farming Assistant',
    'app.welcome': 'Welcome',
    'app.online': 'Online',
    'app.offline': 'Offline',
    'app.signOut': 'Sign Out',
    
    // Navigation
    'nav.home': 'Home',
    'nav.weather': 'Weather',
    'nav.schemes': 'Schemes',
    'nav.assistant': 'AI Assistant',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.welcome': 'Hello, {name}!',
    'dashboard.weatherGood': "Today's weather is good. Perfect time for farming.",
    'dashboard.todayEarning': "Today's Earning",
    'dashboard.cropArea': 'Crop Area',
    'dashboard.waterSaved': 'Water Saved',
    'dashboard.nextHarvest': 'Next Harvest',
    'dashboard.yieldPrediction': 'Predicted Yield',
    'dashboard.expectedYield': 'Expected Yield',
    'dashboard.aboveAverage': 'Above average production this season',
    'dashboard.cropHealth': 'Crop Health Status',
    'dashboard.farmTools': 'Farm Tools',
    'dashboard.irrigation': 'Irrigation',
    'dashboard.fertilizer': 'Fertilizer',
    'dashboard.pestControl': 'Pest Control',
    'dashboard.recommendations': "Today's Recommendations",
    
    // AI Assistant
    'ai.title': 'Smart Assistant',
    'ai.subtitle': 'Online and Ready',
    'ai.placeholder': 'Ask anything...',
    'ai.quickActions': 'Quick Actions',
    'ai.recentChats': 'Recent Chats',
    'ai.processing': 'AI is preparing your answer...',
    'ai.totalQuestions': 'Total Questions',
    'ai.accuracy': 'Accuracy',
    'ai.avgTime': 'Average Time',
    'ai.askWeather': 'Ask Weather',
    'ai.checkCrop': 'Check Crop',
    'ai.waterAdvice': 'Water Advice',
    'ai.marketPrice': 'Market Price',
    'ai.askAgain': 'Ask Again',
    
    // Language
    'language.title': 'Language',
    'language.subtitle': 'Choose your preferred language',
    'language.select': 'Select Language',
    'language.note': 'App will restart after changing language. Voice commands will also work in the selected language.',
    'language.speakOrType': 'Speak or Type',
    
    // Sign In
    'signin.title': 'Sign In',
    'signin.subtitle': 'Create Account',
    'signin.createAccount': 'Create New Account',
    'signin.fullName': 'Full Name',
    'signin.email': 'Email',
    'signin.mobile': 'Mobile Number',
    'signin.password': 'Password',
    'signin.confirmPassword': 'Confirm Password',
    'signin.farmDetails': 'Farm Details',
    'signin.farmLocation': 'Farm Location',
    'signin.farmSize': 'Farm Size',
    'signin.mainCrops': 'Main Crops',
    'signin.experience': 'Experience',
    'signin.agreeTerms': 'I agree to terms and conditions',
    'signin.rememberMe': 'Remember Me',
    'signin.forgotPassword': 'Forgot Password?',
    'signin.signIn': 'Sign In',
    'signin.createAccountBtn': 'Create Account',
    'signin.alreadyAccount': 'Already have account?',
    'signin.newUser': 'New user?',
    
    // Profile
    'profile.title': 'Farmer Profile',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.phone': 'Phone',
    'profile.location': 'Location',
    'profile.crops': 'Crops',
    'profile.newUser': 'New User',
    'profile.farmSummary': 'Farm Summary',
    'profile.predictedYield': 'Predicted Yield',
    'profile.daysToHarvest': 'Days to Harvest',
    'profile.recentAlerts': 'Recent Alerts',
    'profile.contactSupport': 'Contact Support',
    'profile.supportPhone': 'Phone Support',
    'profile.supportEmail': 'Email Support',
    'profile.supportWhatsapp': 'WhatsApp Support',
    'profile.supportFaq': 'Frequently Asked Questions',
    'profile.reportIssue': 'Report an Issue',
    'profile.supportAvailable': '24/7 Available',
    'profile.supportHours': '6 AM to 10 PM',
    
    // AI Assistant - Talk to Expert
    'ai.talkToExpert': 'Talk to Expert',
    'ai.cantAnswer': 'I appreciate your question. This is a complex issue that would benefit from expert consultation.',
    'ai.expertSuggestion': 'Would you like to connect with an agriculture expert?',
    'ai.connectingExpert': 'Connecting to expert...',
    'ai.expertAvailable': 'Expert Available',
    'ai.callExpert': 'Call Expert',
    'ai.chatExpert': 'Chat with Expert',
    
    // Health Status
    'health.good': 'Good',
    'health.warning': 'Warning',
    'health.critical': 'Critical',
    
    // Common
    'common.days': 'days',
    'common.hectare': 'hectare',
    'common.liters': 'liters',
    'common.years': 'years',
    'common.optional': 'optional',
    'common.required': 'required'
  },
  hi: {
    // App General
    'app.title': 'खेती गुरु',
    'app.subtitle': 'आपका कृषि सहायक',
    'app.welcome': 'नमस्कार',
    'app.online': 'ऑनलाइन',
    'app.offline': 'ऑफलाइन',
    'app.signOut': 'साइन आउट करें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.weather': 'मौसम',
    'nav.schemes': 'योजनाएं',
    'nav.assistant': 'AI सहायक',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग',
    
    // Dashboard
    'dashboard.welcome': 'नमस्कार, {name}!',
    'dashboard.weatherGood': 'आज का मौसम अच्छा है। खेती के लिए उपयुक्त समय है।',
    'dashboard.todayEarning': 'आज की कमाई',
    'dashboard.cropArea': 'फसल क्षेत्र',
    'dashboard.waterSaved': 'पानी की बचत',
    'dashboard.nextHarvest': 'अगली फसल',
    'dashboard.yieldPrediction': 'फसल उत्पादन पूर्वानुमान',
    'dashboard.expectedYield': 'अपेक्षित उत्पादन',
    'dashboard.aboveAverage': 'इस सीजन औसत से अधिक उत्पादन',
    'dashboard.cropHealth': 'फसल स्वास्थ्य स्थिति',
    'dashboard.farmTools': 'खेती उपकरण',
    'dashboard.irrigation': 'सिंचाई',
    'dashboard.fertilizer': 'उर्वरक',
    'dashboard.pestControl': 'कीट नियंत्रण',
    'dashboard.recommendations': 'आज की सिफारिशें',
    
    // AI Assistant
    'ai.title': 'AI सहायक',
    'ai.subtitle': 'ऑनलाइन और तैयार',
    'ai.placeholder': 'कोई भी सवाल पूछें...',
    'ai.quickActions': 'त्वरित कार्य',
    'ai.recentChats': 'हाल की बातचीत',
    'ai.processing': 'AI आपका जवाब तैयार कर रहा है...',
    'ai.totalQuestions': 'कुल सवाल',
    'ai.accuracy': 'सटीकता',
    'ai.avgTime': 'औसत समय',
    'ai.askWeather': 'मौसम पूछें',
    'ai.checkCrop': 'फसल जांचें',
    'ai.waterAdvice': 'पानी सलाह',
    'ai.marketPrice': 'बाजार भाव',
    'ai.askAgain': 'फिर पूछें',
    
    // Language
    'language.title': 'भाषा',
    'language.subtitle': 'अपनी पसंदीदा भाषा चुनें',
    'language.select': 'भाषा चुनें',
    'language.note': 'भाषा बदलने के बाद ऐप रीस्टार्ट होगा। Voice commands भी चुनी गई भाषा में काम करेंगे।',
    'language.speakOrType': 'बोलें या टाइप करें',
    
    // Sign In
    'signin.title': 'साइन इन करें',
    'signin.subtitle': 'अपना खाता बनाएं',
    'signin.createAccount': 'नया खाता बनाएं',
    'signin.fullName': 'पूरा नाम',
    'signin.email': 'ईमेल',
    'signin.mobile': 'मोबाइल नंबर',
    'signin.password': 'पासवर्ड',
    'signin.confirmPassword': 'पासवर्ड पुष्टि',
    'signin.farmDetails': 'खेती की जानकारी',
    'signin.farmLocation': 'खेत का स्थान',
    'signin.farmSize': 'खेत का आकार',
    'signin.mainCrops': 'मुख्य फसलें',
    'signin.experience': 'अनुभव',
    'signin.agreeTerms': 'मैं नियम और शर्तों से सहमत हूं',
    'signin.rememberMe': 'मुझे याद रखें',
    'signin.forgotPassword': 'पासवर्ड भूल गए?',
    'signin.signIn': 'साइन इन करें',
    'signin.createAccountBtn': 'खाता बनाएं',
    'signin.alreadyAccount': 'पहले से खाता है?',
    'signin.newUser': 'नया उपयोगकर्ता हैं?',
    
    // Profile
    'profile.title': 'किसान प्रोफाइल',
    'profile.edit': 'एडिट',
    'profile.save': 'सेव',
    'profile.phone': 'फोन नंबर',
    'profile.location': 'स्थान',
    'profile.crops': 'फसलें',
    'profile.newUser': 'नया उपयोगकर्ता',
    'profile.farmSummary': 'खेत सारांश',
    'profile.predictedYield': 'अनुमानित उत्पादन',
    'profile.daysToHarvest': 'फसल के दिन',
    'profile.recentAlerts': 'हाल की अलर्ट',
    'profile.contactSupport': 'सहायता संपर्क',
    'profile.supportPhone': 'फोन सहायता',
    'profile.supportEmail': 'ईमेल सहायता',
    'profile.supportWhatsapp': 'व्हाट्सऐप सहायता',
    'profile.supportFaq': 'अक्सर पूछे जाने वाले प्रश्न',
    'profile.reportIssue': 'समस्या रिपोर्ट करें',
    'profile.supportAvailable': '24/7 उपलब्ध',
    'profile.supportHours': 'सुबह 6 बजे से रात 10 बजे तक',
    
    // AI Assistant - Talk to Expert
    'ai.talkToExpert': 'विशेषज्ञ से बात करें',
    'ai.cantAnswer': 'मुझे खुशी है कि आपने सवाल पूछा। यह एक जटिल समस्या है जिसके लिए विशेषज्ञ की राय बेहतर होगी।',
    'ai.expertSuggestion': 'क्या आप किसी कृषि विशेषज्ञ से बात करना चाहेंगे?',
    'ai.connectingExpert': 'विशेषज्ञ से जोड़ रहे हैं...',
    'ai.expertAvailable': 'विशेषज्ञ उपलब्ध हैं',
    'ai.callExpert': 'विशेषज्ञ को कॉल करें',
    'ai.chatExpert': 'विशेषज्ञ से चैट करें',
    
    // Health Status
    'health.good': 'अच्छी',
    'health.warning': 'चेतावनी',
    'health.critical': 'गंभीर',
    
    // Common
    'common.days': 'दिन',
    'common.hectare': 'हेक्टेयर',
    'common.liters': 'लीटर',
    'common.years': 'साल',
    'common.optional': 'वैकल्पिक',
    'common.required': 'आवश्यक'
  },
  mr: {
    'app.title': 'खेती गुरु',
    'app.subtitle': 'तुमचा शेती सहाय्यक',
    'app.welcome': 'स्वागत',
    'app.online': 'ऑनलाइन',
    'app.offline': 'ऑफलाइन',
    'app.signOut': 'साइन आउट करा',
    
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.weather': 'हवामान',
    'nav.schemes': 'योजना',
    'nav.assistant': 'AI सहाय्यक',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्ज',
    
    // Dashboard
    'dashboard.welcome': 'नमस्कार, {name}!',
    'dashboard.weatherGood': 'आजचे हवामान चांगले आहे. शेतीसाठी योग्य वेळ आहे.',
    'dashboard.todayEarning': 'आजची कमाई',
    'dashboard.cropArea': 'पीक क्षेत्र',
    'dashboard.waterSaved': 'पाणी वाचवले',
    'dashboard.nextHarvest': 'पुढची कापणी',
    'dashboard.yieldPrediction': 'अंदाजित उत्पादन',
    'dashboard.expectedYield': 'अपेक्षित उत्पादन',
    'dashboard.aboveAverage': 'या हंगामात सरासरीपेक्षा जास्त उत्पादन',
    'dashboard.cropHealth': 'पीक आरोग्य स्थिती',
    'dashboard.farmTools': 'शेती साधने',
    'dashboard.irrigation': 'सिंचन',
    'dashboard.fertilizer': 'खत',
    'dashboard.pestControl': 'कीड नियंत्रण',
    'dashboard.recommendations': 'आजच्या शिफारसी',
    
    // AI Assistant
    'ai.title': 'स्मार्ट सहाय्यक',
    'ai.subtitle': 'ऑनलाइन आणि तयार',
    'ai.placeholder': 'काहीही विचारा...',
    'ai.quickActions': 'त्वरित कृती',
    'ai.recentChats': 'अलीकडील संभाषणे',
    'ai.processing': 'AI तुमचे उत्तर तयार करत आहे...',
    'ai.totalQuestions': 'एकूण प्रश्न',
    'ai.accuracy': 'अचूकता',
    'ai.avgTime': 'सरासरी वेळ',
    'ai.askWeather': 'हवामान विचारा',
    'ai.checkCrop': 'पीक तपासा',
    'ai.waterAdvice': 'पाणी सल्ला',
    'ai.marketPrice': 'बाजार भाव',
    'ai.askAgain': 'पुन्हा विचारा',
    
    // Language
    'language.title': 'भाषा',
    'language.subtitle': 'तुमची पसंतीची भाषा निवडा',
    'language.select': 'भाषा निवडा',
    'language.note': 'भाषा बदलल्यानंतर अॅप रीस्टार्ट होईल. आवाज आदेश देखील निवडलेल्या भाषेत कार्य करतील.',
    'language.speakOrType': 'बोला किंवा टाइप करा',
    
    // Sign In
    'signin.title': 'साइन इन करा',
    'signin.subtitle': 'खाते तयार करा',
    'signin.createAccount': 'नवीन खाते तयार करा',
    'signin.fullName': 'पूर्ण नाव',
    'signin.email': 'ईमेल',
    'signin.mobile': 'मोबाइल नंबर',
    'signin.password': 'पासवर्ड',
    'signin.confirmPassword': 'पासवर्ड पुष्टी',
    'signin.farmDetails': 'शेत तपशील',
    'signin.farmLocation': 'शेत स्थान',
    'signin.farmSize': 'शेत आकार',
    'signin.mainCrops': 'मुख्य पिके',
    'signin.experience': 'अनुभव',
    'signin.agreeTerms': 'मी अटी आणि शर्तींशी सहमत आहे',
    'signin.rememberMe': 'मला लक्षात ठेवा',
    'signin.forgotPassword': 'पासवर्ड विसरलात?',
    'signin.signIn': 'साइन इन करा',
    'signin.createAccountBtn': 'खाते तयार करा',
    'signin.alreadyAccount': 'आधीपासूनच खाते आहे?',
    'signin.newUser': 'नवीन वापरकर्ता आहात?',
    
    // Profile
    'profile.title': 'शेतकरी प्रोफाइल',
    'profile.edit': 'संपादित करा',
    'profile.save': 'जतन करा',
    'profile.phone': 'फोन',
    'profile.location': 'स्थान',
    'profile.crops': 'पिके',
    'profile.newUser': 'नवीन वापरकर्ता',
    'profile.farmSummary': 'शेत सारांश',
    'profile.predictedYield': 'अंदाजित उत्पादन',
    'profile.daysToHarvest': 'कापणीचे दिवस',
    'profile.recentAlerts': 'अलीकडील सूचना',
    'profile.contactSupport': 'समर्थन संपर्क',
    'profile.supportPhone': 'फोन समर्थन',
    'profile.supportEmail': 'ईमेल समर्थन',
    'profile.supportWhatsapp': 'व्हाट्सअॅप समर्थन',
    'profile.supportFaq': 'वारंवार विचारले जाणारे प्रश्न',
    'profile.reportIssue': 'समस्या नोंदवा',
    'profile.supportAvailable': '24/7 उपलब्ध',
    'profile.supportHours': 'सकाळी 6 ते रात्री 10 पर्यंत',
    
    // AI Assistant - Talk to Expert
    'ai.talkToExpert': 'तज्ञाशी बोला',
    'ai.cantAnswer': 'तुमच्या प्रश्नाची मी प्रशंसा करतो. ही एक जटिल समस्या आहे ज्यासाठी तज्ञांचा सल्ला चांगला ठरेल.',
    'ai.expertSuggestion': 'तुम्हाला कृषी तज्ञाशी संपर्क साधायचा आहे का?',
    'ai.connectingExpert': 'तज्ञाशी जोडत आहे...',
    'ai.expertAvailable': 'तज्ञ उपलब्ध आहे',
    'ai.callExpert': 'तज्ञांना कॉल करा',
    'ai.chatExpert': 'तज्ञाशी चॅट करा',
    
    // Health Status
    'health.good': 'चांगली',
    'health.warning': 'चेतावणी',
    'health.critical': 'गंभीर',
    
    // Common
    'common.days': 'दिवस',
    'common.hectare': 'हेक्टर',
    'common.liters': 'लिटर',
    'common.years': 'वर्षे',
    'common.optional': 'पर्यायी',
    'common.required': 'आवश्यक'
  },
  // Add more basic translations for other languages
  pa: {
    'app.title': 'ਖੇਤੀ ਗੁਰੂ',
    'app.subtitle': 'ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ',
    'nav.home': 'ਘਰ',
    'nav.weather': 'ਮੌਸਮ',
    'nav.schemes': 'ਸਕੀਮਾਂ',
    'nav.assistant': 'AI ਸਹਾਇਕ',
    'nav.profile': 'ਪ੍ਰੋਫਾਈਲ',
    'nav.settings': 'ਸੈਟਿੰਗਜ਼',
    'dashboard.welcome': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ, {name}!',
    'language.title': 'ਭਾਸ਼ਾ',
    'profile.title': 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
    'profile.contactSupport': 'ਸਹਾਇਤਾ ਸੰਪਰਕ',
    'profile.supportPhone': 'ਫੋਨ ਸਹਾਇਤਾ',
    'profile.supportWhatsapp': 'ਵਾਟਸਐਪ ਸਹਾਇਤਾ',
    'ai.talkToExpert': 'ਮਾਹਰ ਨਾਲ ਗੱਲ ਕਰੋ',
    'ai.expertAvailable': 'ਮਾਹਰ ਉਪਲਬਧ ਹੈ',
    'ai.callExpert': 'ਮਾਹਰ ਨੂੰ ਕਾਲ ਕਰੋ',
    'ai.chatExpert': 'ਮਾਹਰ ਨਾਲ ਚੈਟ ਕਰੋ'
  },
  ta: {
    'app.title': 'கேதி குரு',
    'app.subtitle': 'உங்கள் விவசாய உதவியாளர்',
    'nav.home': 'முகப்பு',
    'nav.weather': 'வானிலை',
    'nav.schemes': 'திட்டங்கள்',
    'nav.assistant': 'AI உதவியாளர்',
    'nav.profile': 'சுயவிவரம்',
    'nav.settings': 'அமைப்புகள்',
    'dashboard.welcome': 'வணக்கம், {name}!',
    'language.title': 'மொழி',
    'profile.title': 'விவசாயி சுயவிவரம்',
    'profile.contactSupport': 'ஆதரவைத் தொடர்பு கொள்ளுங்கள்',
    'profile.supportPhone': 'தொலைபேசி ஆதரவு',
    'ai.talkToExpert': 'நிபுணருடன் பேசுங்கள்',
    'ai.expertAvailable': 'நிபுணர் கிடைக்கிறார்',
    'ai.callExpert': 'நிபுணரை அழைக்கவும்',
    'ai.chatExpert': 'நிபுணருடன் அரட்டை'
  },
  te: {
    'app.title': 'ఖేతి గురు',
    'app.subtitle': 'మీ వ్యవసాయ సహాయకుడు',
    'nav.home': 'హోమ్',
    'nav.weather': 'వాతావరణం',
    'nav.schemes': 'పథకాలు',
    'nav.assistant': 'AI సహాయకుడు',
    'nav.profile': 'ప్రొఫైల్',
    'nav.settings': 'సెట్టింగ్స్',
    'dashboard.welcome': 'నమస్కారం, {name}!',
    'language.title': 'భాష',
    'profile.title': 'రైతు ప్రొఫైల్'
  },
  gu: {
    'app.title': 'ખેતી ગુરુ',
    'app.subtitle': 'તમારો ખેતી સહાયક',
    'nav.home': 'હોમ',
    'nav.weather': 'હવામાન',
    'nav.schemes': 'યોજનાઓ',
    'nav.assistant': 'AI સહાયક',
    'nav.profile': 'પ્રોફાઇલ',
    'nav.settings': 'સેટિંગ્સ',
    'dashboard.welcome': 'ਨਮਸਤੇ, {name}!',
    'language.title': 'ભાષા',
    'profile.title': 'કિસાન પ્રોફાઇલ'
  },
  bn: {
    'app.title': 'খেতি গুরু',
    'app.subtitle': 'আপনার কৃষি সহায়ক',
    'nav.home': 'হোম',
    'nav.weather': 'আবহাওয়া',
    'nav.schemes': 'স্কিম',
    'nav.assistant': 'AI সহায়ক',
    'nav.profile': 'প্রোফাইল',
    'nav.settings': 'সেটিংস',
    'dashboard.welcome': 'নমস্কার, {name}!',
    'language.title': 'ভাষা',
    'profile.title': 'কৃষক প্রোফাইল'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Load saved language from localStorage
  useEffect(() => {
    try {
        const savedLanguage = localStorage.getItem('khetiGuru-language') as Language;
        if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
          setCurrentLanguage(savedLanguage);
        }
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
        localStorage.setItem('khetiGuru-language', lang);
    } catch (error) {
        console.error("Could not access local storage:", error);
    }
  };

  const t = (key: string, params?: Record<string, string>): string => {
    let translationSet = translations[currentLanguage] || translations['en'];
    let translation = translationSet[key] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

