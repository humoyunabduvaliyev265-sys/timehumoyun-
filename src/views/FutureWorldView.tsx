import React, { useState } from 'react';
import { futureScenariosData, futureCitiesData } from '../data/futureData';
import { FutureCityConcept, Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Sparkles,
  Zap,
  Building2,
  Train,
  Wind,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

interface FutureWorldViewProps {
  lang: Language;
  theme: ThemeMode;
}

export const FutureWorldView: React.FC<FutureWorldViewProps> = ({ lang, theme }) => {
  const [targetYear, setTargetYear] = useState<number>(2100);
  const [selectedCity, setSelectedCity] = useState<FutureCityConcept>(futureCitiesData[0]);

  // Interactive Scenario Slider Modifiers
  const [cleanEnergyModifier, setCleanEnergyModifier] = useState<number>(92);
  const [urbanDensityModifier, setUrbanDensityModifier] = useState<number>(85);
  const [transitSpeedModifier, setTransitSpeedModifier] = useState<number>(90);
  const [carbonCaptureModifier, setCarbonCaptureModifier] = useState<number>(80);

  const isDark = theme === 'dark';
  const scenario = futureScenariosData[targetYear] || futureScenariosData[2100];
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  // Calculated speculative metrics based on sliders
  const calculatedEnergy = Math.min(100, Math.round((scenario.globalCleanEnergyPct * cleanEnergyModifier) / 95));
  const calculatedCarbon = Math.max(260, Math.round(scenario.atmosphericCarbonPpm - (carbonCaptureModifier - 50) * 0.8));
  const calculatedLifeExp = Math.round(scenario.averageLifeExpectancy + (urbanDensityModifier > 70 ? 2 : -1));

  return (
    <div className="space-y-8 pb-16 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{t('futureArcologyLab')}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('navFuture')}
          </h2>
          <p className={`text-xs mt-1 max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('visitFutureDesc')}
          </p>
        </div>

        {/* Year Selector Tabs */}
        <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {[2050, 2100, 2200].map(yr => (
            <button
              key={yr}
              onClick={() => setTargetYear(yr)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                targetYear === yr
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              YEAR {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Futuristic City Visualizer Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-2xl aspect-[16/9] max-h-[500px] w-full">
        <img
          src={selectedCity.image || '/src/assets/images/future_world_2100_1790758282499.jpg'}
          alt={selectedCity.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Floating City Concept Info */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl text-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-bold">
                {selectedCity.country} · {targetYear}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Pop. {selectedCity.populationEstimate}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white drop-shadow-md">
              {selectedCity.name}
            </h3>
            <p className="mt-1 text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow">
              {selectedCity.conceptSummary}
            </p>
          </div>

          {/* City switcher pill buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {futureCitiesData.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
                  selectedCity.id === c.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg'
                    : 'bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-800 border border-white/10'
                }`}
              >
                {c.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Speculative Simulation Controls & Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Scenario Controls */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-6 shadow-sm ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h3 className={`text-base font-bold font-display flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Zap className="w-4 h-4 text-cyan-500" />
              <span>{t('scenarioParameters')}</span>
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('scenarioParamsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Slider 1: Clean Energy */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('cleanEnergy')}</span>
                </span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{cleanEnergyModifier}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={cleanEnergyModifier}
                onChange={e => setCleanEnergyModifier(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('cleanEnergyDesc')}</span>
            </div>

            {/* Slider 2: Urban Density */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('urbanDensity')}</span>
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{urbanDensityModifier}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={urbanDensityModifier}
                onChange={e => setUrbanDensityModifier(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('urbanDensityDesc')}</span>
            </div>

            {/* Slider 3: Transit Speed */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Train className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('transportSpeed')}</span>
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{transitSpeedModifier}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={transitSpeedModifier}
                onChange={e => setTransitSpeedModifier(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('transportDesc')}</span>
            </div>

            {/* Slider 4: Carbon Capture */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Wind className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('climateResilience')}</span>
                </span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{carbonCaptureModifier}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={carbonCaptureModifier}
                onChange={e => setCarbonCaptureModifier(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('carbonCaptureDesc')}</span>
            </div>
          </div>

          {/* Technological Milestones of Selected Year */}
          <div className="pt-4 border-t border-inherit">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2 font-bold">
              {t('technologicalMilestones')} ({targetYear})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scenario.technologicalMilestones.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Projected Metrics & Disclaimers */}
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-4 shadow-sm ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-sm font-bold font-display uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('projectedMetrics')} ({targetYear})
            </h3>

            <div className="space-y-3">
              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('cleanEnergy')}</span>
                <p className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {calculatedEnergy}%
                </p>
              </div>

              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Atmospheric CO2 Level</span>
                <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {calculatedCarbon} ppm
                </p>
              </div>

              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Average Life Expectancy</span>
                <p className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                  {calculatedLifeExp} Years
                </p>
              </div>

              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Off-World Orbital Residents</span>
                <p className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                  {scenario.orbitalStationPopulation.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Scientific Framework & Disclaimer */}
          <div className={`p-4 rounded-2xl border text-[11px] space-y-2 ${
            isDark
              ? 'bg-slate-950/90 border-amber-900/40 text-slate-400'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-1.5 text-amber-500 font-mono text-xs font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Scientific Disclaimer</span>
            </div>
            <p className="leading-tight">{t('speculativeSimulationDisclaimer')}</p>
            <p className="text-[10px]">{scenario.scientificFramework}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
