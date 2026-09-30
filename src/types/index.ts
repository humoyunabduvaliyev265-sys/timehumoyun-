export type Language = 'en' | 'uz' | 'ru' | 'ar';

export type ThemeMode = 'dark' | 'light';

export type GlobeQuality = 'high' | 'medium' | 'low';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Landmark {
  id: string;
  name: string;
  country: string;
  category: 'monument' | 'natural' | 'archaeological' | 'modern';
  coordinates: Coordinates;
  era: string;
  description: string;
  facts: string[];
  historicalSignificance: string;
}

export interface GeographicFeature {
  id: string;
  name: string;
  type: 'continent' | 'ocean' | 'mountain' | 'river' | 'desert';
  coordinates: Coordinates;
  scaleMetric: string; // e.g. "8,848 m elevation", "6,650 km length"
  description: string;
  region: string;
}

export interface CountryData {
  code: string;
  name: string;
  nativeName?: string;
  flag: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  areaKm2: number;
  languages: string[];
  currency: string;
  coordinates: Coordinates;
  overview: string;
  geographicHighlights: string[];
  historicalHighlight: string;
  landmarks: string[];
}

export interface HistoricalEra {
  id: string;
  name: string;
  period: string;
  yearRange: [number, number]; // negative for BCE
  tagline: string;
  overview: string;
  culturalContext: string;
  keyEvents: { year: string; title: string; description: string }[];
  notableArchitecture: { name: string; location: string; description: string }[];
  historicalFigures: { name: string; role: string; contribution: string }[];
  silkRoadFocus?: {
    cities: string[];
    tradeGoods: string[];
    uzbekistanHeritage: string;
  };
  disclaimer: string;
}

export interface JourneyHotspot {
  id: string;
  xPercent: number; // 0 - 100 for responsive placement
  yPercent: number;
  title: string;
  subtitle: string;
  details: string;
  architecturalNote: string;
  archaeologicalSource: string;
}

export interface HistoricalJourney {
  id: string;
  title: string;
  location: string;
  country: string;
  coordinates: Coordinates;
  era: string;
  approxDate: string;
  image: string;
  audioNarrationText: string;
  historicalContext: string;
  verifiedFacts: string[];
  speculativeNotice: string;
  hotspots: JourneyHotspot[];
  historicalSources: string[];
}

export interface FutureCityConcept {
  id: string;
  name: string;
  country: string;
  year: number;
  populationEstimate: string;
  primaryEnergySource: string;
  transitSystem: string;
  architectureType: string;
  conceptSummary: string;
  climateStrategy: string;
  image?: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon';
  radiusKm: number;
  distanceFromSunMillionKm: number;
  orbitalPeriodDays: number;
  surfaceGravityMs2: number;
  moonsCount: number;
  atmosphereComposition: string;
  colorHex: string;
  description: string;
  missions: string[];
}

export interface QuizQuestion {
  id: string;
  category: 'geography' | 'history';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export interface UserProfile {
  name: string;
  explorerRank: string;
  xp: number;
  favorites: {
    countries: string[];
    landmarks: string[];
    journeys: string[];
  };
  quizHistory: {
    quizId: string;
    category: 'geography' | 'history';
    score: number;
    total: number;
    date: string;
  }[];
  completedLessons: string[];
}
