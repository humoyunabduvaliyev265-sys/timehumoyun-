import React, { useState } from 'react';
import { historicalErasData } from '../data/timeMachineData';
import { HistoricalEra, Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Clock,
  Compass,
  ArrowRight,
  Landmark,
  User,
  Calendar,
  AlertCircle,
  Zap,
} from 'lucide-react';

interface TimeMachineViewProps {
  onStartJourney: (journeyId: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const TimeMachineView: React.FC<TimeMachineViewProps> = ({
  onStartJourney,
  lang,
  theme,
}) => {
  const [selectedEra, setSelectedEra] = useState<HistoricalEra>(historicalErasData[2]); // Defaults to Silk Road Golden Age
  const [isWarping, setIsWarping] = useState(false);

  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  const handleEraSelect = (era: HistoricalEra) => {
    if (era.id === selectedEra.id) return;
    setIsWarping(true);
    setTimeout(() => {
      setSelectedEra(era);
      setIsWarping(false);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16 relative text-start">
      {/* Time Portal Warp Effect Overlay */}
      {isWarping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl transition-all">
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-4 border-cyan-400 border-t-purple-500 animate-spin flex items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.8)]" />
            <span className="mt-4 text-xs font-mono tracking-widest text-cyan-300 uppercase animate-pulse">
              {lang === 'uz' ? 'Vaqt koordinatalari sozlanmoqda...' : lang === 'ru' ? 'Синхронизация временных координат...' : lang === 'ar' ? 'جارٍ الانتقال عبر الزمن...' : 'Temporal Coordinates Recalibrating...'}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
            <Zap className="w-4 h-4" />
            <span>{t('navTimeMachine')}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('travelThroughTime')}
          </h2>
          <p className={`text-xs mt-1 max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('travelThroughTimeDesc')}
          </p>
        </div>

        {/* Selected Epoch Indicator */}
        <div className={`p-3 rounded-2xl border flex items-center gap-3 shadow-xs ${
          isDark ? 'bg-slate-900 border-cyan-500/30' : 'bg-white border-slate-300'
        }`}>
          <Clock className="w-5 h-5 text-cyan-500 shrink-0" />
          <div>
            <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('currentEpoch')}</span>
            <p className={`text-xs font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedEra.period}</p>
          </div>
        </div>
      </div>

      {/* Chronological Era Horizontal Bar */}
      <div className={`p-2 rounded-3xl border shadow-md overflow-x-auto no-scrollbar ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="flex items-center gap-2 min-w-max">
          {historicalErasData.map(era => {
            const isSelected = era.id === selectedEra.id;
            return (
              <button
                key={era.id}
                onClick={() => handleEraSelect(era)}
                className={`px-4 py-3 rounded-2xl text-start transition-all ${
                  isSelected
                    ? isDark
                      ? 'bg-gradient-to-r from-cyan-950 via-blue-950 to-indigo-950 border border-cyan-500/50 text-white shadow-md'
                      : 'bg-white border-2 border-cyan-500 text-slate-900 shadow-sm'
                    : isDark
                    ? 'bg-slate-950/60 hover:bg-slate-800/80 border border-white/5 text-slate-300'
                    : 'bg-slate-50 hover:bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold block ${
                  isSelected ? 'text-cyan-500' : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {era.period}
                </span>
                <p className="text-xs font-bold mt-0.5 truncate max-w-[190px]">
                  {era.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dedicated Silk Road Spotlight */}
      {selectedEra.silkRoadFocus && (
        <div className={`relative rounded-3xl overflow-hidden p-6 sm:p-8 border shadow-xl ${
          isDark
            ? 'bg-gradient-to-br from-cyan-950/70 via-slate-900 to-indigo-950/70 border-cyan-500/40 text-white'
            : 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border-cyan-200 text-slate-900'
        }`}>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-2 font-bold">
                <Compass className="w-4 h-4" />
                <span>{t('silkRoadSpotlightTitle')}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display mt-1">
                {t('silkRoadSpotlightTitle')}
              </h3>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {selectedEra.silkRoadFocus.uzbekistanHeritage}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{t('tradingOases')}</span>
                {selectedEra.silkRoadFocus.cities.map(c => (
                  <span
                    key={c}
                    className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-semibold ${
                      isDark
                        ? 'bg-slate-900/80 border-cyan-800/40 text-slate-200'
                        : 'bg-white border-cyan-200 text-slate-800 shadow-2xs'
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-2">
              <button
                onClick={() => onStartJourney('samarkand_registan')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <span>{t('startSilkRoadTour')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Era Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Era Context & Key Events */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 shadow-xs ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
                {t('selectEra')} · {selectedEra.period}
              </span>
              <h3 className={`text-xl font-bold font-display mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {selectedEra.name}
              </h3>
              <p className={`text-xs italic mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>"{selectedEra.tagline}"</p>
            </div>

            <p className={`text-xs leading-relaxed p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              {selectedEra.overview}
            </p>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-2 ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
                {t('culturalHeritage')}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedEra.culturalContext}
              </p>
            </div>
          </div>

          {/* Key Events Timeline */}
          <div className={`p-6 rounded-3xl border space-y-4 shadow-xs ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{t('keyEvents')}</span>
            </h4>

            <div className="space-y-3">
              {selectedEra.keyEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`px-2 py-1 rounded font-mono text-xs font-bold shrink-0 border ${
                    isDark
                      ? 'bg-cyan-950 text-cyan-400 border-cyan-800/40'
                      : 'bg-cyan-100 text-cyan-800 border-cyan-200'
                  }`}>
                    {evt.year}
                  </span>
                  <div>
                    <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{evt.title}</h5>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Figures, Architecture & Disclaimers */}
        <div className="space-y-6">
          {/* Historical Figures */}
          <div className={`p-6 rounded-3xl border space-y-4 shadow-xs ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{t('historicalFigures')}</span>
            </h4>

            <div className="space-y-3">
              {selectedEra.historicalFigures.map((fig, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{fig.name}</h5>
                    <span className="text-[10px] text-amber-500 font-mono font-semibold">{fig.role}</span>
                  </div>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {fig.contribution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div className={`p-6 rounded-3xl border space-y-4 shadow-xs ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-500 font-mono flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              <span>{t('architecture')}</span>
            </h4>

            <div className="space-y-3">
              {selectedEra.notableArchitecture.map((arch, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{arch.name}</h5>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{arch.location}</span>
                  </div>
                  <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimers & Epistemology */}
          <div className={`p-4 rounded-2xl border text-[11px] space-y-2 ${
            isDark
              ? 'bg-slate-950/90 border-slate-800 text-slate-400'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Veracity Standards</span>
            </div>
            <p className="leading-tight">{selectedEra.disclaimer}</p>
            <p className="leading-tight">{t('speculativeNotice')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
