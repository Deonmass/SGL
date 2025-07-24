import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Lock, Bell, Globe, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: true,
      mobile: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    display: {
      language: 'fr',
      timezone: 'Africa/Kinshasa'
    }
  });

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSecurityChange = (key: keyof typeof settings.security, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const handleDisplayChange = (key: keyof typeof settings.display, value: string) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Save settings:', settings);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Paramètres</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Notifications par email</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Notifications bureau</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.desktop}
                  onChange={() => handleNotificationChange('desktop')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Notifications mobile</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.mobile}
                  onChange={() => handleNotificationChange('mobile')}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-white">Sécurité</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Authentification à deux facteurs</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.security.twoFactor}
                  onChange={() => handleSecurityChange('twoFactor', !settings.security.twoFactor)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Expiration de la session (minutes)</label>
              <select
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="120">2 heures</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Expiration du mot de passe (jours)</label>
              <select
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
              >
                <option value="30">30 jours</option>
                <option value="60">60 jours</option>
                <option value="90">90 jours</option>
                <option value="180">180 jours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-white">Affichage</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Langue</label>
              <select
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={settings.display.language}
                onChange={(e) => handleDisplayChange('language', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Fuseau horaire</label>
              <select
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={settings.display.timezone}
                onChange={(e) => handleDisplayChange('timezone', e.target.value)}
              >
                <option value="Africa/Kinshasa">Kinshasa</option>
                <option value="Africa/Lubumbashi">Lubumbashi</option>
                <option value="Africa/Dar_es_Salaam">Dar es Salaam</option>
                <option value="Africa/Nairobi">Nairobi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            <Save className="w-5 h-5 mr-2" />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;