import React, { useState, useEffect } from 'react';
import { historicalJourneysData } from '../data/journeyData';
import { HistoricalJourney, JourneyHotspot, Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Compass,
  Volume2,
  VolumeX,
  BookOpen,
  Info,
  CheckCircle,
  AlertCircle,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface HistoricalJourneyViewProps {
  initialJourneyId?: string;
  lang: Language;
  theme: ThemeMode;
}

export const HistoricalJourneyView: React.FC<HistoricalJourneyViewProps> = ({
  initialJourneyId = 'samarkand_registan',
  lang,
  theme,
}) => {
  const [selectedJourney, setSelectedJourney] = useState<HistoricalJourney>(() => {
    return historicalJourneysData.find(j => j.id === initialJourneyId) || historicalJourneysData[0];
  });

  const [activeHotspot, setActiveHotspot] = useState<JourneyHotspot | null>(
    selectedJourney.hotspots[0] || null
  );

  const [isGuidedMode, setIsGuidedMode] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  useEffect(() => {
    const found = historicalJourneysData.find(j => j.id === initialJourneyId);
    if (found) {
      setSelectedJourney(found);
      setActiveHotspot(found.hotspots[0] || null);
    }
  }, [initialJourneyId]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedJourney.audioNarrationText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="space-y-6 pb-16 text-start">
      {/* Header & Journey Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
            <Compass className="w-4 h-4" />
            <span>{t('navJourneys')}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {selectedJourney.title}
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {selectedJourney.location}, {selectedJourney.country} · {selectedJourney.era} ({selectedJourney.approxDate})
          </p>
        </div>

        {/* Site Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {historicalJourneysData.map(j => (
            <button
              key={j.id}
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsSpeaking(false);
                setSelectedJourney(j);
                setActiveHotspot(j.hotspots[0] || null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedJourney.id === j.id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
                  : 'bg-white text-slate-700 hover:text-slate-900 border-slate-300'
              }`}
            >
              {j.title.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Controls Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border shadow-xs ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGuidedMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isGuidedMode
                ? isDark
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-800/60'
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-300'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t('guidedTour')}
          </button>
          <button
            onClick={() => setIsGuidedMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !isGuidedMode
                ? isDark
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-800/60'
                  : 'bg-cyan-50 text-cyan-800 border border-cyan-300'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t('freeExploration')}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Narration Toggle */}
          <button
            onClick={toggleSpeech}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              isSpeaking
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse font-bold'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:text-slate-900'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-500" />}
            <span>{isSpeaking ? t('stopNarration') : t('startNarration')}</span>
          </button>

          {/* Sources trigger */}
          <button
            onClick={() => setShowSources(!showSources)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('sourcesReferences')}</span>
          </button>
        </div>
      </div>

      {/* Panoramic Reconstructed Viewport with Hotspots */}
      <div className={`relative rounded-3xl overflow-hidden border shadow-2xl aspect-[16/9] max-h-[580px] w-full ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-300'
      }`}>
        <img
          src={selectedJourney.image}
          alt={selectedJourney.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

        {/* Interactive Hotspot Pins */}
        {selectedJourney.hotspots.map(spot => {
          const isActive = activeHotspot?.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(spot)}
              style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              title={spot.title}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`absolute w-8 h-8 rounded-full transition-all ${
                    isActive
                      ? 'bg-cyan-400/40 animate-ping'
                      : 'bg-white/20 group-hover:bg-cyan-400/30'
                  }`}
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform ${
                    isActive
                      ? 'bg-cyan-500 border-white scale-125'
                      : 'bg-slate-950/80 border-cyan-400 text-cyan-400 group-hover:scale-110'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </button>
          );
        })}

        {/* Floating Top Banner Notice */}
        <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} z-20`}>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] text-cyan-300 font-mono font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Hotspots Active</span>
          </div>
        </div>
      </div>

      {/* Hotspot Data Card & Narration Text */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hotspot Inspector */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 shadow-sm ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {activeHotspot ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-inherit">
                <div>
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-bold">
                    {t('hotspotAnnotation')}
                  </span>
                  <h3 className={`text-lg font-bold font-display mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {activeHotspot.title}
                  </h3>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{activeHotspot.subtitle}</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                  <Info className="w-4 h-4" />
                </div>
              </div>

              <p className={`mt-3 text-xs leading-relaxed p-4 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {activeHotspot.details}
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className="text-[10px] uppercase font-mono text-amber-500 block font-bold">{t('architecturalNote')}</span>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{activeHotspot.architecturalNote}</p>
                </div>

                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className="text-[10px] uppercase font-mono text-purple-500 block font-bold">{t('archaeologicalSource')}</span>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{activeHotspot.archaeologicalSource}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              Click any pin on the panorama to examine architectural details.
            </div>
          )}

          {/* Guided Narration Transcript */}
          <div className="pt-4 border-t border-inherit">
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block font-bold mb-1">
              {t('docentNarration')}
            </span>
            <p className={`text-xs italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              "{selectedJourney.audioNarrationText}"
            </p>
          </div>
        </div>

        {/* Verified Facts & Speculative Notice */}
        <div className="space-y-4">
          <div className={`p-6 rounded-3xl border space-y-3 shadow-sm ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Verified Historical Facts</span>
            </h4>

            <div className="space-y-2">
              {selectedJourney.verifiedFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {fact}
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-2xl border text-[11px] space-y-1.5 ${
            isDark ? 'bg-slate-950/90 border-amber-900/40 text-slate-400' : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-500">
              <AlertCircle className="w-4 h-4" />
              <span>{t('speculativeNotice')}</span>
            </div>
            <p className="leading-tight">{selectedJourney.speculativeNotice}</p>
          </div>
        </div>
      </div>

      {/* Sources Modal Drawer */}
      {showSources && (
        <div className={`p-6 rounded-3xl border shadow-2xl space-y-3 animate-fadeIn ${
          isDark ? 'bg-slate-900 border-cyan-500/30' : 'bg-white border-cyan-300'
        }`}>
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-bold font-display flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>{t('sourcesReferences')}</span>
            </h4>
            <button
              onClick={() => setShowSources(false)}
              className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              {t('close')}
            </button>
          </div>
          <ul className={`space-y-1.5 list-disc list-inside text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {selectedJourney.historicalSources.map((src, idx) => (
              <li key={idx}>{src}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
