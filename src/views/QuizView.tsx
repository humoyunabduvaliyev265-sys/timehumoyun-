import React, { useState, useMemo } from 'react';
import { getLocalizedQuizQuestions } from '../data/quizData';
import { Language, QuizQuestion, ThemeMode } from '../types';
import { translations, getTranslation } from '../data/i18n';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  MapPin,
} from 'lucide-react';

interface QuizViewProps {
  initialCategory?: 'geography' | 'history';
  onQuizComplete?: (score: number, total: number, category: 'geography' | 'history') => void;
  lang: Language;
  theme: ThemeMode;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialCategory = 'geography',
  onQuizComplete,
  lang,
  theme,
}) => {
  const [category, setCategory] = useState<'geography' | 'history'>(initialCategory);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const isDark = theme === 'dark';
  const t = (key: keyof typeof translations['en']) => getTranslation(lang, key);

  // Filter localized questions dynamically based on category, difficulty, and language
  const questions: QuizQuestion[] = useMemo(() => {
    const pool = getLocalizedQuizQuestions(category, lang);
    const filtered = pool.filter(q => q.difficulty === difficulty);
    return filtered.length > 0 ? filtered : pool;
  }, [category, difficulty, lang]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      onQuizComplete?.(score + (selectedOption === currentQ.correctIndex ? 1 : 0), questions.length, category);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 text-start">
      {/* Category & Difficulty Selector Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border shadow-xs ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCategory('geography');
              handleRestart();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              category === 'geography'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('geoChallenge')}</span>
          </button>

          <button
            onClick={() => {
              setCategory('history');
              handleRestart();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              category === 'history'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('historyChallenge')}</span>
          </button>
        </div>

        {/* Difficulty Segmented Buttons */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['beginner', 'intermediate', 'advanced'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setDifficulty(lvl);
                handleRestart();
              }}
              className={`px-3 py-1 text-xs font-semibold capitalize rounded-lg transition-colors ${
                difficulty === lvl
                  ? isDark
                    ? 'bg-slate-800 text-cyan-300 font-bold shadow-xs'
                    : 'bg-white text-cyan-800 font-bold shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t(lvl)}
            </button>
          ))}
        </div>
      </div>

      {!isCompleted ? (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono border-b border-inherit pb-4">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              {t('score')}: <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{score}</strong> / {currentIndex}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className={`text-[10px] uppercase font-mono tracking-widest font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {t(difficulty)} · {category === 'geography' ? t('geoChallenge') : t('historyChallenge')}
            </span>
            <h3 className={`text-lg sm:text-xl font-bold font-display leading-relaxed ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let stateStyles = isDark
                ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-100';

              if (isSelected && !isAnswerSubmitted) {
                stateStyles = isDark
                  ? 'bg-cyan-950/60 border-cyan-400 text-white'
                  : 'bg-cyan-50 border-cyan-500 text-cyan-950 font-semibold';
              } else if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  stateStyles = isDark
                    ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 font-bold'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && idx !== currentQ.correctIndex) {
                  stateStyles = isDark
                    ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                    : 'bg-rose-50 border-rose-500 text-rose-900';
                } else {
                  stateStyles = isDark
                    ? 'bg-slate-950/40 border-slate-850 text-slate-400 opacity-60'
                    : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-start text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${stateStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isDark ? 'bg-slate-900 border-white/10 text-slate-400' : 'bg-white border-slate-300 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Educational Feedback Card after answering */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-cyan-50/70 border-cyan-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-300">
                <HelpCircle className="w-4 h-4" />
                <span>{t('explanation')}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {currentQ.explanation}
              </p>
              {currentQ.funFact && (
                <div className={`pt-2 border-t flex items-start gap-2 text-[11px] ${
                  isDark ? 'border-slate-850 text-amber-300' : 'border-cyan-200 text-amber-800'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Historical Insight:</strong> {currentQ.funFact}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                {t('checkAnswer')}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <span>{currentIndex + 1 < questions.length ? t('nextQuestion') : t('seeResults')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className={`p-8 rounded-3xl border shadow-2xl text-center space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-500 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block font-bold">
              {t('quizConcluded')}
            </span>
            <h3 className={`text-2xl font-bold font-display mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('expeditionScore')}
            </h3>
            <p className={`text-4xl font-extrabold font-mono mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {score} <span className="text-xl text-slate-400 font-normal">/ {questions.length}</span>
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {score === questions.length
                ? (lang === 'uz' ? 'A’lo natija! Siz jahon sivilizatsiyasi va geografiyasi bo‘yicha mukammal bilimga egasiz.' : lang === 'ru' ? 'Превосходно! Вы обладаете глубокими знаниями географии и всемирной истории.' : lang === 'ar' ? 'ممتاز! لديك معرفة استثنائية بجغرافية وتاريخ الحضارات.' : 'Mastery achieved! You possess extraordinary planetary and historical knowledge.')
                : score >= questions.length / 2
                ? (lang === 'uz' ? 'Yaxshi natija! Sayyoramiz va Ipak yo‘li tarixini chuqurroq o‘rganishda davom eting.' : lang === 'ru' ? 'Хороший результат! Вы продемонстрировали отличную эрудицию.' : lang === 'ar' ? 'أداء رائع! أظهرت فهماً وافياً لجغرافية العالم وتاريخه.' : 'Well done! You demonstrated commendable cartographic and civilizational insight.')
                : (lang === 'uz' ? 'Yomon emas! 3D globus va vaqt mashinasida yana bir bor sayohat qilib, bilimlaringizni mustahkamlang.' : lang === 'ru' ? 'Неплохо! Повторите путешествие по 3D-глобусу и эпохам, чтобы улучшить результат.' : lang === 'ar' ? 'محاولة جيدة! استمر في استكشاف مجسم الأرض ورحلات آلة الزمن لتحسين نتيجتك.' : 'Good effort! Review the timeline and world globe to deepen your knowledge.')}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('playAgain')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
