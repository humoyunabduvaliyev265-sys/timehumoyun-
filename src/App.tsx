/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { HomeView } from './views/HomeView';
import { GlobeView } from './views/GlobeView';
import { ExplorerView } from './views/ExplorerView';
import { TimeMachineView } from './views/TimeMachineView';
import { HistoricalJourneyView } from './views/HistoricalJourneyView';
import { FutureWorldView } from './views/FutureWorldView';
import { SpaceView } from './views/SpaceView';
import { QuizView } from './views/QuizView';
import { FavoritesView } from './views/FavoritesView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { CountryDetailModal } from './components/modals/CountryDetailModal';
import { LandmarkDetailModal } from './components/modals/LandmarkDetailModal';
import { FirstVisitTourModal } from './components/modals/FirstVisitTourModal';
import { countriesData, landmarksData } from './data/earthData';
import { GlobeQuality, Language, ThemeMode, UserProfile } from './types';

const INITIAL_PROFILE: UserProfile = {
  name: 'Silk Road Explorer',
  explorerRank: 'Apprentice Cartographer',
  xp: 150,
  favorites: {
    countries: ['UZ', 'EG', 'IT'],
    landmarks: ['registan_samarkand', 'giza_pyramids'],
    journeys: ['samarkand_registan'],
  },
  quizHistory: [
    {
      quizId: '1',
      category: 'history',
      score: 5,
      total: 6,
      date: '2026-09-30',
    },
  ],
  completedLessons: ['Silk Road Crossroads', 'Celestial Astronomy of Ulugh Beg'],
};

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Localization with reliable fallback to Uzbek ('uz')
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('earth360_lang') as Language;
    if (saved === 'uz' || saved === 'en' || saved === 'ru' || saved === 'ar') return saved;
    return 'uz';
  });

  // Display & Performance with automatic device theme detection and localStorage persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('earth360_theme') as ThemeMode;
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  const [globeQuality, setGlobeQuality] = useState<GlobeQuality>(() => {
    return (localStorage.getItem('earth360_quality') as GlobeQuality) || 'high';
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return localStorage.getItem('earth360_reduced_motion') === 'true';
  });

  // User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('earth360_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inspectCountryCode, setInspectCountryCode] = useState<string | null>(null);
  const [inspectLandmarkId, setInspectLandmarkId] = useState<string | null>(null);
  const [activeJourneyId, setActiveJourneyId] = useState<string>('samarkand_registan');
  const [isFirstVisitModalOpen, setIsFirstVisitModalOpen] = useState(false);

  // Initialize and check first visit
  useEffect(() => {
    const visited = localStorage.getItem('earth360_visited');
    if (!visited) {
      setIsFirstVisitModalOpen(true);
      localStorage.setItem('earth360_visited', 'true');
    }
  }, []);

  // Update HTML direction for Arabic & sync language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('earth360_lang', lang);
  }, [lang]);

  // Synchronize Theme across root HTML, body, and localStorage
  useEffect(() => {
    localStorage.setItem('earth360_theme', theme);
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    }
  }, [theme]);

  // Persist Profile
  useEffect(() => {
    localStorage.setItem('earth360_profile', JSON.stringify(profile));
  }, [profile]);

  // Keyboard shortcut: Cmd + K / Ctrl + K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleFavorite = (id: string) => {
    setProfile(prev => {
      const isCountry = countriesData.some(c => c.code === id);
      const isLandmark = landmarksData.some(l => l.id === id);

      let newCountries = [...prev.favorites.countries];
      let newLandmarks = [...prev.favorites.landmarks];

      if (isCountry) {
        if (newCountries.includes(id)) {
          newCountries = newCountries.filter(c => c !== id);
        } else {
          newCountries.push(id);
        }
      } else if (isLandmark) {
        if (newLandmarks.includes(id)) {
          newLandmarks = newLandmarks.filter(l => l !== id);
        } else {
          newLandmarks.push(id);
        }
      }

      return {
        ...prev,
        favorites: {
          ...prev.favorites,
          countries: newCountries,
          landmarks: newLandmarks,
        },
      };
    });
  };

  const handleQuizComplete = (score: number, total: number, category: 'geography' | 'history') => {
    const xpGained = score * 30 + 20;
    setProfile(prev => {
      const newHistory = [
        {
          quizId: String(Date.now()),
          category,
          score,
          total,
          date: new Date().toISOString().split('T')[0],
        },
        ...prev.quizHistory,
      ];
      return {
        ...prev,
        xp: prev.xp + xpGained,
        quizHistory: newHistory,
      };
    });
  };

  const handleResetData = () => {
    localStorage.clear();
    setProfile(INITIAL_PROFILE);
    setLang('uz');
    setTheme('dark');
    setGlobeQuality('high');
    setReducedMotion(false);
    window.location.reload();
  };

  const allFavorites = [...profile.favorites.countries, ...profile.favorites.landmarks];

  // Active entity objects for modals
  const activeCountry = inspectCountryCode
    ? countriesData.find(c => c.code === inspectCountryCode) || null
    : null;

  const activeLandmark = inspectLandmarkId
    ? landmarksData.find(l => l.id === inspectLandmarkId) || null
    : null;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-250 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Bar Contract Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={view => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        }}
        lang={lang}
        onLanguageChange={setLang}
        theme={theme}
        onThemeToggle={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Full-featured Responsive Sidebar with language and theme synchronization */}
        <Sidebar
          currentView={currentView}
          onNavigate={view => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          lang={lang}
          onLanguageChange={setLang}
          theme={theme}
          onThemeToggle={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        />

        {/* Primary Main Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentView === 'home' && (
            <HomeView
              onNavigate={view => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              onSelectCountry={code => setInspectCountryCode(code)}
              onSelectLandmark={id => setInspectLandmarkId(id)}
              onStartJourney={journeyId => {
                setActiveJourneyId(journeyId);
                setCurrentView('journeys');
                window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              onOpenSearch={() => setIsSearchOpen(true)}
              lang={lang}
              theme={theme}
              globeQuality={globeQuality}
            />
          )}

          {currentView === 'globe' && (
            <GlobeView
              onSelectCountry={code => setInspectCountryCode(code)}
              onSelectLandmark={id => setInspectLandmarkId(id)}
              onStartJourney={journeyId => {
                setActiveJourneyId(journeyId);
                setCurrentView('journeys');
                window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              favorites={allFavorites}
              onToggleFavorite={handleToggleFavorite}
              lang={lang}
              theme={theme}
              globeQuality={globeQuality}
            />
          )}

          {currentView === 'explorer' && (
            <ExplorerView
              onSelectCountry={code => setInspectCountryCode(code)}
              onSelectLandmark={id => setInspectLandmarkId(id)}
              onNavigateToGlobeWithCoords={coords => {
                setCurrentView('globe');
              }}
              favorites={allFavorites}
              onToggleFavorite={handleToggleFavorite}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'timeMachine' && (
            <TimeMachineView
              onStartJourney={journeyId => {
                setActiveJourneyId(journeyId);
                setCurrentView('journeys');
                window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'journeys' && (
            <HistoricalJourneyView
              initialJourneyId={activeJourneyId}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'future' && (
            <FutureWorldView
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'space' && (
            <SpaceView
              onReturnToEarth={() => {
                setCurrentView('globe');
                window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'geoQuiz' && (
            <QuizView
              initialCategory="geography"
              onQuizComplete={handleQuizComplete}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'histQuiz' && (
            <QuizView
              initialCategory="history"
              onQuizComplete={handleQuizComplete}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'favorites' && (
            <FavoritesView
              favoriteIds={allFavorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectCountry={code => setInspectCountryCode(code)}
              onSelectLandmark={id => setInspectLandmarkId(id)}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'progress' && (
            <ProgressView
              profile={profile}
              onUpdateProfileName={name => setProfile(prev => ({ ...prev, name }))}
              lang={lang}
              theme={theme}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              lang={lang}
              onLanguageChange={setLang}
              theme={theme}
              onThemeToggle={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
              globeQuality={globeQuality}
              onGlobeQualityChange={setGlobeQuality}
              reducedMotion={reducedMotion}
              onReducedMotionToggle={() => {
                const next = !reducedMotion;
                setReducedMotion(next);
                localStorage.setItem('earth360_reduced_motion', String(next));
              }}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCountry={code => {
          setInspectCountryCode(code);
          setCurrentView('globe');
        }}
        onSelectLandmark={id => {
          setInspectLandmarkId(id);
          setCurrentView('globe');
        }}
        onSelectEra={eraId => {
          setCurrentView('timeMachine');
        }}
        onSelectCity={cityId => {
          setCurrentView('future');
        }}
        onSelectSpace={spaceId => {
          setCurrentView('space');
        }}
        lang={lang}
        theme={theme}
      />

      {/* Country Detail Modal */}
      <CountryDetailModal
        country={activeCountry}
        onClose={() => setInspectCountryCode(null)}
        onFocusOnGlobe={() => {
          setCurrentView('globe');
        }}
        onStartJourney={journeyId => {
          setActiveJourneyId(journeyId);
          setCurrentView('journeys');
        }}
        isFavorite={inspectCountryCode ? allFavorites.includes(inspectCountryCode) : false}
        onToggleFavorite={handleToggleFavorite}
        lang={lang}
        theme={theme}
      />

      {/* Landmark Detail Modal */}
      <LandmarkDetailModal
        landmark={activeLandmark}
        onClose={() => setInspectLandmarkId(null)}
        onFocusOnGlobe={() => {
          setCurrentView('globe');
        }}
        onStartJourney={journeyId => {
          setActiveJourneyId(journeyId);
          setCurrentView('journeys');
        }}
        isFavorite={inspectLandmarkId ? allFavorites.includes(inspectLandmarkId) : false}
        onToggleFavorite={handleToggleFavorite}
        lang={lang}
        theme={theme}
      />

      {/* First Visit Onboarding Tutorial */}
      <FirstVisitTourModal
        isOpen={isFirstVisitModalOpen}
        onClose={() => setIsFirstVisitModalOpen(false)}
        onStartExplore={() => {
          setCurrentView('globe');
        }}
        lang={lang}
        theme={theme}
      />
    </div>
  );
}
