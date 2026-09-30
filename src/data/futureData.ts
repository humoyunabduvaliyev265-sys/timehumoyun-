import { FutureCityConcept } from '../types';

export interface FutureYearScenario {
  year: number;
  tagline: string;
  globalCleanEnergyPct: number;
  biodiversityRestorationPct: number;
  averageLifeExpectancy: number;
  orbitalStationPopulation: number;
  atmosphericCarbonPpm: number;
  technologicalMilestones: string[];
  scientificFramework: string;
}

export const futureScenariosData: Record<number, FutureYearScenario> = {
  2050: {
    year: 2050,
    tagline: 'Carbon Neutrality & Biophilic Architecture',
    globalCleanEnergyPct: 78,
    biodiversityRestorationPct: 42,
    averageLifeExpectancy: 84,
    orbitalStationPopulation: 1400,
    atmosphericCarbonPpm: 395,
    technologicalMilestones: [
      'Commercial Tokamak fusion energy integration into national grids',
      'Autonomous electric high-speed magnetic levitation corridors',
      'Desalination powered by solar arrays with zero-discharge brine recycling',
      'AI-directed global reforestation and robotic wetland revitalization'
    ],
    scientificFramework: 'Based on IPCC Sixth Assessment Report (SSP1-1.9 Sustainability Pathway) and International Energy Agency Net Zero by 2050 roadmaps.'
  },
  2100: {
    year: 2100,
    tagline: 'Global Ecological Equilibrium & Vertical Megacities',
    globalCleanEnergyPct: 98,
    biodiversityRestorationPct: 88,
    averageLifeExpectancy: 96,
    orbitalStationPopulation: 35000,
    atmosphericCarbonPpm: 340,
    technologicalMilestones: [
      'Space-based solar power beaming gigawatts to terrestrial grid receivers',
      'Self-healing living mycelium-concrete composite skyscraper facades',
      'Atmospheric vacuum carbon capture returning air to pre-industrial composition',
      'Permanent scientific colonies established on the Moon and Mars'
    ],
    scientificFramework: 'Speculative scenario synthesizing advanced geoengineering, carbon drawdown models, and United Nations sustainable habitat forecasts.'
  },
  2200: {
    year: 2200,
    tagline: 'Solar System Integration & Planetary Stewardship',
    globalCleanEnergyPct: 100,
    biodiversityRestorationPct: 99,
    averageLifeExpectancy: 120,
    orbitalStationPopulation: 500000,
    atmosphericCarbonPpm: 280,
    technologicalMilestones: [
      'Lagrangian orbital solar shields regulating planetary climate temperature',
      'Complete transition of heavy industrial mining to near-Earth asteroids',
      'Planetary biomes completely restored with genetic biodiversity revitalization',
      'Quantum communication networks bridging interplanetary colonies'
    ],
    scientificFramework: 'Long-term scientific extrapolation based on Kardashev Type I civilization energy harvesting principles.'
  }
};

export const futureCitiesData: FutureCityConcept[] = [
  {
    id: 'samarkand_2100',
    name: 'Neo-Samarkand: Green Silk Nexus',
    country: 'Uzbekistan',
    year: 2100,
    populationEstimate: '2.8 Million',
    primaryEnergySource: 'Solar Salt Concentrators & Fusion Micro-Reactors',
    transitSystem: 'Subterranean Vacuum Maglev & Solar Canopy Autonomous Pods',
    architectureType: 'Biomimetic Ceramic-Glass Towers with Integrated Orchards',
    conceptSummary: 'Honoring its 2,500-year heritage as the Silk Road oasis, Neo-Samarkand emerges as Central Asia’s premier hub for quantum computing, green chemistry, and desert agronomy. Its architecture merges traditional turquoise tile aesthetics with high-efficiency photovoltaic glazes that harvest solar energy while maintaining natural thermal cooling.',
    climateStrategy: 'Closed-loop aquifer replenishment fed by solar desalination networks from the Caspian Sea basin, surrounded by a 100-kilometer agroforestry biodiversity belt that halted desertification.',
    image: '/src/assets/images/future_world_2100_1790758282499.jpg'
  },
  {
    id: 'tokyo_arcology_2100',
    name: 'Tokyo Bay Biosphere Arcology',
    country: 'Japan',
    year: 2100,
    populationEstimate: '8.5 Million',
    primaryEnergySource: 'Deep Ocean Thermal Energy Conversion (OTEC) & Hydrogen',
    transitSystem: 'Multi-Tiered Magnetic 3D Skyways & Autonomous Aquatic Shuttles',
    architectureType: 'Earthquake-Resilient Floating Carbon-Lattice Pyramids',
    conceptSummary: 'An adaptive marine metropolis floating in Tokyo Bay designed to withstand super-typhoons and sea-level fluctuations. Built with carbon-fiber honeycombs and self-growing bio-rock foundations that foster artificial coral reef ecosystems beneath human residential sectors.',
    climateStrategy: 'Dynamic pneumatic wave-breakers that harvest tidal energy while safeguarding coastal estuaries, combined with vertical hydroponic farms meeting 100% of urban nutritional needs.',
    image: '/src/assets/images/future_world_2100_1790758282499.jpg'
  },
  {
    id: 'sahara_solar_2100',
    name: 'Sahara Helio-City Oasis',
    country: 'Egypt / North Africa',
    year: 2100,
    populationEstimate: '4.2 Million',
    primaryEnergySource: 'Perovskite-Silicon Photovoltaic Fields & Molten Salt Storage',
    transitSystem: 'Trans-Saharan Solar Hyperloop (Cairo to Dakar in 3 hours)',
    architectureType: 'Sub-Surface Sandstone Arcologies with Wind-Scoop Passive Cooling',
    conceptSummary: 'Transforming arid desert into an energy export continent, the Helio-City uses the shade created by immense solar arrays to condense atmospheric moisture, cultivating lush micro-forests and drip-irrigated date orchards beneath the clean energy panels.',
    climateStrategy: 'Continental cloud-seeding and fog-harvesting condensation towers generating 50 million liters of potable freshwater daily from atmospheric moisture currents.',
    image: '/src/assets/images/future_world_2100_1790758282499.jpg'
  }
];
