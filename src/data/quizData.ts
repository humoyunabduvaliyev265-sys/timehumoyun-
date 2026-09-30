import { QuizQuestion, Language } from '../types';

export const quizBank: Record<Language, { geography: QuizQuestion[]; history: QuizQuestion[] }> = {
  uz: {
    geography: [
      {
        id: 'geo_1',
        category: 'geography',
        difficulty: 'beginner',
        question: 'O‘zbekistonning poytaxti va Markaziy Osiyoning yirik madaniy hamda transport markazi qaysi shahar?',
        options: ['Samarqand', 'Buxoro', 'Toshkent', 'Xiva'],
        correctIndex: 2,
        explanation: 'Toshkent — O‘zbekiston poytaxti, keng xiyobonlari, yashil bog‘lari va betakror metropoliteni bilan mashhur.',
        funFact: 'Toshkent metrosi 1977-yilda ochilgan bo‘lib, Markaziy Osiyodagi birinchi yerosti transport tarmog‘idir.'
      },
      {
        id: 'geo_2',
        category: 'geography',
        difficulty: 'beginner',
        question: 'Sayyoramizning eng baland cho‘qqisi — Everest (Jomolungma) qaysi tog‘ tizmasida joylashgan?',
        options: ['And tog‘lari', 'Alp tog‘lari', 'Himolay tog‘lari', 'Qoyali tog‘lar'],
        correctIndex: 2,
        explanation: 'Himolay tog‘lari Osiyodagi beshta davlat bo‘ylab cho‘zilgan bo‘lib, eng baland nuqtasi 8,848.86 metrni tashkil etadi.',
        funFact: 'Hind va Yevrosiyo tektonik plitalari to‘qnashuvi sababli Himolay har yili taxminan 5 millimetrga o‘sadi.'
      },
      {
        id: 'geo_3',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'O‘zbekiston va Lixtenshteyn qanday noyob geografik xususiyatga ega?',
        options: [
          'Ular dunyodagi yagona ikki karra dengizga chiqish yo‘li bo‘lmagan davlatlardir',
          'Ularda birorta ham tabiiy daryo mavjud emas',
          'Ular aynan bir xil geografik kenglikda joylashgan',
          'Ularning hududida tog‘lar mavjud emas'
        ],
        correctIndex: 0,
        explanation: 'Ikki karra dengizga chiqish yo‘li bo‘lmagan mamlakat shunday davlatki, uni o‘rab turgan qo‘shni davlatlarning o‘zi ham dengizga chiqish imkoniga ega emas. Dunyoda faqat O‘zbekiston va Lixtenshteyn shunday maqomga ega.',
        funFact: 'O‘zbekistondan jahon okeaniga yetib borish uchun kamida ikkita xorijiy davlat chegarasini kesib o‘tish zarur.'
      },
      {
        id: 'geo_4',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'O‘zbekiston hududidan oqib o‘tuvchi va qadimgi yunonlar tomonidan "Oks" deb atalgan daryo qaysi?',
        options: ['Sirdaryo', 'Amudaryo', 'Zarafshon', 'Irtish'],
        correctIndex: 1,
        explanation: 'Amudaryo qadimgi yunon manbalarida Oks (Oxus) nomi bilan mashhur bo‘lib, Pomir tog‘laridan boshlanib, asrlar davomida Ipak yo‘li shaharlarini suv bilan ta’minlagan.',
        funFact: 'Iskandar Zulqarnayn miloddan avvalgi 329-yilda Amudaryodan somon bilan to‘ldirilgan charm meshlar yordamida kechib o‘tgan.'
      },
      {
        id: 'geo_5',
        category: 'geography',
        difficulty: 'advanced',
        question: 'Yer yuzidagi eng chuqur nuqta — Mariana botig‘idagi Challenger chuqurligi qaysi okeanda joylashgan?',
        options: ['Atlantika okeani', 'Tinch okeani', 'Hind okeani', 'Shimoliy Muz okeani'],
        correctIndex: 1,
        explanation: 'Tinch okeanining g‘arbiy qismida joylashgan Mariana botig‘i qariyb 11,000 metr chuqurlikka ega bo‘lib, suv bosimi 1,000 atmosferadan oshadi.',
        funFact: 'Agar Everest tog‘ini Mariana botig‘iga joylashtirilsa, uning cho‘qqisi yana 2 kilometr suv ostida qolgan bo‘lar edi.'
      },
      {
        id: 'geo_6',
        category: 'geography',
        difficulty: 'advanced',
        question: 'Qizilqum cho‘li asosan qaysi ikki daryo oralig‘ida joylashgan?',
        options: [
          'Amudaryo va Sirdaryo',
          'Dajla va Furot',
          'Hind va Gang',
          'Dunay va Volga'
        ],
        correctIndex: 0,
        explanation: 'Qizilqum cho‘li Markaziy Osiyoda Amudaryo va Sirdaryo oralig‘ida joylashgan bo‘lib, O‘zbekiston va Qozog‘iston hududlarini egallaydi.',
        funFact: 'Qizilqum cho‘lida bo‘r davriga oid qadimiy dinozavr suyaklari va noyob tosh qoldiqlari topilgan.'
      }
    ],
    history: [
      {
        id: 'hist_1',
        category: 'history',
        difficulty: 'beginner',
        question: 'Qadimgi dunyoning yetti mo‘jizasidan bugungi kungacha saqlanib qolgan yagona obida qaysi?',
        options: [
          'Bobil osma bog‘lari',
          'Iskandariya mayog‘i',
          'Rodos kolossi',
          'Giza ehromlari (Misr)'
        ],
        correctIndex: 3,
        explanation: 'Misrdagi Giza ehromlari miloddan avvalgi 2560-yillarda qurilgan bo‘lib, 4500 yildan ortiq vaqt davomida qad rostlab turibdi.',
        funFact: 'U dastlab quyosh nurlarida yaltirab turuvchi silliqlangan oq ohaktosh plitalar bilan qoplangan bo‘lgan.'
      },
      {
        id: 'hist_2',
        category: 'history',
        difficulty: 'beginner',
        question: 'Registon maydoni bilan butun dunyoga tanilgan va Amir Temur saltanatining poytaxti bo‘lgan shahar qaysi?',
        options: ['Buxoro', 'Samarqand', 'Xiva', 'Qo‘qon'],
        correctIndex: 1,
        explanation: 'Amir Temur 1370-yilda Samarqandni o‘z poytaxti etib belgilagan va uni "Sharq gavhari" darajasiga ko‘targan.',
        funFact: 'Iskandar Zulqarnayn: "Men Marakanda haqida eshitganlarimning barchasi haqiqat, ammo u men tasavvur qilganimdan ham go‘zalroq ekan" degan.'
      },
      {
        id: 'hist_3',
        category: 'history',
        difficulty: 'intermediate',
        question: '"Algebra" atamasi Xorazmda (hozirgi O‘zbekiston) tug‘ilgan qaysi buyuk allomaning asaridan olingan?',
        options: ['Ibn Sino', 'Al-Xorazmiy', 'Abu Rayhon Beruniy', 'Umar Xayyom'],
        correctIndex: 1,
        explanation: 'Muhammad ibn Muso al-Xorazmiy "Al-Kitob al-muxtasar fi hisob al-jabr va-l-muqobala" asari bilan algebraga asos solgan. "Algoritm" so‘zi ham uning nomidan kelib chiqqan.',
        funFact: 'Al-Xorazmiyning lotin tiliga tarjima qilingan asarlari orqali Yevropaga nol tushunchasi va o‘nlik sanoq tizimi kirib borgan.'
      },
      {
        id: 'hist_4',
        category: 'history',
        difficulty: 'intermediate',
        question: '1428-yilda Samarqandda yulduzlarni o‘rganish uchun ulkan sekstantga ega rasadxona qurdirgan olim va hukmdor kim?',
        options: ['Bobur Mirzo', 'Mirzo Ulug‘bek', 'Shohrux Mirzo', 'Husayn Boyqaro'],
        correctIndex: 1,
        explanation: 'Mirzo Ulug‘bek Samarqandda radiusi 40 metr bo‘lgan yerosti sekstantini barpo etib, 1018 ta yulduz harakatini aniq hisoblab chiqqan ("Ziji jadidi Ko‘ragoniy").',
        funFact: 'Ulug‘bek bir yilning davomiyligini hisoblaganda zamonaviy atom soatlaridan atigi 25 soniyaga farq qilgan!'
      },
      {
        id: 'hist_5',
        category: 'history',
        difficulty: 'advanced',
        question: '751-yildagi Talas jangi natijasida qaysi muhim ixtiro Samarqandga, keyinchalik Yevropaga tarqalgan?',
        options: ['Porox', 'Qog‘oz ishlab chiqarish', 'Kompas', 'Bosma harflar'],
        correctIndex: 1,
        explanation: 'Jangdan so‘ng Samarqandga kelgan hunarmandlar ipak va tut daraxti po‘stlog‘idan qog‘oz ishlab chiqarishni yo‘lga qo‘yib, Samarqandni Ipak yo‘lining qog‘oz poytaxtiga aylantirishgan.',
        funFact: 'Samarqand qog‘ozi silliqligi, chidamliligi va asrlar davomida saqlanishi bilan butun dunyoda yuqori baholangan.'
      },
      {
        id: 'hist_6',
        category: 'history',
        difficulty: 'advanced',
        question: '1220-yilda Buxoroga bostirib kirgan Chingizxon uning mahobati va balandligidan hayratlanib buzmaslikka buyurgan obida qaysi?',
        options: [
          'Ark qal’asi',
          'Minorai Kalon',
          'Chor Minor',
          'Bolo Havuz masjidi'
        ],
        correctIndex: 1,
        explanation: '1127-yilda qurilgan 45.6 metrli Minorai Kalon o‘zining mustahkamligi va muazzam bezaklari tufayli Chingizxon tomonidan vayron qilinmagan.',
        funFact: 'Minoraning 14 ta alohida halqasidagi har bir naqsh o‘ziga xos takrorlanmas ganch va pishiq g‘isht geometriyasiga ega.'
      }
    ]
  },
  en: {
    geography: [
      {
        id: 'geo_1',
        category: 'geography',
        difficulty: 'beginner',
        question: 'What is the capital city of Uzbekistan, renowned as a central transport and cultural hub of Central Asia?',
        options: ['Samarkand', 'Bukhara', 'Tashkent', 'Khiva'],
        correctIndex: 2,
        explanation: 'Tashkent is the capital and largest metropolis of Uzbekistan, known for its tree-lined avenues, monumental plazas, and ornate subway stations.',
        funFact: 'Tashkent’s metro system was the first underground transit system built in Central Asia (1977).'
      },
      {
        id: 'geo_2',
        category: 'geography',
        difficulty: 'beginner',
        question: 'Which of the following mountain ranges contains Mount Everest, the highest peak above sea level on Earth?',
        options: ['The Andes', 'The Alps', 'The Himalayas', 'The Rockies'],
        correctIndex: 2,
        explanation: 'The Himalayas stretch across five countries in Asia: India, Nepal, Bhutan, China, and Pakistan, crowned by Mount Everest at 8,848.86 meters.',
        funFact: 'The Himalayas continue to rise roughly 5 millimeters per year due to the ongoing tectonic collision of India into the Eurasian plate.'
      },
      {
        id: 'geo_3',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'Uzbekistan and Liechtenstein share a rare geographical distinction. What is it?',
        options: [
          'They are the only two doubly landlocked countries in the world',
          'They both have zero natural rivers',
          'They are located at the exact same latitude',
          'They have no mountain ranges'
        ],
        correctIndex: 0,
        explanation: 'A doubly landlocked country is completely surrounded by countries that are themselves also landlocked. Only Uzbekistan and Liechtenstein hold this status worldwide.',
        funFact: 'To reach a world ocean from Uzbekistan, you must cross at least two international national borders.'
      },
      {
        id: 'geo_4',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'Which river flows through Uzbekistan and was historically known by the ancient Greeks as the Oxus?',
        options: ['Syr Darya', 'Amu Darya', 'Zarafshan', 'Irtysh'],
        correctIndex: 1,
        explanation: 'The Amu Darya river, called Oxus by classical Greek historians like Arrian and Strabo, historically drained from the Pamir mountains towards the Aral Sea.',
        funFact: 'Alexander the Great crossed the Oxus river using animal-skin rafts filled with straw during his march in 329 BCE.'
      },
      {
        id: 'geo_5',
        category: 'geography',
        difficulty: 'advanced',
        question: 'What is the deepest known location on Earth’s oceanic crust, located in the western Pacific Ocean?',
        options: ['Puerto Rico Trench', 'Challenger Deep (Mariana Trench)', 'Java Trench', 'Milwaukee Deep'],
        correctIndex: 1,
        explanation: 'Challenger Deep in the southern Mariana Trench plunges to approximately 10,994 meters (nearly 11 km) below sea level, where hydrostatic pressure exceeds 1,000 atmospheres.',
        funFact: 'If Mount Everest were placed into the Mariana Trench, its peak would still be submerged under more than 2 kilometers of water.'
      },
      {
        id: 'geo_6',
        category: 'geography',
        difficulty: 'advanced',
        question: 'The Kyzylkum Desert, whose name translates from Turkic languages as "Red Sand", is predominantly situated between which two rivers?',
        options: [
          'Amu Darya and Syr Darya',
          'Tigris and Euphrates',
          'Indus and Ganges',
          'Danube and Volga'
        ],
        correctIndex: 0,
        explanation: 'The Kyzylkum Desert covers roughly 298,000 square kilometers in Central Asia between the Amu Darya and Syr Darya river basins, spanning Uzbekistan and Kazakhstan.',
        funFact: 'The desert contains remarkable Cretaceous vertebrate fossil beds, including numerous theropod dinosaur skeletons.'
      }
    ],
    history: [
      {
        id: 'hist_1',
        category: 'history',
        difficulty: 'beginner',
        question: 'Which ancient wonder of the world is the only one of the original Seven Wonders still standing today?',
        options: [
          'Hanging Gardens of Babylon',
          'Lighthouse of Alexandria',
          'Colossus of Rhodes',
          'Great Pyramids of Giza'
        ],
        correctIndex: 3,
        explanation: 'The Great Pyramid of Giza was constructed during the Fourth Dynasty of Egypt around 2560 BCE and has endured for over 4,500 years.',
        funFact: 'It was originally clad in polished white Tura limestone that reflected dazzling sunlight.'
      },
      {
        id: 'hist_2',
        category: 'history',
        difficulty: 'beginner',
        question: 'Which Central Asian city is famous for Registan Square and served as the imperial capital of Amir Timur?',
        options: ['Bukhara', 'Samarkand', 'Khiva', 'Kokand'],
        correctIndex: 1,
        explanation: 'Samarkand was selected by Amir Timur (Tamerlane) in 1370 to be the magnificent capital of his empire, adorned with turquoise-tiled madrasahs, domes, and celestial gardens.',
        funFact: 'Alexander the Great once declared: "Everything I have heard of Marakanda is true, except that it is more beautiful than I ever imagined."'
      },
      {
        id: 'hist_3',
        category: 'history',
        difficulty: 'intermediate',
        question: 'The mathematical term "Algebra" derives from the book "Kitab al-Jabr wa-l-Muqabala", written by which polymath from Khwarazm (modern Uzbekistan)?',
        options: [
          'Ibn Sina (Avicenna)',
          'Al-Khwarizmi',
          'Al-Biruni',
          'Omar Khayyam'
        ],
        correctIndex: 1,
        explanation: 'Muhammad ibn Musa al-Khwarizmi (c. 780–850 CE) pioneered systemic methods for solving linear and quadratic equations. The term "algorithm" is also derived from his name.',
        funFact: 'Al-Khwarizmi’s Latinized translations introduced the revolutionary Hindu-Arabic numeral system (including zero) to medieval Europe.'
      },
      {
        id: 'hist_4',
        category: 'history',
        difficulty: 'intermediate',
        question: 'In 1428 CE, which Timurid astronomer-ruler built a colossal subterranean sextant in Samarkand to measure star positions with unprecedented accuracy?',
        options: ['Babur', 'Ulugh Beg', 'Shah Rukh', 'Mirzo Ulugbek'],
        correctIndex: 1,
        explanation: 'Ulugh Beg constructed a 40-meter radius meridian sextant at his Samarkand observatory, cataloging 1,018 stars in his monumental "Zij-i Sultani".',
        funFact: 'Ulugh Beg calculated the length of the tropical year with an error of only 25 seconds compared to modern atomic clock measurements!'
      },
      {
        id: 'hist_5',
        category: 'history',
        difficulty: 'advanced',
        question: 'The Battle of Talas in 751 CE led directly to the transmission of which crucial invention to Central Asia and later Europe?',
        options: ['Gunpowder', 'Papermaking', 'The Magnetic Compass', 'Movable Type'],
        correctIndex: 1,
        explanation: 'Chinese artisans captured after the battle revealed the secret of mulberry rag papermaking in Samarkand, establishing it as the premier paper manufacturing capital of the Silk Road.',
        funFact: 'Samarkand paper was celebrated for centuries for its smooth glazed surface and resistance to humidity.'
      },
      {
        id: 'hist_6',
        category: 'history',
        difficulty: 'advanced',
        question: 'Which monument in Bukhara was spared from destruction by Genghis Khan in 1220 CE because he was reportedly awestruck by its monumental height?',
        options: [
          'The Ark Fortress',
          'The Kalyan Minaret',
          'Chor Minor',
          'Bolo Hauz Mosque'
        ],
        correctIndex: 1,
        explanation: 'The 45.6-meter-tall Kalyan Minaret, constructed in 1127 CE, so impressed Genghis Khan that he ordered it spared while surrounding structures were leveled.',
        funFact: 'Its 14 distinct decorative brick bands each showcase unique geometric patterns baked from local ganch clay.'
      }
    ]
  },
  ru: {
    geography: [
      {
        id: 'geo_1',
        category: 'geography',
        difficulty: 'beginner',
        question: 'Какой город является столицей Узбекистана и крупнейшим культурным и транспортным узлом Центральной Азии?',
        options: ['Самарканд', 'Бухара', 'Ташкент', 'Хива'],
        correctIndex: 2,
        explanation: 'Ташкент — столица Узбекистана, известная тенистыми аллеями, просторными площадями и уникальным метрополитеном.',
        funFact: 'Ташкентский метрополитен, открытый в 1977 году, стал первой подземной железной дорогой в Центральной Азии.'
      },
      {
        id: 'geo_2',
        category: 'geography',
        difficulty: 'beginner',
        question: 'В какой горной системе находится Эверест (Джомолунгма) — высочайшая вершина планеты над уровнем моря?',
        options: ['Анды', 'Альпы', 'Гималаи', 'Скалистые горы'],
        correctIndex: 2,
        explanation: 'Гималаи проходят через пять государств Азии, а их пик достигает высоты 8848.86 метров.',
        funFact: 'Из-за движения тектонических плит Гималаи продолжают расти примерно на 5 миллиметров каждый год.'
      },
      {
        id: 'geo_3',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'Какое редкое географическое свойство объединяет Узбекистан и Лихтенштейн?',
        options: [
          'Они являются единственными в мире государствами, дважды не имеющими выхода к морю',
          'На их территории нет ни одной естественной реки',
          'Они находятся на одной и той же географической широте',
          'В них полностью отсутствуют горы'
        ],
        correctIndex: 0,
        explanation: 'Государство, дважды не имеющее выхода к морю, окружено странами, которые сами также не имеют выхода к Мировому океану. В мире такой статус имеют только Узбекистан и Лихтенштейн.',
        funFact: 'Чтобы добраться из Узбекистана до Мирового океана, необходимо пересечь границы как минимум двух государств.'
      },
      {
        id: 'geo_4',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'Какая река протекает по Узбекистану и в древнегреческих источниках упоминалась как Окс?',
        options: ['Сырдарья', 'Амударья', 'Зарафшан', 'Иртыш'],
        correctIndex: 1,
        explanation: 'Река Амударья, называвшаяся Оксом (Oxus) у древних греков, веками питала оазисы Великого шелкового пути.',
        funFact: 'Александр Македонский в 329 году до н.э. переправился через Амударью с помощью кожаных мешков, набитых соломой.'
      },
      {
        id: 'geo_5',
        category: 'geography',
        difficulty: 'advanced',
        question: 'Где находится глубочайшая известная точка земной коры — бездна Челленджера в Марианском желобе?',
        options: ['Атлантический океан', 'Тихий океан', 'Индийский океан', 'Северный Ледовитый океан'],
        correctIndex: 1,
        explanation: 'Бездна Челленджера в западной части Тихого океана опускается на глубину почти 11 000 метров, где давление превышает 1000 атмосфер.',
        funFact: 'Если поместить Эверест на дно Марианской впадины, над его вершиной останется еще более 2 километров воды.'
      },
      {
        id: 'geo_6',
        category: 'geography',
        difficulty: 'advanced',
        question: 'Между какими двумя реками преимущественно расположена пустыня Кызылкум?',
        options: [
          'Амударья и Сырдарья',
          'Тигр и Евфрат',
          'Инд и Ганг',
          'Дунай и Волга'
        ],
        correctIndex: 0,
        explanation: 'Пустыня Кызылкум («Красные пески») занимает обширную территорию в междуречье Амударьи и Сырдарьи в Центральной Азии.',
        funFact: 'В Кызылкуме обнаружены ценнейшие окаменелости динозавров мелового периода.'
      }
    ],
    history: [
      {
        id: 'hist_1',
        category: 'history',
        difficulty: 'beginner',
        question: 'Какое из семи чудес Древнего мира является единственным, сохранившимся до наших дней?',
        options: [
          'Висячие сады Семирамиды',
          'Александрийский маяк',
          'Колосс Родосский',
          'Пирамиды Гизы (Египет)'
        ],
        correctIndex: 3,
        explanation: 'Великая пирамида в Гизе была построена около 2560 года до н.э. и стоит уже более 4500 лет.',
        funFact: 'Изначально пирамида была облицована полированным белым известняком, сверкавшим на солнце.'
      },
      {
        id: 'hist_2',
        category: 'history',
        difficulty: 'beginner',
        question: 'Какой город Центральной Азии прославлен площадью Регистан и служил столицей империи Амира Тимура?',
        options: ['Бухара', 'Самарканд', 'Хива', 'Коканд'],
        correctIndex: 1,
        explanation: 'Самарканд был выбран Амиром Тимуром в 1370 году в качестве великолепной столицы его державы, украшенной бирюзовыми куполами и медресе.',
        funFact: 'Александр Македонский воскликнул: «Все, что я слышал о Мараканде — правда, кроме того, что она еще прекраснее, чем я воображал». '
      },
      {
        id: 'hist_3',
        category: 'history',
        difficulty: 'intermediate',
        question: 'Математический термин «Алгебра» произошел от трактата ученого из Хорезма (современный Узбекистан). Кто он?',
        options: ['Ибн Сина', 'Аль-Хорезми', 'Аль-Бируни', 'Омар Хайям'],
        correctIndex: 1,
        explanation: 'Мухаммад аль-Хорезми заложил основы алгебры как самостоятельной науки. От его имени также произошло слово «алгоритм».',
        funFact: 'Труды Аль-Хорезми познакомили средневековую Европу с десятичной позиционной системой и числом ноль.'
      },
      {
        id: 'hist_4',
        category: 'history',
        difficulty: 'intermediate',
        question: 'Какой правитель и ученый построил в 1428 году в Самарканде обсерваторию с гигантским секстантом?',
        options: ['Бабур', 'Мирзо Улугбек', 'Шахрух', 'Хусейн Байкара'],
        correctIndex: 1,
        explanation: 'Мирзо Улугбек создал в Самарканде уникальный 40-метровый секстант и составил каталог 1018 звезд («Зидж-и Султани»).',
        funFact: 'Улугбек рассчитал продолжительность звездного года с точностью до 25 секунд относительно современных атомных часов!'
      },
      {
        id: 'hist_5',
        category: 'history',
        difficulty: 'advanced',
        question: 'Какое важнейшее изобретение проникло в Центральную Азию и далее в Европу после Таласской битвы 751 года?',
        options: ['Порох', 'Производство бумаги', 'Магнитный компас', 'Печатный станок'],
        correctIndex: 1,
        explanation: 'Китайские мастера открыли в Самарканде секрет изготовления высококачественной бумаги из шелка и коры тутового дерева.',
        funFact: 'Самаркандская бумага ценилась веками за идеальную гладкость и долговечность.'
      },
      {
        id: 'hist_6',
        category: 'history',
        difficulty: 'advanced',
        question: 'Какой памятник Бухары Чингисхан пощадил в 1220 году, будучи поражен его высотой и величием?',
        options: [
          'Крепость Арк',
          'Минарет Калян',
          'Чор-Минор',
          'Мечеть Боло-хауз'
        ],
        correctIndex: 1,
        explanation: 'Минарет Калян высотой 45.6 метров, возведенный в 1127 году, настолько восхитил Чингисхана, что он приказал сохранить его невредимым.',
        funFact: 'Минарет украшен 14 поясами уникальной рельефной кирпичной кладки, ни один из которых не повторяется.'
      }
    ]
  },
  ar: {
    geography: [
      {
        id: 'geo_1',
        category: 'geography',
        difficulty: 'beginner',
        question: 'ما هي عاصمة أوزبكستان والمركز الثقافي والنقل الرئيسي في آسيا الوسطى؟',
        options: ['سمرقند', 'بخارى', 'طشقند', 'خيوة'],
        correctIndex: 2,
        explanation: 'طشقند هي العاصمة وأكبر مدن أوزبكستان، وتشتهر بحدائقها الواسعة ومحطات المترو المزخرفة الفريدة.',
        funFact: 'مترو طشقند الذي افتتح عام 1977 كان أول شبكة قطار أنفاق تُبنى في آسيا الوسطى.'
      },
      {
        id: 'geo_2',
        category: 'geography',
        difficulty: 'beginner',
        question: 'في أي سلسلة جبلية تقع قمة إيفرست، أعلى نقطة فوق مستوى سطح البحر على كوكب الأرض؟',
        options: ['جبال الأنديز', 'جبال الألب', 'جبال الهيمالايا', 'جبال روكي'],
        correctIndex: 2,
        explanation: 'تمتد جبال الهيمالايا عبر 5 دول آسيوية، ويصل ارتفاع قمة إيفرست إلى 8,848.86 متراً.',
        funFact: 'ترتفع جبال الهيمالايا بمعدل 5 ملم سنوياً نتيجة الاصطدام التكتوني المستمر لشبه القارة الهندية بآسيا.'
      },
      {
        id: 'geo_3',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'ما هي الميزة الجغرافية النادرة المشتركة بين أوزبكستان وليختنشتاين؟',
        options: [
          'هما الدولتان الوحيدتان في العالم غير الساحليتان والمحاطتان بدول غير ساحلية تماماً',
          'لا يحتويان على أي أنهار طبيعية',
          'تقعان على نفس خط العرض الجغرافي تماماً',
          'لا توجد بهما أي جبال'
        ],
        correctIndex: 0,
        explanation: 'الدولة الحبيسة المزدوجة هي دولة غير ساحلية ومحاطة فقط بدول غير ساحلية أيضاً، ولا توجد في العالم سوى أوزبكستان وليختنشتاين بهذا الوصف.',
        funFact: 'للوصول إلى المحيط المفتوح من أوزبكستان، يتعين عليك عبور حدود دولتين أجنبيتين على الأقل.'
      },
      {
        id: 'geo_4',
        category: 'geography',
        difficulty: 'intermediate',
        question: 'ما هو النهر الذي يمر عبر أوزبكستان وكان يُعرف لدى الإغريق القدماء باسم "نهر أوكسوس"؟',
        options: ['سير داريا', 'آمو داريا (جيحون)', 'زرافشان', 'إرتيش'],
        correctIndex: 1,
        explanation: 'نهر آمو داريا (المعروف تاريخياً بنهر جيحون وأوكسوس) ينبع من جبال بامير وكان شريان الحياة لمدن طريق الحرير.',
        funFact: 'عبر الإسكندر الأكبر نهر آمو داريا عام 329 ق.م باستخدام أطواف مصنوعة من جلود الحيوانات المحشوة بالقش.'
      },
      {
        id: 'geo_5',
        category: 'geography',
        difficulty: 'advanced',
        question: 'أين تقع أعمق نقطة معروفة في القشرة المحيطية لكوكب الأرض (خندق ماريانا - تشالنجر ديب)؟',
        options: ['المحيط الأطلسي', 'المحيط الهادئ', 'المحيط الهندي', 'المحيط المتجمد الشمالي'],
        correctIndex: 1,
        explanation: 'تنحدر نقطة تشالنجر ديب في غرب المحيط الهادئ إلى عمق يقارب 11,000 متر تحت سطح البحر حيث يتجاوز الضغط 1000 ضغط جوي.',
        funFact: 'إذا وضع جبل إيفرست في خندق ماريانا، فستظل قمته مغمورة بأكثر من كيلومترين من المياه.'
      },
      {
        id: 'geo_6',
        category: 'geography',
        difficulty: 'advanced',
        question: 'تقع صحراء قيزيل قوم (الرمال الحمراء) أساساً بين أي نهرين؟',
        options: [
          'آمو داريا وسير داريا',
          'دجلة والفرات',
          'السند والغانج',
          'الدانوب والفولغا'
        ],
        correctIndex: 0,
        explanation: 'تمتد صحراء قيزيل قوم في آسيا الوسطى بين حوضي نهري آمو داريا وسير داريا عبر أوزبكستان وكازاخستان.',
        funFact: 'تحتوي صحراء قيزيل قوم على طبقات غنية بمستحاثات وهياكل ديناصورات تعود للعصر الطباشيري.'
      }
    ],
    history: [
      {
        id: 'hist_1',
        category: 'history',
        difficulty: 'beginner',
        question: 'أي من عجائب العالم القديم السبع هي الوحيدة التي لا تزال قائمة حتى اليوم؟',
        options: [
          'حدائق بابل المعلقة',
          'منارة الإسكندرية',
          'عملاق رودس',
          'أهرامات الجيزة (مصر)'
        ],
        correctIndex: 3,
        explanation: 'بُني الهرم الأكبر بالجيزة في عهد الأسرة الرابعة المصرية حوالي 2560 ق.م وصمد لأكثر من 4500 عام.',
        funFact: 'كان الهرم مغطى بطبقة من الحجر الجيري الأبيض المصقول التي كانت تعكس ضوء الشمس كمنارة.'
      },
      {
        id: 'hist_2',
        category: 'history',
        difficulty: 'beginner',
        question: 'أي مدينة في آسيا الوسطى تشتهر بميدان ريجستان وكانت عاصمة إمبراطورية الأمير تيمورلنك؟',
        options: ['بخارى', 'سمرقند', 'خيوة', 'خوقند'],
        correctIndex: 1,
        explanation: 'اختار تيمورلنك سمرقند عام 1370 لتكون العاصمة العظيمة لإمبراطوريته، وزينها بالمدارس والقباب الفيروزية.',
        funFact: 'قال الإسكندر الأكبر: "كل ما سمعته عن مراكندا (سمرقند) كان صحيحاً، إلا أنها أجمل بكثير مما تخيلت".'
      },
      {
        id: 'hist_3',
        category: 'history',
        difficulty: 'intermediate',
        question: 'اشتق مصطلح "الجبر" من كتاب كتبه العالم الموسوعي محمد بن موسى الخوارزمي، من أين تعود أصوله؟',
        options: ['ابن سينا', 'الخوارزمي (خوارزم، أوزبكستان)', 'البيروني', 'عمر الخيام'],
        correctIndex: 1,
        explanation: 'أسس محمد بن موسى الخوارزمي علم الجبر بكتابه "المختصر في حساب الجبر والمقابلة"، واشتق اسم الخوارزمية (Algorithm) من اسمه.',
        funFact: 'قدمت ترجمات أعمال الخوارزمي الأرقام الهندية-العربية ومفهوم الصفر إلى أوروبا في العصور الوسطى.'
      },
      {
        id: 'hist_4',
        category: 'history',
        difficulty: 'intermediate',
        question: 'في عام 1428م، من هو الحاكم والفلكي التيموري الذي بنى مرصداً ضخماً بسدس عملاق في سمرقند لدراسة النجوم؟',
        options: ['ظهير الدين بابر', 'ميرزا أولوغ بك', 'شاه رخ', 'حسين بايقرا'],
        correctIndex: 1,
        explanation: 'بنى أولوغ بك في سمرقند سدساً فلكياً بنصف قطر 40 متراً، ووضع جدولاً دقيقاً لحركة 1018 نجماً (زيج أولوغ بك).',
        funFact: 'حسب أولوغ بك طول السنة الفلكية بفارق 25 ثانية فقط مقارنة بالحسابات الذرية الحديثة!'
      },
      {
        id: 'hist_5',
        category: 'history',
        difficulty: 'advanced',
        question: 'ما هو الاختراع الهام الذي انتقل إلى آسيا الوسطى ثم أوروبا نتيجة معركة طلاس عام 751م؟',
        options: ['البارود', 'صناعة الورق', 'البوصلة المغناطيسية', 'حروف الطباعة'],
        correctIndex: 1,
        explanation: 'نقل الحرفيون بعد المعركة سر صناعة الورق من ألياف التوت والكتان إلى سمرقند، لتصبح عاصمة صناعة الورق لطريق الحرير.',
        funFact: 'اشتهر ورق سمرقند لقرون بنعومة ملمسه ومقاومته للرطوبة وتلف الحشرات.'
      },
      {
        id: 'hist_6',
        category: 'history',
        difficulty: 'advanced',
        question: 'ما هو المعلم البارز في بخارى الذي عفا عنه جنكيز خان عام 1220م بعد أن أذهله ارتفاعه وجمال بنائه؟',
        options: [
          'قلعة آرك',
          'مئذنة كالان (المئذنة الكبرى)',
          'تشور مينار (المآذن الأربع)',
          'مسجد بولو حوض'
        ],
        correctIndex: 1,
        explanation: 'بُنيت مئذنة كالان عام 1127م بارتفاع 45.6 متراً، وقد أعجب جنكيز خان بعظمتها فأمر بالإبقاء عليها دون تدمير.',
        funFact: 'تحتوي المئذنة على 14 حزاماً زخرفياً من الطوب المحروق بتصميمات هندسية فريدة لا تتكرر.'
      }
    ]
  }
};

/**
 * Returns localized quiz questions with fallback to Uzbek ('uz') if not found.
 */
export function getLocalizedQuizQuestions(category: 'geography' | 'history', lang: Language): QuizQuestion[] {
  const langBank = quizBank[lang] || quizBank['uz'];
  if (langBank && langBank[category] && langBank[category].length > 0) {
    return langBank[category];
  }
  // Fallback to Uzbek
  return quizBank['uz'][category];
}

// Backward compatibility exports
export const geographyQuestions = quizBank.uz.geography;
export const historyQuestions = quizBank.uz.history;
