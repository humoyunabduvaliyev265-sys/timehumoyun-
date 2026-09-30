import React from 'react';
import { countriesData, landmarksData } from '../data/earthData';
import { Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import { Bookmark, Landmark as LandmarkIcon, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCountry: (countryCode: string) => void;
  onSelectLandmark: (landmarkId: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteIds,
  onToggleFavorite,
  onSelectCountry,
  onSelectLandmark,
  lang,
  theme,
}) => {
  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  const favoriteCountries = countriesData.filter(c => favoriteIds.includes(c.code));
  const favoriteLandmarks = landmarksData.filter(l => favoriteIds.includes(l.id));

  const totalFavorites = favoriteCountries.length + favoriteLandmarks.length;

  return (
    <div className="space-y-8 pb-16 text-start">
      <div>
        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
          <Bookmark className="w-4 h-4" />
          <span>{t('navFavorites')}</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t('mySavedPlaces')} ({totalFavorites})
        </h2>
        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t('savedPlacesDesc')}
        </p>
      </div>

      {totalFavorites === 0 ? (
        <div className={`p-12 text-center rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <Bookmark className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('noBookmarks')}</h3>
          <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('noBookmarksDesc')}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {favoriteCountries.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block font-bold">
                {t('savedCountries')} ({favoriteCountries.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteCountries.map(c => (
                  <div
                    key={c.code}
                    className={`p-5 rounded-2xl border flex items-start justify-between ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{c.flag}</span>
                      <div>
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.name}</h4>
                        <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {t('capitalCity')}: {c.capital}
                        </span>
                        <div className="mt-2">
                          <button
                            onClick={() => onSelectCountry(c.code)}
                            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <span>{t('viewProfile')}</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(c.code)}
                      className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                      title={t('removeBookmark')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {favoriteLandmarks.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500 block font-bold">
                {t('savedLandmarks')} ({favoriteLandmarks.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteLandmarks.map(l => (
                  <div
                    key={l.id}
                    className={`p-5 rounded-2xl border flex items-start justify-between ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                        <LandmarkIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{l.name}</h4>
                        <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{l.country}</span>
                        <div className="mt-2">
                          <button
                            onClick={() => onSelectLandmark(l.id)}
                            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <span>{t('inspectLandmark')}</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(l.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                      title={t('removeBookmark')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
