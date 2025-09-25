import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  User, 
  MapPin, 
  Crop, 
  Ruler, 
  Edit,
  Save,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  FileText,
  Clock
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface UserData {
  name: string;
  phone: string;
  email?: string;
  farmLocation: string;
  farmSize: string;
  cropTypes: string;
  experience: string;
  isNewUser: boolean;
}

interface FarmerProfileProps {
  userData?: UserData | null;
}



export function FarmerProfile({ userData }: FarmerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: userData?.name || 'Rajesh Kumar',
    phone: userData?.phone || '+91 98765 43210',
    email: userData?.email || '',
    farmLocation: userData?.farmLocation || 'Punjab, India',
    farmSize: userData?.farmSize || '5.2 hectares',
    cropTypes: userData?.cropTypes || 'Wheat, Rice, Corn',
    experience: userData?.experience || '15 years'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const cropTypesArray = formData.cropTypes.split(',').map(crop => crop.trim()).filter(Boolean);

  return (
    <div className="space-y-6 p-4">
      {/* Profile Information */}
      <Card className="bg-green-100 border-green-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-900">
            <User className="w-6 h-6" />
            {t('profile.title')}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="text-green-800 border-green-400 hover:bg-green-200"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t('profile.save')}
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                {t('profile.edit')}
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{t('signin.fullName')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">{t('signin.mobile')}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">{t('signin.email')} ({t('common.optional')})</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="farmLocation">{t('signin.farmLocation')}</Label>
                <Input
                  id="farmLocation"
                  value={formData.farmLocation}
                  onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="farmSize">{t('signin.farmSize')}</Label>
                <Input
                  id="farmSize"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cropTypes">{t('signin.mainCrops')}</Label>
                <Input
                  id="cropTypes"
                  value={formData.cropTypes}
                  onChange={(e) => setFormData({ ...formData, cropTypes: e.target.value })}
                  className="mt-1"
                  placeholder="गेहूं, चावल, मक्का"
                />
              </div>

              <div>
                <Label htmlFor="experience">{t('signin.experience')}</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-800" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-900">{formData.name}</h3>
                  <p className="text-green-700">{formData.experience} farming experience</p>
                  {userData?.isNewUser && (
                    <Badge className="mt-1 bg-blue-100 text-blue-800">{t('profile.newUser')}</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Phone className="w-5 h-5 text-green-700" />
                  <div>
                    <p className="text-sm text-gray-600">{t('profile.phone')}</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                </div>

                {formData.email && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <Mail className="w-5 h-5 text-green-700" />
                    <div>
                      <p className="text-sm text-gray-600">{t('signin.email')}</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <MapPin className="w-5 h-5 text-green-700" />
                  <div>
                    <p className="text-sm text-gray-600">{t('profile.location')}</p>
                    <p className="font-medium">{formData.farmLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Ruler className="w-5 h-5 text-green-700" />
                  <div>
                    <p className="text-sm text-gray-600">{t('signin.farmSize')}</p>
                    <p className="font-medium">{formData.farmSize}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Crop className="w-5 h-5 text-green-700" />
                  <div>
                    <p className="text-sm text-gray-600">{t('profile.crops')}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {cropTypesArray.map((crop, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-200 text-green-900 text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Farm Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.farmSummary')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-800 mb-1">2.5 टन</div>
              <p className="text-sm text-green-700">{t('profile.predictedYield')}</p>
            </div>
            
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-800 mb-1">12</div>
              <p className="text-sm text-purple-700">{t('profile.daysToHarvest')}</p>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Contact Support */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <HelpCircle className="w-6 h-6" />
            {t('profile.contactSupport')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Support Options */}
          <div className="grid grid-cols-1 gap-3">
            {/* Phone Support */}
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto text-left bg-white hover:bg-blue-50 border-blue-200"
              onClick={() => window.open('tel:+911800123456')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">{t('profile.supportPhone')}</p>
                  <p className="text-sm text-blue-700">+91 1800-123-456</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-600">{t('profile.supportHours')}</span>
                  </div>
                </div>
              </div>
            </Button>

            {/* WhatsApp Support */}
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto text-left bg-white hover:bg-green-50 border-green-200"
              onClick={() => window.open('https://wa.me/911800123456?text=Hello%20Kheti%20Guru%20Support')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="font-medium text-green-900">{t('profile.supportWhatsapp')}</p>
                  <p className="text-sm text-green-700">+91 1800-123-456</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">{t('profile.supportAvailable')}</span>
                  </div>
                </div>
              </div>
            </Button>

            {/* Email Support */}
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto text-left bg-white hover:bg-purple-50 border-purple-200"
              onClick={() => window.open('mailto:support@khetiguru.com?subject=Support Request')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <p className="font-medium text-purple-900">{t('profile.supportEmail')}</p>
                  <p className="text-sm text-purple-700">support@khetiguru.com</p>
                  <p className="text-xs text-purple-600 mt-1">Response within 24 hours</p>
                </div>
              </div>
            </Button>

            {/* FAQ / Help */}
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto text-left bg-white hover:bg-yellow-50 border-yellow-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <p className="font-medium text-yellow-900">{t('profile.supportFaq')}</p>
                  <p className="text-sm text-yellow-700">Find answers to common questions</p>
                </div>
              </div>
            </Button>

            {/* Report Issue */}
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto text-left bg-white hover:bg-red-50 border-red-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <p className="font-medium text-red-900">{t('profile.reportIssue')}</p>
                  <p className="text-sm text-red-700">Report bugs or technical issues</p>
                </div>
              </div>
            </Button>
          </div>

          {/* Support Note */}
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-800 text-center">
              🌾 हमारी टीम आपकी खेती में सफलता के लिए 24/7 तैयार है।
              <br />
              <span className="text-xs">Our team is available 24/7 to help you succeed in farming.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}