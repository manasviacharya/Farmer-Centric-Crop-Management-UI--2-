import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Camera, 
  Upload, 
  Volume2, 
  Leaf, 
  Bug, 
  AlertTriangle, 
  CheckCircle,
  X,
  RotateCcw,
  Zap,
  Info,
  Phone,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function CameraSearch() {
  const { t } = useLanguage();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showTreatment, setShowTreatment] = useState(false);

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

  const handleCameraCapture = () => {
    // Mock camera capture - in real app, this would open camera
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
    // Mock analysis - in real app, this would send image to AI service
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(mockAnalysis);
    }, 3000);
  };

  const handleSpeak = (text: string) => {
    // Text-to-speech functionality would be implemented here
    console.log('Speaking:', text);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowTreatment(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">रोग जांच</h1>
                <p className="text-blue-100 text-sm">Crop Disease Detection</p>
              </div>
            </div>
            {(capturedImage || analysisResult) && (
              <Button 
                onClick={reset}
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 rounded-xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                नया • New
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {!capturedImage && !analysisResult && (
        <>
          {/* Instructions */}
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

      {capturedImage && !analysisResult && !isAnalyzing && (
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <CardContent className="p-6">
            <div className="text-center">
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

      {analysisResult && (
        <div className="space-y-6">
          {/* Results */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Bug className="w-8 h-8 text-red-500" />
                  <div>
                    <div className="text-xl font-bold">पहचान पूर्ण • Detection Complete</div>
                  </div>
                </CardTitle>
                <Button
                  onClick={() => handleSpeak(analysisResult.disease)}
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
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
                          onClick={() => handleSpeak(treatment.name)}
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
    </div>
  );
}