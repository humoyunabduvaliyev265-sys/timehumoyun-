import React from 'react';
import { SolarSystem3D } from '../components/3d/SolarSystem3D';
import { Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import { Globe, ArrowLeft, Orbit } from 'lucide-react';

interface SpaceViewProps {
  onReturnToEarth: () => void;
  lang: Language;
  theme: ThemeMode;
}

export const SpaceView: React.FC<SpaceViewProps> = ({ onReturnToEarth, lang, theme }) => {
  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  return (
    <div className="space-y-6 pb-16 text-start">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
            <Orbit className="w-4 h-4" />
            <span>{t('astrophysicalPlanetarium')}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('navSpace')}
          </h2>
          <p className={`text-xs mt-1 max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('spaceDescription')}
          </p>
        </div>

        {/* Prominent Return to Earth Action */}
        <button
          onClick={onReturnToEarth}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center gap-2 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('returnToEarth')}</span>
          <Globe className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Solar System Viewport & Details */}
      <div className={`rounded-3xl p-6 border shadow-xl ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <SolarSystem3D theme={theme} lang={lang} />
      </div>
    </div>
  );
};
