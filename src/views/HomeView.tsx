import React from 'react';
import { Globe3D } from '../components/3d/Globe3D';
import { Language, ThemeMode, GlobeQuality } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Globe,
  Clock,
  Sparkles,
  ArrowRight,
  Compass,
  MapPin,
  Search,
  BookOpen,
  Award,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onSelectCountry: (countryCode: string) => void;
  onSelectLandmark: (landmarkId: string) => void;
  onStartJourney: (journeyId: string) => void;
  onOpenSearch: () => void;
  lang: Language;
  theme: ThemeMode;
  globeQuality: GlobeQuality;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCountry,
  onSelectLandmark,
  onStartJourney,
  onOpenSearch,
  lang,
  theme,
  globeQuality,
}) => {
  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest mb-4 shadow-xs ${
            isDark
              ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
              : 'bg-cyan-50 border-cyan-300 text-cyan-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>{t('planetariumBadge')}</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            EARTH 360{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600">
              TIME MACHINE AI
            </span>
          </h1>

          <p className={`mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t('tagline')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('globe')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2 group"
            >
              <span>{t('startExploring')}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </button>

            <button
              onClick={onOpenSearch}
              className={`px-5 py-3 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-850'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-cyan-500 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Search className="w-4 h-4 text-cyan-500" />
              <span>{t('searchPlaceholder')}</span>
            </button>
          </div>
        </div>

        {/* Interactive 3D Earth Globe Showcase */}
        <div className="mt-8 max-w-5xl mx-auto px-4">
          <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${
            isDark
              ? 'border-cyan-500/20 bg-slate-950/70 shadow-[0_0_80px_rgba(14,165,233,0.15)]'
              : 'border-slate-200 bg-white/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
          }`}>
            <Globe3D
              onSelectCountry={onSelectCountry}
              onSelectLandmark={onSelectLandmark}
              theme={theme}
              quality={globeQuality}
              lang={lang}
              heightClass="h-[420px] sm:h-[540px] w-full"
            />

            {/* Quick interactive hint */}
            <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-20 pointer-events-none`}>
              <div className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-[11px] font-medium flex items-center gap-2 shadow-xs ${
                isDark
                  ? 'bg-slate-950/80 border-white/10 text-slate-300'
                  : 'bg-white/90 border-slate-200 text-slate-700'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span>{t('dragRotateHint')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Feature Cards */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Explore Earth */}
          <div
            onClick={() => onNavigate('explorer')}
            className={`group relative p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850/80 shadow-md'
                : 'bg-white border-slate-200 hover:border-cyan-500 hover:shadow-md shadow-xs'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold font-display transition-colors ${
                isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
              }`}>
                {t('exploreEarth')}
              </h3>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('exploreEarthDesc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>{t('navExplorer')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </div>
          </div>

          {/* Card 2: Travel Through Time */}
          <div
            onClick={() => onNavigate('timeMachine')}
            className={`group relative p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850/80 shadow-md'
                : 'bg-white border-slate-200 hover:border-amber-500 hover:shadow-md shadow-xs'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold font-display transition-colors ${
                isDark ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
              }`}>
                {t('travelThroughTime')}
              </h3>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('travelThroughTimeDesc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>{t('navTimeMachine')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </div>
          </div>

          {/* Card 3: Visit The Future */}
          <div
            onClick={() => onNavigate('future')}
            className={`group relative p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              isDark
                ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500/50 hover:bg-slate-850/80 shadow-md'
                : 'bg-white border-slate-200 hover:border-purple-500 hover:shadow-md shadow-xs'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold font-display transition-colors ${
                isDark ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-600'
              }`}>
                {t('visitFuture')}
              </h3>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t('visitFutureDesc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>{t('navFuture')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Silk Road & Uzbekistan Spotlight Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className={`relative rounded-3xl overflow-hidden border p-6 sm:p-10 shadow-xl ${
          isDark
            ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-cyan-500/30 text-white'
            : 'bg-gradient-to-r from-cyan-50 via-sky-50 to-indigo-50 border-cyan-200 text-slate-900'
        }`}>
          <div className="relative z-10 max-w-2xl text-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>{t('silkRoadSpotlightTitle')}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display mt-2">
              {t('silkRoadSpotlightTitle')}
            </h2>
            <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('silkRoadSpotlightSubtitle')}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartJourney('samarkand_registan')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
              >
                <span>{t('startSilkRoadTour')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                onClick={() => onSelectCountry('UZ')}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-colors ${
                  isDark
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-slate-100 border-slate-300 shadow-xs'
                }`}
              >
                <span>Uzbekistan 🇺🇿</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access to Quizzes and Academy */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-start">
            <h3 className={`text-lg font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('geoChallenge')} & {t('historyChallenge')}
            </h3>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('preferencesDesc')}
            </span>
          </div>
          <button
            onClick={() => onNavigate('geoQuiz')}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>{t('seeResults')}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => onNavigate('geoQuiz')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
                : 'bg-white border-slate-200 hover:border-cyan-400 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5 text-start">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('geoChallenge')}</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('naturalBiomes')}</p>
              </div>
            </div>
            <Award className="w-5 h-5 text-cyan-500" />
          </div>

          <div
            onClick={() => onNavigate('histQuiz')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5 text-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('historyChallenge')}</h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('culturalHeritage')}</p>
              </div>
            </div>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
        </div>
      </section>
    </div>
  );
};
