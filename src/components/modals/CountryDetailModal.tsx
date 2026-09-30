import React from 'react';
import { CountryData, Language, ThemeMode } from '../../types';
import { getTranslation } from '../../data/i18n';
import { X, Bookmark, Globe, Compass, Check, AlertCircle } from 'lucide-react';

interface CountryDetailModalProps {
  country: CountryData | null;
  onClose: () => void;
  onFocusOnGlobe?: (coords: { lat: number; lng: number }) => void;
  onStartJourney?: (journeyId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (countryCode: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  country,
  onClose,
  onFocusOnGlobe,
  onStartJourney,
  isFavorite,
  onToggleFavorite,
  lang,
  theme,
}) => {
  if (!country) return null;
  const isDark = theme === 'dark';
  const t = (key: any) => getTranslation(lang, key);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header Bar */}
        <div className={`relative p-6 border-b ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-slate-50 via-sky-50 to-slate-50 border-slate-200'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl shadow-sm">{country.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>{country.name}</h2>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    isDark
                      ? 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60'
                      : 'text-cyan-800 bg-cyan-50 border-cyan-200 font-bold'
                  }`}>
                    {country.code}
                  </span>
                </div>
                {country.nativeName && (
                  <p className={`text-xs mt-0.5 italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{country.nativeName}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(country.code)}
                className={`p-2 rounded-xl border transition-colors ${
                  isFavorite
                    ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-600 border-slate-300 hover:text-slate-900'
                }`}
                title={isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-800 text-slate-400 hover:text-white border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-start">
          {/* Key Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('capitalCity')}</span>
              <p className={`text-xs font-semibold mt-0.5 truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{country.capital}</p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('population')}</span>
              <p className={`text-xs font-mono font-semibold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {country.population.toLocaleString()}
              </p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('area')}</span>
              <p className={`text-xs font-mono font-semibold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {country.areaKm2.toLocaleString()} km²
              </p>
            </div>

            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('region')}</span>
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5 truncate">{country.region}</p>
            </div>
          </div>

          {/* Languages & Currency */}
          <div className={`flex flex-wrap items-center gap-4 text-xs p-3 rounded-2xl border ${
            isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div>
              <span className={`text-[11px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('languages')}</span>
              <span className="font-semibold">{country.languages.join(', ')}</span>
            </div>
            <div className={`h-6 w-px hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
            <div>
              <span className={`text-[11px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('currencyLabel')}</span>
              <span className="font-semibold">{country.currency}</span>
            </div>
          </div>

          {/* Geographic Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono mb-1.5">
              {t('geographyOverview')}
            </h4>
            <p className={`text-xs leading-relaxed p-3.5 rounded-2xl border ${
              isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              {country.overview}
            </p>
          </div>

          {/* Geographic Highlights */}
          <div>
            <span className={`text-xs font-mono uppercase tracking-wider block mb-2 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {t('naturalBiomesLabel')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {country.geographicHighlights.map((gh, i) => (
                <div key={i} className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{gh}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Significance */}
          <div className={`p-4 rounded-2xl border ${
            isDark
              ? 'bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950 border-indigo-900/40'
              : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-50 border-indigo-200'
          }`}>
            <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block font-bold">
              {t('historicalSignificanceTitle')}
            </span>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {country.historicalHighlight}
            </p>
          </div>

          {/* Statistical Disclaimer */}
          <div className={`flex items-start gap-2.5 p-3 rounded-xl border text-[11px] ${
            isDark ? 'bg-slate-950/80 border-amber-900/30 text-slate-400' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-tight">{t('verifiedDataNote')}</p>
          </div>
        </div>

        {/* Action Footer */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-end gap-3 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {country.code === 'UZ' && (
            <button
              onClick={() => {
                onStartJourney?.('samarkand_registan');
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('exploreSilkRoadTour')}</span>
            </button>
          )}

          <button
            onClick={() => {
              onFocusOnGlobe?.(country.coordinates);
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 border ${
              isDark
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border-slate-700'
                : 'bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-300 shadow-xs'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t('centerCameraOnGlobe')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
