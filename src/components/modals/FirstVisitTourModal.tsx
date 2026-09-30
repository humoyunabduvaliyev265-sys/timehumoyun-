import React from 'react';
import { Language, ThemeMode } from '../../types';
import { getTranslation } from '../../data/i18n';
import { Globe, Clock, Sparkles, Compass, CheckCircle2, X } from 'lucide-react';

interface FirstVisitTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExplore: () => void;
  lang: Language;
  theme: ThemeMode;
}

export const FirstVisitTourModal: React.FC<FirstVisitTourModalProps> = ({
  isOpen,
  onClose,
  onStartExplore,
  lang,
  theme,
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';
  const t = (key: any) => getTranslation(lang, key);

  const steps = [
    {
      icon: Globe,
      title: t('tourStep1Title'),
      desc: t('tourStep1Desc'),
      color: 'text-cyan-500',
      bg: isDark ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200',
    },
    {
      icon: Clock,
      title: t('tourStep2Title'),
      desc: t('tourStep2Desc'),
      color: 'text-amber-500',
      bg: isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200',
    },
    {
      icon: Compass,
      title: t('tourStep3Title'),
      desc: t('tourStep3Desc'),
      color: 'text-emerald-500',
      bg: isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200',
    },
    {
      icon: Sparkles,
      title: t('tourStep4Title'),
      desc: t('tourStep4Desc'),
      color: 'text-purple-500',
      bg: isDark ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b flex items-start justify-between ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-cyan-50 via-sky-50 to-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-cyan-500 text-xs font-mono uppercase tracking-wider mb-1 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>EARTH 360 AI</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('welcomeTourTitle')}
            </h2>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('welcomeTourDesc')}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors shrink-0 ${
              isDark
                ? 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Grid List */}
        <div className="p-6 overflow-y-auto space-y-3.5 text-start">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${st.bg} ${st.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold font-display ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{st.title}</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{st.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              isDark
                ? 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-300'
            }`}
          >
            {t('skipGuide')}
          </button>

          <button
            onClick={() => {
              onClose();
              onStartExplore();
            }}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>{t('gotIt')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
