import { CountryData, GeographicFeature, Landmark } from '../types';

export const countriesData: CountryData[] = [
  {
    code: 'UZ',
    name: 'Uzbekistan',
    nativeName: 'O‘zbekiston Respublikasi',
    flag: '🇺🇿',
    capital: 'Tashkent',
    region: 'Central Asia',
    subregion: 'Silk Road Heart',
    population: 36799000,
    areaKm2: 448978,
    languages: ['Uzbek', 'Russian', 'Karakalpak'],
    currency: 'Uzbekistani Som (UZS)',
    coordinates: { lat: 41.3775, lng: 64.5853 },
    overview: 'Uzbekistan is a doubly landlocked nation in Central Asia, renowned for its ancient Silk Road cities including Samarkand, Bukhara, and Khiva. Its turquoise-domed madrasahs and historic caravan routes bridged East and West for millennia.',
    geographicHighlights: [
      'Kyzylkum Desert vast sandscapes',
      'Tian Shan & Pamir-Alay foothills',
      'Amu Darya & Syr Darya river basins',
      'Fergana Valley agricultural oasis'
    ],
    historicalHighlight: 'Center of the Timurid Renaissance, astronomical breakthroughs by Ulugh Beg, and philosophical triumphs by Avicenna (Ibn Sina) and Al-Khwarizmi.',
    landmarks: ['registan_samarkand', 'po-i-kalyan_bukhara', 'itchan_kala_khiva', 'ulugh_beg_observatory']
  },
  {
    code: 'EG',
    name: 'Egypt',
    nativeName: 'Miṣr',
    flag: '🇪🇬',
    capital: 'Cairo',
    region: 'Northern Africa',
    subregion: 'Nile Valley',
    population: 109300000,
    areaKm2: 1002450,
    languages: ['Arabic'],
    currency: 'Egyptian Pound (EGP)',
    coordinates: { lat: 26.8206, lng: 30.8025 },
    overview: 'Cradle of ancient civilization, home to the Nile River, monumental Old Kingdom pyramids, and millennia of pharaonic, Greco-Roman, and Islamic heritage.',
    geographicHighlights: ['Nile River delta & valley', 'Eastern & Western Sahara Deserts', 'Sinai Peninsula'],
    historicalHighlight: 'Pyramid construction of the 4th Dynasty, Karnak temple complexes, and the Library of Alexandria.',
    landmarks: ['giza_pyramids', 'karnak_temple', 'abu_simbel']
  },
  {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Repubblica Italiana',
    flag: '🇮🇹',
    capital: 'Rome',
    region: 'Southern Europe',
    subregion: 'Mediterranean',
    population: 58850000,
    areaKm2: 301340,
    languages: ['Italian'],
    currency: 'Euro (€)',
    coordinates: { lat: 41.8719, lng: 12.5674 },
    overview: 'The epicenter of the Roman Empire and the cradle of the Renaissance, Italy contains the highest concentration of UNESCO World Heritage sites in the world.',
    geographicHighlights: ['Apennine Mountains spine', 'Alpine glaciers in the north', 'Tyrrhenian & Adriatic coastlines'],
    historicalHighlight: 'Pax Romana under Augustus, Renaissance artistic resurgence in Florence, and Roman engineering triumphs like the Pantheon.',
    landmarks: ['colosseum_rome', 'roman_forum', 'florence_duomo', 'pompeii']
  },
  {
    code: 'CN',
    name: 'China',
    nativeName: 'Zhonghua Renmin Gongheguo',
    flag: '🇨🇳',
    capital: 'Beijing',
    region: 'East Asia',
    subregion: 'Yellow & Yangtze Valleys',
    population: 1409670000,
    areaKm2: 9596961,
    languages: ['Mandarin Chinese'],
    currency: 'Renminbi Yuan (CNY)',
    coordinates: { lat: 35.8617, lng: 104.1954 },
    overview: 'One of the world’s oldest continuous civilizations, with over four millennia of recorded history spanning monumental engineering feats, trade routes, and philosophical foundations.',
    geographicHighlights: ['Tibetan Plateau (Roof of the World)', 'Yangtze & Yellow Rivers', 'Gobi Desert'],
    historicalHighlight: 'Terracotta Army of Qin Shi Huang, the Great Wall fortification network, and original Silk Road starting hub at Chang\'an.',
    landmarks: ['great_wall_china', 'forbidden_city', 'terracotta_army']
  },
  {
    code: 'IR',
    name: 'Iran',
    nativeName: 'Jomhuri-ye Eslāmi-ye Irān',
    flag: '🇮🇷',
    capital: 'Tehran',
    region: 'Western Asia',
    subregion: 'Iranian Plateau',
    population: 88550000,
    areaKm2: 1648195,
    languages: ['Persian (Farsi)'],
    currency: 'Iranian Rial (IRR)',
    coordinates: { lat: 32.4279, lng: 53.6880 },
    overview: 'Heartland of ancient Persia, including the Achaemenid Empire under Cyrus the Great and magnificent Islamic architecture in Isfahan and Shiraz.',
    geographicHighlights: ['Zagros and Alborz Mountain ranges', 'Dasht-e Kavir salt desert', 'Caspian Sea coastline'],
    historicalHighlight: 'The Cyrus Cylinder of human rights declaration, monumental imperial palaces of Persepolis, and early qanat water engineering.',
    landmarks: ['persepolis_shiraz', 'naqsh_e_jahan_isfahan', 'pasargadae']
  },
  {
    code: 'US',
    name: 'United States',
    nativeName: 'United States of America',
    flag: '🇺🇸',
    capital: 'Washington, D.C.',
    region: 'North America',
    subregion: 'Continental',
    population: 335000000,
    areaKm2: 9833517,
    languages: ['English'],
    currency: 'US Dollar ($)',
    coordinates: { lat: 37.0902, lng: -95.7129 },
    overview: 'Diverse federal republic spanning fifty states, notable for vast ecological landscapes, technological innovation centers, and global cultural footprint.',
    geographicHighlights: ['Rocky Mountains', 'Grand Canyon & Colorado Plateau', 'Mississippi River basin', 'Great Lakes'],
    historicalHighlight: 'Constitutional democracy founding in 1776, Apollo 11 Lunar Landing in 1969, and digital era revolution.',
    landmarks: ['grand_canyon', 'statue_of_liberty', 'yellowstone']
  },
  {
    code: 'BR',
    name: 'Brazil',
    nativeName: 'Brasil',
    flag: '🇧🇷',
    capital: 'Brasília',
    region: 'South America',
    subregion: 'Amazon Basin',
    population: 215300000,
    areaKm2: 8515767,
    languages: ['Portuguese'],
    currency: 'Brazilian Real (BRL)',
    coordinates: { lat: -14.2350, lng: -51.9253 },
    overview: 'The largest country in South America, home to the Amazon Rainforest—the planet\'s premier biodiversity sanctuary—and iconic coastal geography.',
    geographicHighlights: ['Amazon River & Basin', 'Pantanal wetlands', 'Iguazu Falls', 'Brazilian Highlands'],
    historicalHighlight: 'Indigenous forest custodianship, colonial sugarcane era, and modern architectural vision in planned capital Brasília.',
    landmarks: ['christ_the_redeemer', 'iguazu_falls', 'amazon_rainforest']
  },
  {
    code: 'JP',
    name: 'Japan',
    nativeName: 'Nippon',
    flag: '🇯🇵',
    capital: 'Tokyo',
    region: 'East Asia',
    subregion: 'Japanese Archipelago',
    population: 124500000,
    areaKm2: 377975,
    languages: ['Japanese'],
    currency: 'Japanese Yen (JPY)',
    coordinates: { lat: 36.2048, lng: 138.2529 },
    overview: 'An island archipelago renowned for harmonious synthesis of ancient traditions, shinto shrines, Zen gardens, and cutting-edge robotics and bullet-train transit.',
    geographicHighlights: ['Mount Fuji volcanic cone', 'Pacific Ring of Fire topography', 'Seto Inland Sea'],
    historicalHighlight: 'Heian court culture, Tokugawa Shogunate peace era, and post-war high-speed technological expansion.',
    landmarks: ['mount_fuji', 'kyoto_kinkakuji', 'itsukushima_shrine']
  },
  {
    code: 'AU',
    name: 'Australia',
    nativeName: 'Commonwealth of Australia',
    flag: '🇦🇺',
    capital: 'Canberra',
    region: 'Oceania',
    subregion: 'Australasia',
    population: 26500000,
    areaKm2: 7692024,
    languages: ['English'],
    currency: 'Australian Dollar (AUD)',
    coordinates: { lat: -25.2744, lng: 133.7751 },
    overview: 'An island continent characterized by ancient Aboriginal cultures spanning over 65,000 years, the Great Barrier Reef, and vast red desert interior.',
    geographicHighlights: ['Great Barrier Reef', 'Uluru sandstone monolith', 'Great Dividing Range', 'Outback deserts'],
    historicalHighlight: 'Continuous indigenous songlines, 18th-century maritime mapping by James Cook, and iconic modern architecture.',
    landmarks: ['sydney_opera_house', 'uluru', 'great_barrier_reef']
  },
  {
    code: 'ZA',
    name: 'South Africa',
    nativeName: 'Republic of South Africa',
    flag: '🇿🇦',
    capital: 'Pretoria',
    region: 'Southern Africa',
    subregion: 'Cape of Good Hope',
    population: 60600000,
    areaKm2: 1221037,
    languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English'],
    currency: 'South African Rand (ZAR)',
    coordinates: { lat: -30.5595, lng: 22.9375 },
    overview: 'Known as the Rainbow Nation, South Africa boasts the Cradle of Humankind hominin fossil grounds and stunning geological variety from Table Mountain to Kruger National Park.',
    geographicHighlights: ['Table Mountain plateau', 'Kalahari Basin', 'Drakensberg Escarpment'],
    historicalHighlight: 'Fossil sites of Australopithecus africanus, anti-apartheid movement led by Nelson Mandela.',
    landmarks: ['table_mountain', 'kruger_park', 'cradle_of_humankind']
  }
];

export const landmarksData: Landmark[] = [
  {
    id: 'registan_samarkand',
    name: 'Registan Square',
    country: 'Uzbekistan',
    category: 'monument',
    coordinates: { lat: 39.6547, lng: 66.9758 },
    era: '15th - 17th Century CE',
    description: 'The monumental heart of ancient Samarkand, surrounded by three majestic madrasahs: Ulugh Beg, Sher-Dor, and Tilya-Kori. Celebrated for dazzling azure majolica, mosaic tilework, and celestial astronomy foundations.',
    facts: [
      'Built as the grand public square of the Timurid capital',
      'Ulugh Beg taught mathematics and astronomy here personally',
      'The Sher-Dor madrasah features rare figurative depictions of lions and rising suns',
      'UNESCO World Heritage centerpiece of the Silk Road'
    ],
    historicalSignificance: 'Registan was the world crossroads of the Silk Road where merchants, scholars, and diplomats exchanged silks, paper, philosophy, and astronomical charts.'
  },
  {
    id: 'po-i-kalyan_bukhara',
    name: 'Po-i-Kalyan Complex',
    country: 'Uzbekistan',
    category: 'monument',
    coordinates: { lat: 39.7758, lng: 64.4150 },
    era: '12th - 16th Century CE',
    description: 'An Islamic architectural ensemble in Bukhara comprising the soaring Kalyan Minaret (Tower of Death), Kalyan Mosque, and Mir-i-Arab Madrasah.',
    facts: [
      'The Kalyan Minaret was so impressive that Genghis Khan spared it from destruction in 1220',
      'The minaret stands 45.6 meters tall and served as a beacon for desert caravans',
      'Bukhara was honored with the title "Noble Bukhara" (Buxoroi Sharif) across the Islamic world'
    ],
    historicalSignificance: 'Served as one of Central Asia’s primary spiritual and theological academies for centuries.'
  },
  {
    id: 'itchan_kala_khiva',
    name: 'Itchan Kala',
    country: 'Uzbekistan',
    category: 'archaeological',
    coordinates: { lat: 41.3783, lng: 60.3594 },
    era: '10th - 19th Century CE',
    description: 'The ancient walled inner town of the Khiva oasis, preserved like an open-air museum behind 10-meter-high mudbrick crenellated defensive ramparts.',
    facts: [
      'Contains over 50 historic monuments and 250 old houses',
      'First UNESCO World Heritage site inscribed in Central Asia (1990)',
      'Home to the iconic Kalta Minor minaret wrapped in glazed turquoise bands'
    ],
    historicalSignificance: 'The final staging and resupply post for Silk Road caravans prior to crossing the harsh Karakum desert towards the Caspian.'
  },
  {
    id: 'giza_pyramids',
    name: 'Great Pyramids of Giza',
    country: 'Egypt',
    category: 'monument',
    coordinates: { lat: 29.9792, lng: 31.1342 },
    era: 'c. 2560 BCE',
    description: 'The sole surviving wonder of the ancient world. Built during the Fourth Dynasty for Pharaoh Khufu, displaying astounding mathematical alignment to true cardinal north.',
    facts: [
      'Originally clad in polished white Tura limestone casing',
      'Composed of an estimated 2.3 million stone blocks',
      'Remained the tallest human-made structure for over 3,800 years'
    ],
    historicalSignificance: 'Testament to ancient Egyptian religious philosophy regarding the afterlife, divine kingship, and labor organization.'
  },
  {
    id: 'colosseum_rome',
    name: 'Colosseum & Roman Forum',
    country: 'Italy',
    category: 'archaeological',
    coordinates: { lat: 41.8902, lng: 12.4922 },
    era: '70 - 80 CE',
    description: 'The Flavian Amphitheatre, the largest amphitheater ever built, seated over 50,000 spectators for gladiatorial spectacles and civic ceremonies at the heart of the Roman Empire.',
    facts: [
      'Utilized advanced travertine, tuff, and Roman volcanic hydraulic concrete',
      'Featured a retractable canvas awning system known as the velarium',
      'The hypogeum subterranean network housed staging lifts and mechanical trapdoors'
    ],
    historicalSignificance: 'The premier public architectural monument of Imperial Roman state power, public spectacle, and civic assembly.'
  },
  {
    id: 'great_wall_china',
    name: 'Great Wall of China',
    country: 'China',
    category: 'monument',
    coordinates: { lat: 40.4319, lng: 116.5704 },
    era: '7th Century BCE - 17th Century CE',
    description: 'An immense network of fortifications, watchtowers, beacon hills, and garrison barracks stretching across historical northern borders of China.',
    facts: [
      'Total length including all branches exceeds 21,196 kilometers',
      'Sticky rice mortar was mixed with slaked lime for extraordinary tensile durability',
      'Protected vital Silk Road transit corridors along the Hexi corridor'
    ],
    historicalSignificance: 'Protected international Silk Road commerce, guarded agricultural borders, and enabled rapid optical smoke signaling.'
  },
  {
    id: 'persepolis_shiraz',
    name: 'Persepolis (Takht-e Jamshid)',
    country: 'Iran',
    category: 'archaeological',
    coordinates: { lat: 29.9357, lng: 52.8914 },
    era: 'c. 518 BCE',
    description: 'Ceremonial capital of the Achaemenid Persian Empire under Darius I, featuring the Apadana Palace and the Gate of All Nations.',
    facts: [
      'Constructed on a massive 125,000-square-meter terrace platform',
      'The bas-reliefs show 23 tributary nations presenting gifts in peaceful procession',
      'Conquered and burned by Alexander the Great in 330 BCE'
    ],
    historicalSignificance: 'Celebrated tolerance and administrative cohesion across the world’s first super-empire spanning three continents.'
  },
  {
    id: 'taj_mahal',
    name: 'Taj Mahal',
    country: 'India',
    category: 'monument',
    coordinates: { lat: 27.1751, lng: 78.0421 },
    era: '1632 - 1653 CE',
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna, commissioned by Mughal emperor Shah Jahan for his wife Mumtaz Mahal.',
    facts: [
      'Incorporates pietra dura inlay with lapis lazuli, jade, and carnelian',
      'Architectural synthesis of Persian, Islamic, and Indian design styles',
      'Features perfectly symmetrical charbagh gardens inspired by celestial visions'
    ],
    historicalSignificance: 'The zenith of Indo-Islamic architectural achievement during the prosperous Mughal empire.'
  }
];

export const geographicFeatures: GeographicFeature[] = [
  {
    id: 'himalayas',
    name: 'Himalayan Mountain Range',
    type: 'mountain',
    coordinates: { lat: 27.9881, lng: 86.9250 },
    scaleMetric: '8,848.86 m (Mount Everest)',
    description: 'Earth’s highest mountain range, home to all 14 peaks above 8,000 meters. Formed by the tectonic collision of the Indian and Eurasian plates.',
    region: 'Asia'
  },
  {
    id: 'amazon_river',
    name: 'Amazon River & Basin',
    type: 'river',
    coordinates: { lat: -3.4653, lng: -62.2159 },
    scaleMetric: '6,400 km length / 209,000 m³/s flow',
    description: 'The largest river in the world by discharge volume, carrying more water than the next seven largest rivers combined, nurturing Earth’s greatest rainforest.',
    region: 'South America'
  },
  {
    id: 'sahara_desert',
    name: 'Sahara Desert',
    type: 'desert',
    coordinates: { lat: 23.4162, lng: 25.6628 },
    scaleMetric: '9,200,000 km² surface area',
    description: 'The largest hot desert on Earth, encompassing ergs, hammadas, and oases across North Africa, roughly the size of the entire United States.',
    region: 'Africa'
  },
  {
    id: 'pacific_ocean',
    name: 'Pacific Ocean',
    type: 'ocean',
    coordinates: { lat: 0.0, lng: -160.0 },
    scaleMetric: '165,250,000 km² / 11,034 m Mariana Trench',
    description: 'The largest and deepest of Earth’s oceanic divisions, covering more than 32% of our planet’s total surface area.',
    region: 'Global'
  },
  {
    id: 'tian_shan',
    name: 'Tian Shan Mountains',
    type: 'mountain',
    coordinates: { lat: 42.0469, lng: 80.1264 },
    scaleMetric: '7,439 m (Jengish Chokusu)',
    description: 'The "Celestial Mountains" towering over Central Asia, historically guiding Silk Road merchants through oasis routes connecting Samarkand and Kashgar.',
    region: 'Central Asia'
  },
  {
    id: 'amu_darya',
    name: 'Amu Darya River (Oxus)',
    type: 'river',
    coordinates: { lat: 37.1167, lng: 66.8667 },
    scaleMetric: '2,400 km length',
    description: 'The historic Oxus River of classical antiquity, flowing from the Pamir Mountains through Uzbekistan, irrigating Silk Road kingdoms for millennia.',
    region: 'Central Asia'
  }
];
