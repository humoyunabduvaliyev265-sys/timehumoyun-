import React from 'react';
import { Landmark, Language, ThemeMode } from '../../types';
import { getTranslation } from '../../data/i18n';
import { X, Bookmark, Globe, Landmark as LandmarkIcon, Check, Compass } from 'lucide-react';

interface LandmarkDetailModalProps {
  landmark: Landmark | null;
  onClose: () => void;
  onFocusOnGlobe?: (coords: { lat: number; lng: number }) => void;
  onStartJourney?: (journeyId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (landmarkId: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const LandmarkDetailModal: React.FC<LandmarkDetailModalProps> = ({
  landmark,
  onClose,
  onFocusOnGlobe,
  onStartJourney,
  isFavorite,
  onToggleFavorite,
  lang,
  theme,
}) => {
  if (!landmark) return null;
  const isDark = theme === 'dark';
  const t = (key: any) => getTranslation(lang, key);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b flex items-start justify-between ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-slate-50 via-amber-50 to-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${
              isDark
                ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                : 'bg-amber-100 border-amber-300 text-amber-700'
            }`}>
              <LandmarkIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>{landmark.name}</h2>
              <div className={`flex items-center gap-2 mt-0.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>{landmark.country}</span>
                <span>·</span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{landmark.era}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(landmark.id)}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-start">
          <div>
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1 font-bold">
              {t('architecturalSynthesis')}
            </span>
            <p className={`text-xs leading-relaxed p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              {landmark.description}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-2 font-bold">
              {t('archaeologicalFacts')}
            </span>
            <div className="space-y-2">
              {landmark.facts.map((fact, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${
            isDark
              ? 'bg-gradient-to-br from-purple-950/30 to-slate-950 border-purple-900/30'
              : 'bg-gradient-to-br from-purple-50 to-slate-50 border-purple-200'
          }`}>
            <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block font-bold">
              {t('historicalSignificanceTitle')}
            </span>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {landmark.historicalSignificance}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-end gap-3 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {landmark.id === 'registan_samarkand' && (
            <button
              onClick={() => {
                onStartJourney?.('samarkand_registan');
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t('enterRegistanTour')}</span>
            </button>
          )}

          <button
            onClick={() => {
              onFocusOnGlobe?.(landmark.coordinates);
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 border ${
              isDark
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border-slate-700'
                : 'bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 border-slate-300 shadow-xs'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t('locateOn3DGlobe')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
