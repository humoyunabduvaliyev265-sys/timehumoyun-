import React, { useState, useRef, useEffect } from 'react';
import { Language, ThemeMode } from '../../types';
import { translations, getTranslation } from '../../data/i18n';
import { Search, Globe, Sun, Moon, Compass, Menu, Check } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  onOpenSearch,
  onToggleSidebar,
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: 'O‘zbekcha', flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  const currentLangOption = languageOptions.find(l => l.code === lang) || languageOptions[0];

  const primaryNavItems = [
    { id: 'home', label: t('navHome') },
    { id: 'globe', label: t('navGlobe') },
    { id: 'explorer', label: t('navExplorer') },
    { id: 'timeMachine', label: t('navTimeMachine') },
    { id: 'journeys', label: t('navJourneys') },
    { id: 'future', label: t('navFuture') },
  ];

  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-200 border-b ${
        isDark
          ? 'bg-slate-950/90 border-slate-800/90 text-slate-100 shadow-md'
          : 'bg-white/95 border-slate-200 text-slate-800 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark & mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-xl transition-colors lg:hidden ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="text-start group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-base sm:text-lg tracking-wider whitespace-nowrap ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                EARTH 360 AI
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-500 -mt-1 hidden sm:block">
                TIME MACHINE
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold">
          {primaryNavItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`py-1 transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-500 font-bold border-b-2 border-cyan-500'
                    : isDark
                    ? 'text-slate-300 hover:text-cyan-400'
                    : 'text-slate-600 hover:text-cyan-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search, Language, Theme) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/50'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-cyan-500'
            }`}
            title="Global Search (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-500" />
            <span className="hidden sm:inline">{t('quickSearch')}</span>
            <kbd className={`hidden md:inline font-mono text-[10px] px-1.5 py-0.5 rounded border ${
              isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-500 border-slate-300'
            }`}>
              ⌘K
            </kbd>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-200'
              }`}
              aria-label="Select Language"
              aria-expanded={isLangMenuOpen}
            >
              <span className="text-base">{currentLangOption.flag}</span>
              <span className="hidden sm:inline font-semibold">{currentLangOption.label}</span>
              <span className="sm:hidden font-mono uppercase font-bold">{currentLangOption.code}</span>
            </button>

            {isLangMenuOpen && (
              <div
                className={`absolute top-full mt-2 w-44 py-1.5 rounded-2xl border shadow-2xl z-50 animate-fadeIn ${
                  lang === 'ar' ? 'left-0' : 'right-0'
                } ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
                    : 'bg-white border-slate-200 text-slate-800 shadow-[0_10px_35px_rgba(0,0,0,0.12)]'
                }`}
              >
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-inherit">
                  {t('language')}
                </div>
                {languageOptions.map(option => {
                  const isSelected = lang === option.code;
                  return (
                    <button
                      key={option.code}
                      onClick={() => {
                        onLanguageChange(option.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? isDark
                            ? 'bg-cyan-950/60 text-cyan-300 font-bold'
                            : 'bg-cyan-50 text-cyan-700 font-bold'
                          : isDark
                          ? 'hover:bg-slate-800 text-slate-300'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{option.flag}</span>
                        <span>{option.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title={isDark ? t('themeLight') : t('themeDark')}
            aria-label="Toggle Light and Dark Mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
