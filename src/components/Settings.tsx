import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Languages, 
  Bell, 
  Wifi, 
  Moon, 
  Volume2, 
  Smartphone,
  HelpCircle,
  Shield,
  Download
} from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    language: 'english',
    notifications: true,
    darkMode: false,
    voiceAssistant: true,
    offlineMode: true,
    autoSync: true
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const languages = [
    { value: 'english', label: 'English', native: 'English' },
    { value: 'hindi', label: 'Hindi', native: 'हिन्दी' },
    { value: 'punjabi', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { value: 'tamil', label: 'Tamil', native: 'தமிழ்' },
    { value: 'telugu', label: 'Telugu', native: 'తెలుగు' },
    { value: 'marathi', label: 'Marathi', native: 'मराठी' }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Language Settings */}
      <Card className="bg-blue-100 border-blue-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Languages className="w-6 h-6" />
            Language Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-blue-800 mb-2 block">
                Select Your Language
              </label>
              <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <div className="flex items-center gap-2">
                        <span>{lang.label}</span>
                        <span className="text-gray-500">({lang.native})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-blue-200 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                🌍 Language will change after app restart. Voice commands will also work in selected language.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weather Alerts</p>
              <p className="text-sm text-gray-600">Get notified about weather changes</p>
            </div>
            <Switch 
              checked={settings.notifications} 
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Crop Reminders</p>
              <p className="text-sm text-gray-600">Irrigation, fertilization, and harvest reminders</p>
            </div>
            <Switch 
              checked={settings.notifications} 
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Market Prices</p>
              <p className="text-sm text-gray-600">Daily crop price updates</p>
            </div>
            <Switch 
              checked={settings.notifications} 
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5" />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-600">Easier viewing in low light</p>
              </div>
            </div>
            <Switch 
              checked={settings.darkMode} 
              onCheckedChange={(checked) => updateSetting('darkMode', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5" />
              <div>
                <p className="font-medium">Voice Assistant</p>
                <p className="text-sm text-gray-600">Ask questions using voice</p>
              </div>
            </div>
            <Switch 
              checked={settings.voiceAssistant} 
              onCheckedChange={(checked) => updateSetting('voiceAssistant', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              <div>
                <p className="font-medium">Auto Sync</p>
                <p className="text-sm text-gray-600">Automatically sync data when online</p>
              </div>
            </div>
            <Switch 
              checked={settings.autoSync} 
              onCheckedChange={(checked) => updateSetting('autoSync', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Offline Mode */}
      <Card className="bg-yellow-100 border-yellow-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <Wifi className="w-6 h-6" />
            Offline Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-yellow-900">Enable Offline Mode</p>
                <p className="text-sm text-yellow-800">Access basic features without internet</p>
              </div>
              <Switch 
                checked={settings.offlineMode} 
                onCheckedChange={(checked) => updateSetting('offlineMode', checked)}
              />
            </div>
            
            {settings.offlineMode && (
              <div className="bg-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 mb-3">
                  📱 Offline features available:
                </p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>��� View saved crop data</li>
                  <li>• Access farming tools</li>
                  <li>• Record field activities</li>
                  <li>• Basic calculations</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start h-12">
            <HelpCircle className="w-5 h-5 mr-3" />
            User Guide & Tutorials
          </Button>
          
          <Button variant="outline" className="w-full justify-start h-12">
            <Shield className="w-5 h-5 mr-3" />
            Privacy Policy
          </Button>
          
          <Button variant="outline" className="w-full justify-start h-12">
            <Volume2 className="w-5 h-5 mr-3" />
            Voice Command Help
          </Button>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <Card className="bg-green-100 border-green-300">
        <CardContent className="pt-6">
          <Button className="w-full bg-green-700 hover:bg-green-800 text-white h-12">
            Save All Settings
          </Button>
          <p className="text-center text-sm text-green-700 mt-2">
            Settings are automatically saved
          </p>
        </CardContent>
      </Card>
    </div>
  );
}