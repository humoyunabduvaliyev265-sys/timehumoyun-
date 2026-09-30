import { HistoricalJourney } from '../types';

export const historicalJourneysData: HistoricalJourney[] = [
  {
    id: 'samarkand_registan',
    title: 'Registan Square & The Silk Road Jewel',
    location: 'Samarkand',
    country: 'Uzbekistan',
    coordinates: { lat: 39.6547, lng: 66.9758 },
    era: 'Timurid Renaissance (15th Century CE)',
    approxDate: '1420 CE',
    image: '/src/assets/images/registan_samarkand_1790758243141.jpg',
    audioNarrationText: 'You stand at the luminous heart of the Silk Road: Registan Square in ancient Samarkand. Under the patronage of Ulugh Beg and the Timurid dynasty, this public forum evolved into one of history’s greatest epicenters of celestial astronomy, mathematics, and architectural grandeur. Look closely at the intricate turquoise tilework, the soaring pishtaq entrance arches, and the bustling bazaar that welcomed silk caravans from Chang’an, spices from India, and philosophers from across the Islamic world.',
    historicalContext: 'Samarkand was described by ancient Greek historians as Marakanda and later hailed as "The Eden of the Orient". Following destruction during early invasions, Amir Timur resurrected the city in the 14th century as an imperial capital with gardens, palaces, and monumental religious academies. His grandson Ulugh Beg constructed the first grand madrasah on the west side of Registan in 1417–1420 CE.',
    verifiedFacts: [
      'UNESCO World Heritage Monument inscribed as "Samarkand – Crossroads of Cultures"',
      'Ulugh Beg personally delivered astronomy lectures in the classrooms of this madrasah',
      'The vibrant azure and cobalt colors were achieved through cobalt and copper glaze formulas',
      'The Sher-Dor madrasah opposite features the famous non-traditional motif of tiger-lions chasing deer beneath a human-faced sun'
    ],
    speculativeNotice: 'The surrounding marketplace lanterns and historical atmospheric lighting represent an artistic historical reconstruction based on Timurid travelogues (e.g. Ruy González de Clavijo).',
    historicalSources: [
      'UNESCO World Heritage Dossier No. 603rev: Samarkand',
      'Clavijo, Ruy González de. "Embassy to Tamerlane, 1403–1406"',
      'Golombek, Lisa & Wilber, Donald. "The Timurid Architecture of Iran and Turan"'
    ],
    hotspots: [
      {
        id: 'ulugh_beg_portal',
        xPercent: 28,
        yPercent: 44,
        title: 'Ulugh Beg Madrasah Pishtaq',
        subtitle: 'Astronomical Geometries & Grand Arch',
        details: 'The massive 30-meter-tall monumental portal faces east. Its mosaic surface is decorated with a 10-pointed star astronomical motif, symbolizing the celestial vault studied within.',
        architecturalNote: 'Constructed between 1417 and 1420 CE with double minarets standing 33 meters high.',
        archaeologicalSource: 'Institute of Archaeology, Academy of Sciences of the Republic of Uzbekistan.'
      },
      {
        id: 'central_courtyard',
        xPercent: 52,
        yPercent: 62,
        title: 'Caravan Bazaar & Scholar Forum',
        subtitle: 'Where East Met West',
        details: 'Merchants from Venice, Baghdad, and Luoyang gathered here to trade Chinese silk for Samarkand mulberry rag paper, lapis lazuli from Badakhshan, and Arabian spices.',
        architecturalNote: 'Four-iwan plan typical of Persian and Central Asian Islamic educational academies.',
        archaeologicalSource: 'Silk Roads: Initial Framework Document, UNESCO Publishing.'
      },
      {
        id: 'tilya_kori_dome',
        xPercent: 78,
        yPercent: 38,
        title: 'Tilya-Kori (Gilded) Madrasah & Mosque',
        subtitle: 'Gold Leaf Trompe-l’œil Vaulting',
        details: 'Named "Tilya-Kori" meaning "Gilded", this madrasah features a central mosque with ceiling relief covered in fine gold leaf using the kundal technique, creating the optical illusion of a lofty dome.',
        architecturalNote: 'Commissioned by Bukhara governor Yalangtush Bakhodur in 1646 CE to complete the square ensemble.',
        archaeologicalSource: 'State Museum of the History of the Timurids, Tashkent.'
      }
    ]
  },
  {
    id: 'ancient_rome_forum',
    title: 'The Roman Forum & Colosseum at Zenith',
    location: 'Rome',
    country: 'Italy',
    coordinates: { lat: 41.8902, lng: 12.4922 },
    era: 'Imperial Rome (Pax Romana)',
    approxDate: '115 CE',
    image: '/src/assets/images/ancient_rome_forum_1790758257799.jpg',
    audioNarrationText: 'Step into the beating civic heart of the Roman Empire during the reign of Emperor Trajan. Flanked by marble temples, triumphal arches, and the colossal Flavian Amphitheatre in the distance, the Forum Romanum was the epicenter of worldwide legal oratory, senate politics, and triumph processions celebrating peace across three continents.',
    historicalContext: 'For over a millennium, this valley between the Palatine and Capitoline Hills was the core of public life in Rome: hosting elections, criminal trials, religious sacrifices, and economic banking.',
    verifiedFacts: [
      'The Roman Forum sat above the Cloaca Maxima, one of the world\'s earliest municipal sewer systems',
      'Buildings were faced with Luna (Carrara) marble, travertine limestone, and volcanic tufa',
      'The Colosseum could be emptied in under 15 minutes through 76 numbered vomitoria gates'
    ],
    speculativeNotice: 'Crowd attire and exact temporary vendor stalls in this view are artistic reconstructions inspired by classical relief carvings and Pompeian frescoes.',
    historicalSources: [
      'Vitruvius, "De Architectura" (Ten Books on Architecture)',
      'Claridge, Amanda. "Rome: An Oxford Archaeological Guide"',
      'Suetonius, "The Twelve Caesars"'
    ],
    hotspots: [
      {
        id: 'temple_saturn',
        xPercent: 25,
        yPercent: 55,
        title: 'Temple of Saturn & Aerarium',
        subtitle: 'State Treasury of the Roman Republic',
        details: 'Eight iconic surviving Ionic granite columns supported the pediment holding the gold and silver bullion reserves of Rome.',
        architecturalNote: 'Ionic order colonnade with travertine foundations dating back to the early Republic.',
        archaeologicalSource: 'Soprintendenza Archeologica di Roma.'
      },
      {
        id: 'rostra_speaker',
        xPercent: 48,
        yPercent: 70,
        title: 'The Imperial Rostra',
        subtitle: 'Platform of Orators & Magistrates',
        details: 'Named after the bronze rams (rostra) of captured warships mounted on its facade, where Cicero and Mark Antony delivered renowned speeches.',
        architecturalNote: 'Elevated marble-faced speaker terrace measuring 24 meters long and 3 meters high.',
        archaeologicalSource: 'Journal of Roman Archaeology.'
      },
      {
        id: 'colosseum_backdrop',
        xPercent: 82,
        yPercent: 42,
        title: 'The Flavian Amphitheatre',
        subtitle: 'Monument of Travertine and Pozzolana',
        details: 'Commissioned by Emperor Vespasian in 72 CE as a public gift to Roman citizens, featuring tiered seating arranged by social class.',
        architecturalNote: 'Superimposed classical orders: Tuscan ground floor, Ionic second level, Corinthian third level.',
        archaeologicalSource: 'Archaeological Park of the Colosseum.'
      }
    ]
  },
  {
    id: 'giza_pyramids_dawn',
    title: 'The Great Pyramids & Sphinx of Giza',
    location: 'Giza Plateau',
    country: 'Egypt',
    coordinates: { lat: 29.9792, lng: 31.1342 },
    era: 'Old Kingdom (4th Dynasty)',
    approxDate: '2540 BCE',
    image: '/src/assets/images/giza_pyramids_dawn_1790758269473.jpg',
    audioNarrationText: 'Experience the dawn over the Giza Plateau during the Old Kingdom. In this epoch, the Pyramid of Khufu gleams under the desert sun, encased in polished white Tura limestone that reflected light like a beacon across the Nile Valley. Beside it rests the Great Sphinx, carved directly out of a natural limestone knoll guarding the sacred necropolis.',
    historicalContext: 'Built as monumental eternal resting complexes for Fourth Dynasty Pharaohs Khufu, Khafre, and Menkaure, reflecting sophisticated astronomy aligned precisely to True North and seasonal Nile flood cycles.',
    verifiedFacts: [
      'The Great Pyramid is aligned within 1/15th of a degree to true cardinal north',
      'The complex was constructed by organized citizen workforces housed in planned workers\' villages with healthcare',
      'The Sphinx is carved from a single continuous limestone outcrop of the Mokattam Formation'
    ],
    speculativeNotice: 'The polished limestone casing and golden pyramidion capstone are historic reconstructions based on archaeological remnants found around the base.',
    historicalSources: [
      'Lehner, Mark. "The Complete Pyramids", Thames & Hudson',
      'Hawass, Zahi. "Mountains of the Pharaohs: The History of the Giza Pyramids"',
      'Ministry of Tourism and Antiquities, Arab Republic of Egypt'
    ],
    hotspots: [
      {
        id: 'khufu_casing',
        xPercent: 40,
        yPercent: 36,
        title: 'Polished Tura Limestone Casing',
        subtitle: 'Reflecting the Sun God Ra',
        details: 'Originally covered with over 100,000 polished limestone blocks, fitted with tolerances so precise a knife blade could not pass between them.',
        architecturalNote: 'Base dimension: 230.3 meters; original height: 146.6 meters.',
        archaeologicalSource: 'Giza Project, Harvard University.'
      },
      {
        id: 'great_sphinx',
        xPercent: 74,
        yPercent: 68,
        title: 'The Great Sphinx of Giza',
        subtitle: 'Guardian of the Horizon (Hor-em-akhet)',
        details: 'Combines the body of a lion with the head of a king, likely Pharaoh Khafre, symbolizing supreme regal power and divine wisdom.',
        architecturalNote: '73 meters long and 20 meters high, facing directly east toward the rising sun on equinoxes.',
        archaeologicalSource: 'American Research Center in Egypt (ARCE).'
      }
    ]
  }
];
