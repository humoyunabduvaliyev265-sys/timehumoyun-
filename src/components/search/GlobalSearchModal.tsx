import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Globe, Landmark, Clock, Sparkles, Rocket } from 'lucide-react';
import { countriesData, landmarksData } from '../../data/earthData';
import { historicalErasData } from '../../data/timeMachineData';
import { futureCitiesData } from '../../data/futureData';
import { celestialBodiesData } from '../../data/spaceData';
import { Language, ThemeMode } from '../../types';
import { getTranslation } from '../../data/i18n';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (countryCode: string) => void;
  onSelectLandmark: (landmarkId: string) => void;
  onSelectEra: (eraId: string) => void;
  onSelectCity: (cityId: string) => void;
  onSelectSpace: (bodyId: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  onSelectLandmark,
  onSelectEra,
  onSelectCity,
  onSelectSpace,
  lang,
  theme,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('earth360_recent_searches');
      return saved ? JSON.parse(saved) : ['Uzbekistan', 'Samarkand', 'Giza', 'Rome', '2100'];
    } catch {
      return ['Uzbekistan', 'Samarkand', 'Giza', 'Rome'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === 'dark';
  const t = (key: any) => getTranslation(lang, key);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const addRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('earth360_recent_searches', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedCountries = countriesData.filter(
      c => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
    );

    const matchedLandmarks = landmarksData.filter(
      l => l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
    );

    const matchedEras = historicalErasData.filter(
      e => e.name.toLowerCase().includes(q) || e.period.toLowerCase().includes(q) || e.tagline.toLowerCase().includes(q)
    );

    const matchedCities = futureCitiesData.filter(
      c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.conceptSummary.toLowerCase().includes(q)
    );

    const matchedSpace = celestialBodiesData.filter(
      s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );

    return {
      countries: matchedCountries,
      landmarks: matchedLandmarks,
      eras: matchedEras,
      cities: matchedCities,
      space: matchedSpace,
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Search Input Bar */}
        <div className={`p-4 border-b flex items-center gap-3 ${
          isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'
        }`}>
          <Search className="w-5 h-5 text-cyan-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`w-full bg-transparent text-sm focus:outline-none ${
              isDark ? 'text-slate-100 placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                isDark ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-200'
              }`}
            >
              {t('clear')}
            </button>
          )}
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-start">
          {!query.trim() ? (
            <div>
              <span className={`text-[11px] font-mono uppercase tracking-wider block mb-2 font-bold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {t('recentSearches')}
              </span>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(item => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 hover:bg-cyan-950/80 hover:text-cyan-300 text-slate-300 border-slate-700'
                        : 'bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={`mt-6 pt-4 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-3 font-bold">
                  {t('silkRoadFastTrack')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      addRecentSearch('Uzbekistan');
                      onSelectCountry('UZ');
                      onClose();
                    }}
                    className={`p-3 text-start rounded-xl border transition-all flex items-center gap-3 ${
                      isDark
                        ? 'bg-slate-950/60 border-cyan-900/40 hover:border-cyan-400/50 hover:bg-cyan-950/30'
                        : 'bg-slate-50 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50'
                    }`}
                  >
                    <span className="text-xl">🇺🇿</span>
                    <div>
                      <p className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Uzbekistan</p>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Heart of the Silk Road</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      addRecentSearch('Registan Square');
                      onSelectLandmark('registan_samarkand');
                      onClose();
                    }}
                    className={`p-3 text-start rounded-xl border transition-all flex items-center gap-3 ${
                      isDark
                        ? 'bg-slate-950/60 border-purple-900/40 hover:border-purple-400/50 hover:bg-purple-950/30'
                        : 'bg-slate-50 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <Landmark className="w-5 h-5 text-purple-500 shrink-0" />
                    <div>
                      <p className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Registan Square</p>
                      <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Samarkand, Uzbekistan</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {results &&
              results.countries.length === 0 &&
              results.landmarks.length === 0 &&
              results.eras.length === 0 &&
              results.cities.length === 0 &&
              results.space.length === 0 ? (
                <div className={`py-8 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t('noSearchResults')}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Countries */}
                  {results && results.countries.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-2 font-bold">
                        {t('countries')} ({results.countries.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.countries.map(c => (
                          <button
                            key={c.code}
                            onClick={() => {
                              addRecentSearch(c.name);
                              onSelectCountry(c.code);
                              onClose();
                            }}
                            className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-colors ${
                              isDark
                                ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{c.flag}</span>
                              <div>
                                <span className={`text-xs font-semibold block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{c.name}</span>
                                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {t('capitalCity')}: {c.capital} · {c.region}
                                </span>
                              </div>
                            </div>
                            <Globe className="w-4 h-4 text-cyan-500 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Landmarks */}
                  {results && results.landmarks.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-2 font-bold">
                        {t('landmarks')} ({results.landmarks.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.landmarks.map(l => (
                          <button
                            key={l.id}
                            onClick={() => {
                              addRecentSearch(l.name);
                              onSelectLandmark(l.id);
                              onClose();
                            }}
                            className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-colors ${
                              isDark
                                ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Landmark className="w-4 h-4 text-amber-500 shrink-0" />
                              <div>
                                <span className={`text-xs font-semibold block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{l.name}</span>
                                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {l.country} · {l.era}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">{t('viewProfile')}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Eras */}
                  {results && results.eras.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2 font-bold">
                        {t('navTimeMachine')} ({results.eras.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.eras.map(e => (
                          <button
                            key={e.id}
                            onClick={() => {
                              addRecentSearch(e.name);
                              onSelectEra(e.id);
                              onClose();
                            }}
                            className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-colors ${
                              isDark
                                ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                              <div>
                                <span className={`text-xs font-semibold block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{e.name}</span>
                                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{e.period}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">Jump</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Future Cities */}
                  {results && results.cities.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2 font-bold">
                        {t('navFuture')} ({results.cities.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.cities.map(c => (
                          <button
                            key={c.id}
                            onClick={() => {
                              addRecentSearch(c.name);
                              onSelectCity(c.id);
                              onClose();
                            }}
                            className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-colors ${
                              isDark
                                ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                              <div>
                                <span className={`text-xs font-semibold block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{c.name}</span>
                                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.country}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Simulate</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Space / Planets */}
                  {results && results.space.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-2 font-bold">
                        {t('navSpace')} ({results.space.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.space.map(s => (
                          <button
                            key={s.id}
                            onClick={() => {
                              addRecentSearch(s.name);
                              onSelectSpace(s.id);
                              onClose();
                            }}
                            className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-colors ${
                              isDark
                                ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Rocket className="w-4 h-4 text-sky-500 shrink-0" />
                              <div>
                                <span className={`text-xs font-semibold block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{s.name}</span>
                                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.type}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold">Planetarium</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className={`p-3 border-t text-[11px] flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <span>{t('searchDbInfo')}</span>
          <kbd className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${
            isDark ? 'bg-slate-900 text-slate-400 border-slate-700' : 'bg-white text-slate-600 border-slate-300'
          }`}>
            {t('pressEscToClose')}
          </kbd>
        </div>
      </div>
    </div>
  );
};
