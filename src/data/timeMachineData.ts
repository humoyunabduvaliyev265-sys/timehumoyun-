import { HistoricalEra } from '../types';

export const historicalErasData: HistoricalEra[] = [
  {
    id: 'ancient_civilizations',
    name: 'Ancient River Civilizations',
    period: 'c. 3500 BCE – 1200 BCE',
    yearRange: [-3500, -1200],
    tagline: 'Cradle of writing, urban centers, and bronze metallurgy.',
    overview: 'The earliest complex urban societies emerged along fertile river valleys: the Nile in Egypt, the Tigris and Euphrates in Mesopotamia, the Indus Valley in Harappa, and the Yellow River in China. Development of cuneiform and hieroglyphic scripts revolutionized human communication.',
    culturalContext: 'Transition from agrarian villages to centralized temple-states, early codified legal systems (Hammurabi), monumental stone masonry, and seasonal celestial calendars.',
    keyEvents: [
      { year: '3200 BCE', title: 'Emergence of Cuneiform Script', description: 'Sumerian temple administrators in Uruk establish proto-cuneiform on clay tablets.' },
      { year: '2560 BCE', title: 'Construction of the Great Pyramid of Giza', description: 'Pharaoh Khufu directs the building of the highest monumental stone tomb in antiquity.' },
      { year: '1754 BCE', title: 'Promulgation of the Code of Hammurabi', description: 'Babylonian legal code inscribed on black diorite stele, codifying civil and criminal justice.' }
    ],
    notableArchitecture: [
      { name: 'Ziggurat of Ur', location: 'Mesopotamia (Modern Iraq)', description: 'Terraced mudbrick step pyramid dedicated to the moon god Nanna.' },
      { name: 'Karnak Temple Precinct', location: 'Thebes (Modern Luxor, Egypt)', description: 'Hypostyle hall of massive stone papyrus columns constructed over 1,500 years.' }
    ],
    historicalFigures: [
      { name: 'Hammurabi', role: 'King of Babylon', contribution: 'Codified early comprehensive legal statutes regulating property, commerce, and retribution.' },
      { name: 'Imhotep', role: 'Architect & Vizier of Pharaoh Djoser', contribution: 'Pioneered stone step-pyramid engineering at Saqqara; revered as father of medicine.' }
    ],
    disclaimer: 'Archaeological dates for the Bronze Age are reconstructed using stratigraphy, radiocarbon dating, and king lists.'
  },
  {
    id: 'classical_antiquity',
    name: 'Classical Antiquity: Greece & Rome',
    period: 'c. 800 BCE – 476 CE',
    yearRange: [-800, 476],
    tagline: 'Democratic philosophy, Roman legal administration, and Mediterranean networks.',
    overview: 'The flourishing of Hellenic poleis (Athens, Sparta) birthed philosophical rationalism, theater, and civic architecture. Alexander the Great’s conquests bridged Greek thought with Persian and Central Asian Bactria. The Roman Republic transformed into an empire uniting Mediterranean shores.',
    culturalContext: 'Philosophical inquiries of Socrates, Plato, and Aristotle; Roman civil engineering with volcanic pozzolana concrete, arches, and aqueduct networks.',
    keyEvents: [
      { year: '508 BCE', title: 'Cleisthenes Reforms & Athenian Democracy', description: 'Democratic franchise established for free citizen assembly in Athens.' },
      { year: '334 BCE', title: 'Alexander the Great Marches to Central Asia', description: 'Alexander reaches Sogdiana (modern Uzbekistan), marrying Roxana and founding frontier cities.' },
      { year: '27 BCE', title: 'Pax Romana under Augustus', description: 'Founding of the Roman Empire, initiating two centuries of Mediterranean trade peace.' },
      { year: '80 CE', title: 'Inauguration of the Colosseum', description: 'Massive Flavian Amphitheatre completed with seating for 50,000 citizens.' }
    ],
    notableArchitecture: [
      { name: 'The Parthenon', location: 'Athens, Greece', description: 'Doric temple on the Acropolis featuring subtle optical curvature corrections.' },
      { name: 'The Pantheon', location: 'Rome, Italy', description: 'Unreinforced concrete domed rotunda with an open central oculus, still standing.' }
    ],
    historicalFigures: [
      { name: 'Aristotle', role: 'Philosopher & Polymath', contribution: 'Formulated systematic logic, natural philosophy, ethics, and political theory.' },
      { name: 'Julius Caesar', role: 'Roman Dictator & General', contribution: 'Expanded Roman territory across Gaul and transformed the Roman political framework.' }
    ],
    disclaimer: 'Greco-Roman accounts provide rich primary texts, while classical archaeology continuously refines understanding of daily provincial life.'
  },
  {
    id: 'silk_road_golden_age',
    name: 'The Great Silk Road & Islamic Golden Age',
    period: 'c. 750 CE – 1450 CE',
    yearRange: [750, 1450],
    tagline: 'Crossroads of knowledge, celestial astronomy, and caravan commerce in Central Asia.',
    overview: 'The trans-Eurasian trade network connected Chang’an in China to Samarkand, Bukhara, Baghdad, and Constantinople. Central Asia flourished as the epicenter of mathematics, astronomy, medicine, and philosophy. The Timurid Renaissance transformed Samarkand into the pearl of the Muslim world.',
    culturalContext: 'Caravansaries sheltered merchants carrying silk, paper, lapis lazuli, spices, and glass. The House of Wisdom in Baghdad and academies of Samarkand preserved, expanded, and translated world knowledge.',
    keyEvents: [
      { year: '751 CE', title: 'Battle of Talas & Papermaking in Samarkand', description: 'Papermaking technology reaches Samarkand, making it the premier paper manufacturing hub of Eurasia.' },
      { year: '820 CE', title: 'Al-Khwarizmi Pioneers Algebra', description: 'Muhammad ibn Musa al-Khwarizmi from Khwarazm (Uzbekistan) publishes treatise creating Algebra and algorithms.' },
      { year: '1020 CE', title: 'Ibn Sina (Avicenna) Writes The Canon of Medicine', description: 'Born near Bukhara, Ibn Sina authors the standard medical textbook used across Europe and Asia for 600 years.' },
      { year: '1370 CE', title: 'Amir Timur Designates Samarkand as Imperial Capital', description: 'Timur summons master artisans, architects, and scholars to build dazzling turquoise-domed monuments.' },
      { year: '1428 CE', title: 'Ulugh Beg Constructs the Giant Meridian Sextant', description: 'Astronomer-king Ulugh Beg measures the sidereal year to within seconds of modern atomic clock measurements.' }
    ],
    notableArchitecture: [
      { name: 'Registan Ensemble', location: 'Samarkand, Uzbekistan', description: 'Monumental trio of madrasahs with turquoise tile mosaics, celestial star geometric patterns, and grand portals.' },
      { name: 'Kalyan Minaret & Mosque', location: 'Bukhara, Uzbekistan', description: 'Intricate decorative brickwork baked to resist earthquakes; towering beacon for desert caravans.' },
      { name: 'Ulugh Beg Observatory', location: 'Samarkand, Uzbekistan', description: 'Enormous 40-meter radius subterranean sextant carved directly into limestone bedrock.' }
    ],
    historicalFigures: [
      { name: 'Al-Khwarizmi', role: 'Mathematician & Astronomer (Khwarazm, Uzbekistan)', contribution: 'Founded Algebra (al-Jabr), introduced Hindu-Arabic numerals to the West; root of the word "algorithm".' },
      { name: 'Ibn Sina (Avicenna)', role: 'Philosopher & Physician (Bukhara, Uzbekistan)', contribution: 'Synthesized Aristotelian philosophy and medicine; authored The Canon of Medicine.' },
      { name: 'Ulugh Beg', role: 'Timurid Astronomer & Ruler (Samarkand, Uzbekistan)', contribution: 'Created the Zij-i Sultani star catalogue cataloging 1,018 stars with unprecedented accuracy.' },
      { name: 'Amir Timur (Tamerlane)', role: 'Emperor & Patron of Architecture', contribution: 'Established the Timurid Empire, commissioning majestic monuments across Central Asia.' }
    ],
    silkRoadFocus: {
      cities: ['Samarkand', 'Bukhara', 'Khiva', 'Merv', 'Kashgar', 'Isfahan'],
      tradeGoods: ['Samarkand Rag Paper', 'Silk Textiles', 'Turquoise & Lapis Lazuli', 'Spices & Medicinal Herbs', 'Astronomical Astrolabes'],
      uzbekistanHeritage: 'Uzbekistan served as the radiant cultural hub uniting Chinese, Persian, Indian, and Mediterranean merchants under hospitable caravansary laws.'
    },
    disclaimer: 'Historical dates verified through Islamic chronicles, Timurid waqf deeds, Chinese dynastic annals, and UNESCO conservation archives.'
  },
  {
    id: 'renaissance_exploration',
    name: 'Renaissance & Age of Discovery',
    period: 'c. 1450 CE – 1750 CE',
    yearRange: [1450, 1750],
    tagline: 'Humanist rediscovery, movable-type printing, and global maritime circumnavigation.',
    overview: 'A cultural movement originating in Italian city-states celebrated humanist learning, anatomical realism, and scientific empiricism. Johannes Gutenberg’s printing press democratized literacy, while European navigators charted global oceanic sea routes.',
    culturalContext: 'Linear perspective in fine arts, separation of natural science from scholastic theology, and beginning of global trade globalization.',
    keyEvents: [
      { year: '1455 CE', title: 'Gutenberg Completes Movable Type Bible', description: 'Printing press revolutionizes information dispersal throughout Europe.' },
      { year: '1492 CE', title: 'Transatlantic Maritime Encounters', description: 'Columbus reaches Caribbean archipelagos, initiating the Columbian Exchange of crops and diseases.' },
      { year: '1543 CE', title: 'Copernicus Proposes Heliocentric Solar System', description: 'De revolutionibus orbium coelestium posits that Earth and planets revolve around the Sun.' },
      { year: '1687 CE', title: 'Newton Publishes Principia Mathematica', description: 'Formulation of universal gravitation and laws of classical motion.' }
    ],
    notableArchitecture: [
      { name: 'Florence Cathedral (Il Duomo)', location: 'Florence, Italy', description: 'Brunelleschi’s double-shelled masonry dome constructed without wooden centering scaffolding.' },
      { name: 'St. Peter’s Basilica', location: 'Vatican City', description: 'Renaissance and Baroque masterpiece designed by Michelangelo, Bramante, and Bernini.' }
    ],
    historicalFigures: [
      { name: 'Leonardo da Vinci', role: 'Polymath, Painter & Engineer', contribution: 'Exemplified Renaissance humanism with studies in anatomy, flight, hydrodynamics, and iconic art.' },
      { name: 'Galileo Galilei', role: 'Astronomer & Physicist', contribution: 'Used the telescope to discover Jupiter\'s moons, supporting heliocentric astronomy.' }
    ],
    disclaimer: 'Based on preserved manuscript records, navigational logs, and published treaties.'
  },
  {
    id: 'industrial_modern',
    name: 'Industrial Revolution to the Space Age',
    period: 'c. 1760 CE – Present',
    yearRange: [1760, 2026],
    tagline: 'Steam power, electrical grid, computing, and planetary exploration.',
    overview: 'Harnessing fossil energy and mechanization transformed human labor, urbanization, and communication. The 20th century saw flight, telecommunications, antibiotics, computing microprocessors, and humanity taking its first steps onto the Moon.',
    culturalContext: 'Mass manufacturing, democratic republics, global international alliances, environmental awareness, and digital cyberspace.',
    keyEvents: [
      { year: '1769 CE', title: 'James Watt Patents Separate Condenser Steam Engine', description: 'Ignites modern industrial manufacturing and railway expansion.' },
      { year: '1903 CE', title: 'Wright Brothers Complete First Powered Flight', description: 'Kitty Hawk flight launches global aviation era.' },
      { year: '1969 CE', title: 'Apollo 11 Astronauts Walk on the Moon', description: 'Neil Armstrong and Buzz Aldrin become first humans to step onto another celestial body.' },
      { year: '1989 CE', title: 'Tim Berners-Lee Conceives the World Wide Web', description: 'Hypertext transfer protocol launches instantaneous global digital communication.' }
    ],
    notableArchitecture: [
      { name: 'Eiffel Tower', location: 'Paris, France', description: 'Wrought-iron lattice tower exemplifying industrial structural metallurgy.' },
      { name: 'International Space Station', location: 'Low Earth Orbit (400 km)', description: 'Continuously inhabited scientific research station orbiting Earth every 90 minutes.' }
    ],
    historicalFigures: [
      { name: 'Marie Curie', role: 'Physicist & Chemist', contribution: 'Pioneered research on radioactivity, only person to win Nobel Prizes in two distinct scientific fields.' },
      { name: 'Albert Einstein', role: 'Theoretical Physicist', contribution: 'Formulated the theories of Special and General Relativity, transforming modern astrophysics.' },
      { name: 'Alan Turing', role: 'Mathematician & Cryptanalyst', contribution: 'Laid foundational concepts of theoretical computer science and artificial intelligence.' }
    ],
    disclaimer: 'Contemporary records corroborated by peer-reviewed modern historical, scientific, and space agency registries.'
  }
];
