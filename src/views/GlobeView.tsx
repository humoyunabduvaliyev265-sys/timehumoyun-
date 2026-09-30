import React, { useState } from 'react';
import { Globe3D } from '../components/3d/Globe3D';
import { countriesData } from '../data/earthData';
import { Coordinates, CountryData, GlobeQuality, Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Globe,
  Map,
  Compass,
  Bookmark,
  Check,
  AlertCircle,
} from 'lucide-react';

interface GlobeViewProps {
  onSelectCountry: (countryCode: string) => void;
  onSelectLandmark: (landmarkId: string) => void;
  onStartJourney: (journeyId: string) => void;
  favorites: string[];
  onToggleFavorite: (countryCode: string) => void;
  lang: Language;
  theme: ThemeMode;
  globeQuality: GlobeQuality;
}

export const GlobeView: React.FC<GlobeViewProps> = ({
  onSelectCountry,
  onSelectLandmark,
  onStartJourney,
  favorites,
  onToggleFavorite,
  lang,
  theme,
  globeQuality,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(countriesData[0]); // Defaults to Uzbekistan
  const [targetCoords, setTargetCoords] = useState<Coordinates | null>(null);
  const [is2DMode, setIs2DMode] = useState(false);

  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  const handleCountryPick = (country: CountryData) => {
    setSelectedCountry(country);
    setTargetCoords(country.coordinates);
    onSelectCountry(country.code);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="text-start">
          <h2 className={`text-xl font-bold font-display flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Globe className="w-5 h-5 text-cyan-500" />
            <span>{t('navGlobe')}</span>
          </h2>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('exploreEarthDesc')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 2D / 3D Mode Toggle */}
          <button
            onClick={() => setIs2DMode(!is2DMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-xs ${
              is2DMode
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40'
                : isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:text-slate-900'
            }`}
          >
            {is2DMode ? <Globe className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
            <span>{is2DMode ? t('view3DGlobe') : t('view2DMap')}</span>
          </button>
        </div>
      </div>

      {/* Main Layout: 3D Globe + Country Explorer Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Globe Viewport */}
        <div className={`lg:col-span-2 relative rounded-3xl overflow-hidden border shadow-xl ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <Globe3D
            targetCoordinates={targetCoords}
            onSelectCountry={code => {
              const found = countriesData.find(c => c.code === code);
              if (found) setSelectedCountry(found);
              onSelectCountry(code);
            }}
            onSelectLandmark={onSelectLandmark}
            theme={theme}
            quality={globeQuality}
            lang={lang}
            heightClass="h-[480px] sm:h-[620px] w-full"
            is2DMode={is2DMode}
          />

          {/* Quick country switcher slider */}
          <div className={`absolute bottom-4 left-4 right-4 z-20 flex items-center gap-1.5 overflow-x-auto p-2 rounded-2xl backdrop-blur-md border shadow-lg no-scrollbar ${
            isDark ? 'bg-slate-950/80 border-white/10' : 'bg-white/90 border-slate-200'
          }`}>
            {countriesData.map(c => (
              <button
                key={c.code}
                onClick={() => handleCountryPick(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCountry.code === c.code
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : isDark
                    ? 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Country Data Panel */}
        <div className={`rounded-3xl p-6 border shadow-xl space-y-5 text-start ${
          isDark
            ? 'bg-slate-900/90 backdrop-blur-xl border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-start justify-between pb-4 border-b border-inherit">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedCountry.flag}</span>
              <div>
                <h3 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedCountry.name}
                </h3>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {selectedCountry.nativeName}
                </span>
              </div>
            </div>

            <button
              onClick={() => onToggleFavorite(selectedCountry.code)}
              className={`p-2 rounded-xl border transition-colors ${
                favorites.includes(selectedCountry.code)
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                  : isDark
                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  : 'bg-slate-100 text-slate-500 border-slate-300 hover:text-slate-900'
              }`}
              title="Bookmark Country"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('capitalCity')}</span>
              <p className={`text-xs font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{selectedCountry.capital}</p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('population')}</span>
              <p className={`text-xs font-mono font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {selectedCountry.population.toLocaleString()}
              </p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('area')}</span>
              <p className={`text-xs font-mono font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                {selectedCountry.areaKm2.toLocaleString()} km²
              </p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('region')}</span>
              <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-0.5 truncate">{selectedCountry.region}</p>
            </div>
          </div>

          {/* Geographic Overview */}
          <div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-bold mb-1">
              {t('geographyOverview')}
            </span>
            <p className={`text-xs leading-relaxed p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              {selectedCountry.overview}
            </p>
          </div>

          {/* Key Formations */}
          <div>
            <span className={`text-xs font-mono uppercase tracking-wider block mb-2 font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('naturalBiomes')}
            </span>
            <div className="space-y-1.5">
              {selectedCountry.geographicHighlights.map((gh, idx) => (
                <div key={idx} className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{gh}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Action for Uzbekistan */}
          {selectedCountry.code === 'UZ' && (
            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark
                ? 'bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border-cyan-800/40 text-slate-200'
                : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 text-slate-800'
            }`}>
              <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 block font-bold">
                {lang === 'uz' ? 'Tavsiya etilgan ekspeditsiya' : lang === 'ru' ? 'Рекомендуемый тур' : lang === 'ar' ? 'رحلة مميزة' : 'Featured Expedition'}
              </span>
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('silkRoadSpotlightTitle')}
              </h4>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {t('silkRoadSpotlightSubtitle')}
              </p>
              <button
                onClick={() => onStartJourney('samarkand_registan')}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Compass className="w-4 h-4" />
                <span>{t('startSilkRoadTour')}</span>
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <div className={`flex items-start gap-2 p-3 rounded-xl border text-[11px] ${
            isDark ? 'bg-slate-950/60 border-amber-900/40 text-slate-400' : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>{t('verifiedDataNote')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
