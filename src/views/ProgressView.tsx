import React, { useState } from 'react';
import { UserProfile, Language, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import { CheckCircle2, Trophy } from 'lucide-react';

interface ProgressViewProps {
  profile: UserProfile;
  onUpdateProfileName: (name: string) => void;
  lang: Language;
  theme: ThemeMode;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  profile,
  onUpdateProfileName,
  lang,
  theme,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(profile.name);

  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  const handleSave = () => {
    if (newName.trim()) {
      onUpdateProfileName(newName.trim());
      setIsEditing(false);
    }
  };

  // Localized ranks
  const ranks = [
    {
      threshold: 0,
      title: lang === 'uz' ? 'Boshlang‘ich kartograf' : lang === 'ru' ? 'Начинающий картограф' : lang === 'ar' ? 'مستكشف مبتدئ' : 'Apprentice Cartographer',
      desc: lang === 'uz' ? 'Sayyoramiz bo‘ylab sayohatingizni boshladingiz.' : lang === 'ru' ? 'Первые шаги по эпохам и географии.' : lang === 'ar' ? 'بداية مسيرتك عبر الأرض والتاريخ.' : 'Starting your journey across Earth and antiquity.'
    },
    {
      threshold: 100,
      title: lang === 'uz' ? 'Ipak yo‘li olimi' : lang === 'ru' ? 'Ученый Шелкового пути' : lang === 'ar' ? 'عالم طريق الحرير' : 'Silk Road Scholar',
      desc: lang === 'uz' ? 'Markaziy Osiyo karvon yo‘llari va astronomiya merosini o‘rgandingiz.' : lang === 'ru' ? 'Освоены оазисы и обсерватория Улугбека.' : lang === 'ar' ? 'إتقان مسارات الحرير وعلم فلك سمرقند.' : 'Mastered Central Asian oasis trade routes and celestial astronomy.'
    },
    {
      threshold: 300,
      title: lang === 'uz' ? 'Vaqt sayyohi' : lang === 'ru' ? 'Навигатор эпох' : lang === 'ar' ? 'ملاح العصور' : 'Chronos Navigator',
      desc: lang === 'uz' ? '5000 yillik jahon tarixini muvaffaqiyatli zabt etdingiz.' : lang === 'ru' ? 'Глубокое понимание пяти тысячелетий цивилизаций.' : lang === 'ar' ? 'اجتياز آلاف السنين من الحضارات الإنسانية.' : 'Traversed millennia of civilizations with high historical precision.'
    },
    {
      threshold: 600,
      title: lang === 'uz' ? 'Sayyora grandmasteri' : lang === 'ru' ? 'Гроссмейстер Земли' : lang === 'ar' ? 'أستاذ الكوكب الأكبر' : 'Planetary Grandmaster',
      desc: lang === 'uz' ? 'Yer yuzi geografiyasi, arxeologiyasi va kelajak ssenariylari bilimdoni.' : lang === 'ru' ? 'Высший уровень картографии, археологии и футурологии.' : lang === 'ar' ? 'أعلى مستويات المعرفة الجغرافية والاستشرافية.' : 'Unrivaled mastery of planetary geography, archaeology, and future foresight.'
    },
  ];

  const currentRank = [...ranks].reverse().find(r => profile.xp >= r.threshold) || ranks[0];

  return (
    <div className="space-y-8 pb-16 text-start">
      {/* Profile Header Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
        isDark
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-500 shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className={`px-3 py-1 rounded-xl text-sm border focus:outline-none ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg"
                  >
                    {t('save')}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className={`text-xl sm:text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {profile.name}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
                  >
                    ({t('editName')})
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-1 flex items-center gap-1.5 font-bold">
              <span>{currentRank.title}</span>
              <span>·</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{profile.xp} XP</span>
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{currentRank.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2.5 rounded-2xl border text-center ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('lessonsCompleted')}</span>
            <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {profile.completedLessons.length}
            </span>
          </div>

          <div className={`px-4 py-2.5 rounded-2xl border text-center ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[10px] uppercase font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('quizzesPassed')}</span>
            <span className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400">
              {profile.quizHistory.length}
            </span>
          </div>
        </div>
      </div>

      {/* Explorer Rank Tiers */}
      <div className="space-y-4">
        <h3 className={`text-sm font-bold font-display uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
          {t('rankHierarchy')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ranks.map((r, i) => {
            const isUnlocked = profile.xp >= r.threshold;
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? isDark
                      ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                      : 'bg-white border-cyan-400 shadow-xs'
                    : isDark
                    ? 'bg-slate-950/40 border-slate-850 opacity-60'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{r.threshold} XP</span>
                  {isUnlocked && <CheckCircle2 className="w-4 h-4 text-cyan-500" />}
                </div>
                <h4 className={`text-xs font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{r.title}</h4>
                <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Progress History */}
      <div className="space-y-4">
        <h3 className={`text-sm font-bold font-display uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
          {t('recentExaminations')}
        </h3>

        {profile.quizHistory.length === 0 ? (
          <div className={`p-8 text-center rounded-2xl border text-xs ${
            isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}>
            {t('noQuizHistory')}
          </div>
        ) : (
          <div className="space-y-2">
            {profile.quizHistory.map((q, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">{q.category}</span>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>#{q.quizId}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {q.score} / {q.total} ({Math.round((q.score / q.total) * 100)}%)
                  </span>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{q.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
