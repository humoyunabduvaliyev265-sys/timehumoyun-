import React from 'react';
import { GlobeQuality, Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import { Settings, Globe, Moon, Sun, Monitor, Trash2, Eye, Check } from 'lucide-react';

interface SettingsViewProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  globeQuality: GlobeQuality;
  onGlobeQualityChange: (quality: GlobeQuality) => void;
  reducedMotion: boolean;
  onReducedMotionToggle: () => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  globeQuality,
  onGlobeQualityChange,
  reducedMotion,
  onReducedMotionToggle,
  onResetData,
}) => {
  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  const languageCards: { id: Language; label: string; flag: string; native: string }[] = [
    { id: 'uz', label: 'O‘zbekcha', flag: '🇺🇿', native: 'O‘zbek tili' },
    { id: 'en', label: 'English', flag: '🇬🇧', native: 'English Language' },
    { id: 'ru', label: 'Русский', flag: '🇷🇺', native: 'Русский язык' },
    { id: 'ar', label: 'العربية', flag: '🇸🇦', native: 'اللغة العربية (RTL)' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16 text-start">
      <div>
        <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
          <Settings className="w-4 h-4" />
          <span>{t('systemConfig')}</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t('preferences')}
        </h2>
        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t('preferencesDesc')}
        </p>
      </div>

      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-7 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Language Selection */}
        <div className="space-y-3">
          <label className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2 ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}>
            <Globe className="w-4 h-4 text-cyan-500" />
            <span>{t('language')} (Multilingual System)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {languageCards.map(l => {
              const isSelected = lang === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => onLanguageChange(l.id)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-start ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-sm'
                        : 'bg-cyan-50 border-cyan-500 text-cyan-950 font-bold shadow-xs'
                      : isDark
                      ? 'bg-slate-950/60 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-800'
                      : 'bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{l.flag}</span>
                    <div>
                      <h4 className="text-xs font-bold">{l.label}</h4>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{l.native}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-500 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Mode */}
        <div className="space-y-3 pt-5 border-t border-inherit">
          <label className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2 ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}>
            {isDark ? <Moon className="w-4 h-4 text-cyan-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{t('theme')} (Light / Dark Mode)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => !isDark && onThemeToggle()}
              className={`p-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2.5 ${
                isDark
                  ? 'bg-slate-950 text-cyan-400 border-cyan-400 shadow-sm'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-900'
              }`}
            >
              <Moon className="w-4 h-4 text-cyan-400" />
              <span>{t('themeDark')}</span>
            </button>

            <button
              onClick={() => isDark && onThemeToggle()}
              className={`p-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2.5 ${
                !isDark
                  ? 'bg-white text-amber-700 border-amber-500 shadow-md ring-1 ring-amber-400'
                  : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{t('themeLight')}</span>
            </button>
          </div>
        </div>

        {/* 3D Globe Visual Fidelity */}
        <div className="space-y-3 pt-5 border-t border-inherit">
          <label className={`text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2 ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}>
            <Monitor className="w-4 h-4 text-purple-500" />
            <span>{t('globeQuality')}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'high', labelKey: 'highQuality' },
              { id: 'medium', labelKey: 'mediumQuality' },
              { id: 'low', labelKey: 'lowQuality' },
            ].map(q => {
              const isSelected = globeQuality === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => onGlobeQualityChange(q.id as GlobeQuality)}
                  className={`p-3 rounded-2xl text-xs border transition-all text-center font-semibold ${
                    isSelected
                      ? isDark
                        ? 'bg-purple-950 text-purple-200 border-purple-400 font-bold shadow-xs'
                        : 'bg-purple-50 text-purple-900 border-purple-400 font-bold shadow-xs'
                      : isDark
                      ? 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {t(q.labelKey as any)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessibility: Reduced Motion */}
        <div className="pt-5 border-t border-inherit flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Eye className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <span className={`text-xs font-bold block ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {t('motionReduced')}
              </span>
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('motionReducedDesc')}
              </span>
            </div>
          </div>
          <button
            onClick={onReducedMotionToggle}
            className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
              reducedMotion ? 'bg-cyan-500' : isDark ? 'bg-slate-800' : 'bg-slate-300'
            }`}
            aria-label="Toggle Reduced Motion"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 transition-transform ${
                reducedMotion ? (lang === 'ar' ? 'left-1' : 'right-1') : (lang === 'ar' ? 'right-1' : 'left-1')
              }`}
            />
          </button>
        </div>

        {/* Local Storage & Reset */}
        <div className="pt-5 border-t border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-rose-500 block">{t('resetLocalData')}</span>
            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('resetLocalDataDesc')}
            </span>
          </div>
          <button
            onClick={() => {
              if (window.confirm(t('resetConfirm'))) {
                onResetData();
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('resetAll')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
