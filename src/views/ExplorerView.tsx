import React, { useState } from 'react';
import { countriesData, landmarksData, geographicFeatures } from '../data/earthData';
import { Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Search,
  Globe,
  Landmark as LandmarkIcon,
  Mountain,
  Compass,
  Bookmark,
  MapPin,
} from 'lucide-react';

interface ExplorerViewProps {
  onSelectCountry: (countryCode: string) => void;
  onSelectLandmark: (landmarkId: string) => void;
  onNavigateToGlobeWithCoords: (coords: { lat: number; lng: number }) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  lang: Language;
  theme: ThemeMode;
}

type FilterCategory = 'all' | 'countries' | 'landmarks' | 'mountains' | 'rivers' | 'deserts' | 'oceans';

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  onSelectCountry,
  onSelectLandmark,
  onNavigateToGlobeWithCoords,
  favorites,
  onToggleFavorite,
  lang,
  theme,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  const categories: { id: FilterCategory; labelKey: keyof typeof translations['en'] }[] = [
    { id: 'all', labelKey: 'allPlaces' },
    { id: 'countries', labelKey: 'countries' },
    { id: 'landmarks', labelKey: 'landmarks' },
    { id: 'mountains', labelKey: 'mountains' },
    { id: 'rivers', labelKey: 'rivers' },
    { id: 'deserts', labelKey: 'deserts' },
    { id: 'oceans', labelKey: 'oceans' },
  ];

  const q = searchQuery.toLowerCase();

  const filteredCountries = (activeCategory === 'all' || activeCategory === 'countries')
    ? countriesData.filter(c => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
    : [];

  const filteredLandmarks = (activeCategory === 'all' || activeCategory === 'landmarks')
    ? landmarksData.filter(l => l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q) || l.description.toLowerCase().includes(q))
    : [];

  const filteredFeatures = geographicFeatures.filter(f => {
    if (activeCategory !== 'all') {
      if (activeCategory === 'mountains' && f.type !== 'mountain') return false;
      if (activeCategory === 'rivers' && f.type !== 'river') return false;
      if (activeCategory === 'deserts' && f.type !== 'desert') return false;
      if (activeCategory === 'oceans' && f.type !== 'ocean') return false;
    }
    return f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.region.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start">
        <div>
          <h2 className={`text-2xl font-bold font-display flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Compass className="w-6 h-6 text-cyan-500" />
            <span>{t('navExplorer')}</span>
          </h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('exploreEarthDesc')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 ${
            lang === 'ar' ? 'right-3' : 'left-3'
          } text-slate-400`} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchCountries')}
            className={`w-full py-2 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-colors ${
              lang === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'
            } ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className={`flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl border no-scrollbar ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                : isDark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* Countries Section */}
      {filteredCountries.length > 0 && (
        <section className="space-y-4 text-start">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-500" />
            <h3 className={`text-sm font-bold font-display uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              {t('countries')} ({filteredCountries.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.map(c => {
              const isFav = favorites.includes(c.code);
              return (
                <div
                  key={c.code}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40'
                      : 'bg-white border-slate-200 hover:border-cyan-500 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.name}</h4>
                          <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t('capitalCity')}: {c.capital} · {c.region}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleFavorite(c.code)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav
                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                            : isDark
                            ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                            : 'bg-slate-100 text-slate-500 border-slate-300 hover:text-slate-900'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className={`mt-3 text-xs line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {c.overview}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between">
                    <button
                      onClick={() => onSelectCountry(c.code)}
                      className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      {t('viewProfile')}
                    </button>
                    <button
                      onClick={() => onNavigateToGlobeWithCoords(c.coordinates)}
                      className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 border transition-colors ${
                        isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-300'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-cyan-500" />
                      <span>{t('focusGlobe')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Landmarks Section */}
      {filteredLandmarks.length > 0 && (
        <section className="space-y-4 text-start">
          <div className="flex items-center gap-2">
            <LandmarkIcon className="w-4 h-4 text-amber-500" />
            <h3 className={`text-sm font-bold font-display uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              {t('landmarks')} ({filteredLandmarks.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLandmarks.map(l => {
              const isFav = favorites.includes(l.id);
              return (
                <div
                  key={l.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40'
                      : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{l.name}</h4>
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-semibold">
                          {l.country} · {l.era}
                        </span>
                      </div>
                      <button
                        onClick={() => onToggleFavorite(l.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav
                            ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                            : isDark
                            ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                            : 'bg-slate-100 text-slate-500 border-slate-300 hover:text-slate-900'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className={`mt-3 text-xs line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {l.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between">
                    <button
                      onClick={() => onSelectLandmark(l.id)}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      {t('inspectLandmark')}
                    </button>
                    <button
                      onClick={() => onNavigateToGlobeWithCoords(l.coordinates)}
                      className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 border transition-colors ${
                        isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-300'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{t('focusGlobe')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Physical Geographic Formations */}
      {filteredFeatures.length > 0 && (
        <section className="space-y-4 text-start">
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-emerald-500" />
            <h3 className={`text-sm font-bold font-display uppercase tracking-wider ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              {t('naturalBiomes')} ({filteredFeatures.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeatures.map(f => (
              <div
                key={f.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/40'
                    : 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.name}</h4>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold capitalize">
                        {f.type} · {f.region}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      {f.scaleMetric}
                    </span>
                  </div>

                  <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {f.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-end">
                  <button
                    onClick={() => onNavigateToGlobeWithCoords(f.coordinates)}
                    className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 border transition-colors ${
                      isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-300'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{t('focusGlobe')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
