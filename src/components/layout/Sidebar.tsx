import React from 'react';
import { Language, ThemeMode } from '../../types';
import { translations, getTranslation } from '../../data/i18n';
import {
  Globe,
  Compass,
  Clock,
  Landmark,
  Sparkles,
  Rocket,
  MapPin,
  BookOpen,
  Bookmark,
  Award,
  Settings,
  X,
  Layers,
  Sun,
  Moon,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpen,
  onClose,
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
}) => {
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);
  const isDark = theme === 'dark';
  const isRTL = lang === 'ar';

  const menuSections = [
    {
      title: lang === 'uz' ? 'Planetariy va Yer' : lang === 'ru' ? 'Планетарий и Земля' : lang === 'ar' ? 'القبة الفلكية والأرض' : 'Planetarium & Earth',
      items: [
        { id: 'home', label: t('navHome'), icon: Compass },
        { id: 'globe', label: t('navGlobe'), icon: Globe },
        { id: 'explorer', label: t('navExplorer'), icon: Layers },
      ],
    },
    {
      title: lang === 'uz' ? 'Vaqt o‘lchamlari' : lang === 'ru' ? 'Временные эпохи' : lang === 'ar' ? 'الأبعاد الزمنية' : 'Temporal Dimensions',
      items: [
        { id: 'timeMachine', label: t('navTimeMachine'), icon: Clock },
        { id: 'journeys', label: t('navJourneys'), icon: Landmark },
        { id: 'future', label: t('navFuture'), icon: Sparkles },
        { id: 'space', label: t('navSpace'), icon: Rocket },
      ],
    },
    {
      title: lang === 'uz' ? 'Akademiya va shaxsiy' : lang === 'ru' ? 'Академия и профиль' : lang === 'ar' ? 'الأكاديمية والملف الشخصي' : 'Academy & Personal',
      items: [
        { id: 'geoQuiz', label: t('navGeoQuiz'), icon: MapPin },
        { id: 'histQuiz', label: t('navHistQuiz'), icon: BookOpen },
        { id: 'favorites', label: t('navFavorites'), icon: Bookmark },
        { id: 'progress', label: t('navProgress'), icon: Award },
        { id: 'settings', label: t('navSettings'), icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-72 p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isRTL
            ? `right-0 border-l ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
            : `left-0 border-r ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
        } ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        } lg:static lg:z-10`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-inherit shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-wider font-display">EARTH 360</h2>
                <span className="text-[10px] text-cyan-500 font-mono font-semibold">TIME MACHINE AI</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors lg:hidden ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="mt-4 space-y-5 overflow-y-auto flex-1 pr-1 pl-1">
            {menuSections.map((section, idx) => (
              <div key={idx}>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 block mb-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {section.title}
                </span>
                <div className="space-y-1">
                  {section.items.map(item => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          onClose();
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? isDark
                              ? 'bg-gradient-to-r from-cyan-950 to-blue-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                              : 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-xs'
                            : isDark
                            ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive
                              ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                              : isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Theme & Language Quick Selector */}
          <div className="pt-3 border-t border-inherit shrink-0 lg:hidden space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-mono text-[10px] text-slate-400 uppercase">{t('language')}</span>
              <div className="flex items-center gap-1">
                {(['uz', 'en', 'ru', 'ar'] as const).map(code => (
                  <button
                    key={code}
                    onClick={() => onLanguageChange(code)}
                    className={`px-2 py-1 text-[11px] rounded-lg font-bold ${
                      lang === code
                        ? 'bg-cyan-500 text-slate-950'
                        : isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onThemeToggle}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>{isDark ? t('themeLight') : t('themeDark')}</span>
            </button>
          </div>

          {/* Footer Silk Road Badge */}
          <div className="pt-3 border-t border-inherit shrink-0">
            <div className={`p-3 rounded-2xl border text-start ${
              isDark
                ? 'bg-gradient-to-br from-cyan-950/40 via-blue-950/20 to-purple-950/40 border-cyan-800/40'
                : 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border-cyan-200'
            }`}>
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-bold">
                {lang === 'uz' ? 'Maxsus nashr' : lang === 'ru' ? 'Специальный выпуск' : lang === 'ar' ? 'إصدار خاص' : 'Special Edition'}
              </span>
              <p className={`text-xs font-bold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {t('silkRoadSpotlightTitle')}
              </p>
              <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Samarkand · Bukhara · Khiva
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
