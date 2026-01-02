import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../context/LanguageContext';

interface LanguageSelectorProps {
  onComplete: () => void;
}

export function LanguageSelector({ onComplete }: LanguageSelectorProps) {
  const { setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    // Persist that the user has completed the language setup
    localStorage.setItem('languageSetupComplete', 'true');
    // Also update parent settings storage to keep them in sync
    const savedSettings = localStorage.getItem('parentSettings');
    let settings = { language: lang };
    if (savedSettings) {
      try {
        settings = { ...JSON.parse(savedSettings), language: lang };
      } catch (e) {
        console.error('Error updating settings:', e);
      }
    }
    localStorage.setItem('parentSettings', JSON.stringify(settings));
    
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe className="w-10 h-10 text-purple-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h1>
        <p className="text-gray-600 mb-8">Please select your language<br/>Sila pilih bahasa<br/>请选择语言</p>

        <div className="space-y-4">
          <button
            onClick={() => handleSelect('en')}
            className="w-full p-4 rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all group flex items-center gap-4"
          >
            <span className="text-4xl">🇺🇸</span>
            <div className="text-left">
              <div className="font-bold text-gray-800 group-hover:text-purple-700">English</div>
              <div className="text-sm text-gray-500">English</div>
            </div>
          </button>

          <button
            onClick={() => handleSelect('ms')}
            className="w-full p-4 rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all group flex items-center gap-4"
          >
            <span className="text-4xl">🇲🇾</span>
            <div className="text-left">
              <div className="font-bold text-gray-800 group-hover:text-purple-700">Bahasa Melayu</div>
              <div className="text-sm text-gray-500">Malay</div>
            </div>
          </button>

          <button
            onClick={() => handleSelect('zh')}
            className="w-full p-4 rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all group flex items-center gap-4"
          >
            <span className="text-4xl">🇨🇳</span>
            <div className="text-left">
              <div className="font-bold text-gray-800 group-hover:text-purple-700">中文</div>
              <div className="text-sm text-gray-500">Chinese</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}