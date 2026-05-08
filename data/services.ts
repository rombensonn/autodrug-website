export type PriceItem = {
  name: string;
  price: string;
  description?: string;
  offerPrice?: number;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  priceFrom: string;
  offerPrice?: number;
  services: PriceItem[];
  faq: ServiceFaq[];
  symptoms: string[];
  steps: string[];
  relatedServices: string[];
  image: string;
};

export type PriceGroup = {
  slug: string;
  title: string;
  items: PriceItem[];
};

const commonSteps = [
  "Диагностика и осмотр узла.",
  "Объясняем причину неисправности простыми словами.",
  "Согласовываем стоимость работ и запчасти.",
  "Выполняем ремонт и проверяем результат."
];

const commonFaq = (service: string): ServiceFaq[] => [
  {
    question: `Можно ли записаться на ${service.toLowerCase()} заранее?`,
    answer:
      "Да, можно выбрать удобную дату и время. Для срочного обращения лучше позвонить, чтобы уточнить свободное окно."
  },
  {
    question: "Цена будет известна до начала работ?",
    answer:
      "Да. Сначала мастер проводит осмотр или диагностику, затем согласует стоимость. Ремонт начинается только после согласования."
  },
  {
    question: "Можно ли приехать со своими запчастями?",
    answer:
      "Можно. Если деталь не подходит или есть риск по качеству, мастер предупредит до начала ремонта."
  },
  {
    question: "Помогаете ли с запчастями?",
    answer:
      "Да, подскажем, что нужно заменить, и поможем подобрать варианты по цене."
  }
];

export const priceGroups: PriceGroup[] = [
  {
    slug: "shinomontazh",
    title: "Шиномонтаж",
    items: [
      {
        name: "Снятие/установка колес",
        price: "от 150 ₽ за 1 шт.",
        description:
          "Снятие и установка резины R10-R24, включая низкопрофильную и RUNFLAT.",
        offerPrice: 150
      },
      { name: "Балансировка R10-R24", price: "от 160 ₽", offerPrice: 160 },
      { name: "Замена и ремонт камер", price: "от 250 ₽", offerPrice: 250 },
      {
        name: "Ремонт бескамерных покрышек",
        price: "от 500 ₽",
        offerPrice: 500
      },
      {
        name: "Сезонное хранение колес",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      { name: "Правка дисков", price: "от 500 ₽", offerPrice: 500 },
      {
        name: "Дошиповка зимней шины",
        price: "от 30 ₽ за 1 шт.",
        offerPrice: 30
      }
    ]
  },
  {
    slug: "dvigatel",
    title: "Двигатель",
    items: [
      { name: "Экспресс-замена масла", price: "от 1000 ₽", offerPrice: 1000 },
      {
        name: "Снятие/установка двигателя",
        price: "от 25000 ₽",
        offerPrice: 25000
      },
      {
        name: "Капитальный ремонт двигателя",
        price: "от 70000 ₽",
        offerPrice: 70000
      },
      { name: "Замена цепи ГРМ", price: "от 15000 ₽", offerPrice: 15000 },
      { name: "Замена ремня ГРМ", price: "от 7000 ₽", offerPrice: 7000 },
      {
        name: "Замена прокладок и сальников",
        price: "от 7000 ₽",
        offerPrice: 7000
      },
      { name: "Замена поддона", price: "от 3000 ₽", offerPrice: 3000 },
      {
        name: "Замена и ремонт масляных насосов",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      {
        name: "Замена опор двигателя и КПП",
        price: "от 1500 ₽",
        offerPrice: 1500
      },
      {
        name: "Установка защиты картера",
        price: "от 1500 ₽",
        offerPrice: 1500
      },
      {
        name: "Замена приводных ремней",
        price: "от 2000 ₽",
        offerPrice: 2000
      },
      {
        name: "Чистка дроссельных заслонок и карбюраторов",
        price: "от 1500 ₽",
        offerPrice: 1500
      },
      { name: "Замена свечей", price: "от 2000 ₽", offerPrice: 2000 },
      { name: "Замена фильтров", price: "от 400 ₽", offerPrice: 400 }
    ]
  },
  {
    slug: "tormoza",
    title: "Тормозная система",
    items: [
      { name: "Замена тормозных колодок", price: "от 1000 ₽", offerPrice: 1000 },
      {
        name: "Прокачка тормозной системы",
        price: "от 800 ₽",
        offerPrice: 800
      },
      {
        name: "Замена тормозной жидкости",
        price: "от 800 ₽",
        offerPrice: 800
      },
      {
        name: "Замена тормозных шлангов",
        price: "от 1000 ₽",
        offerPrice: 1000
      },
      {
        name: "Замена тормозных дисков",
        price: "от 2000 ₽",
        offerPrice: 2000
      },
      {
        name: "Замена тормозных барабанов",
        price: "от 2500 ₽",
        offerPrice: 2500
      },
      {
        name: "Ремонт и замена тормозных суппортов и цилиндров",
        price: "от 2000 ₽",
        offerPrice: 2000
      },
      {
        name: "Замена тормозных трубок",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      {
        name: "Ремонт и замена усилителей тормозов",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      {
        name: "Ремонт стояночной тормозной системы",
        price: "от 1500 ₽",
        offerPrice: 1500
      },
      {
        name: "Изготовление тормозных трубок",
        price: "от 4000 ₽",
        offerPrice: 4000
      },
      {
        name: "Замена датчиков и блоков ABS",
        price: "от 1000 ₽",
        offerPrice: 1000
      }
    ]
  },
  {
    slug: "podveska",
    title: "Подвеска",
    items: [
      {
        name: "Замена амортизаторов и амортизационных стоек",
        price: "от 2500 ₽",
        offerPrice: 2500
      },
      { name: "Замена пружин подвески", price: "от 2500 ₽", offerPrice: 2500 },
      { name: "Замена шаровых опор", price: "от 1500 ₽", offerPrice: 1500 },
      { name: "Замена рычагов подвески", price: "от 2500 ₽", offerPrice: 2500 },
      {
        name: "Замена и ремонт реактивных тяг",
        price: "от 2500 ₽",
        offerPrice: 2500
      },
      { name: "Замена опорных подшипников", price: "от 2500 ₽", offerPrice: 2500 },
      { name: "Замена сайлентблоков", price: "от 1000 ₽", offerPrice: 1000 },
      {
        name: "Замена втулок и стоек стабилизатора",
        price: "от 1000 ₽",
        offerPrice: 1000
      },
      {
        name: "Замена ступиц и ступичных подшипников",
        price: "от 3000 ₽",
        offerPrice: 3000
      }
    ]
  },
  {
    slug: "rulevoe",
    title: "Рулевое управление",
    items: [
      {
        name: "Замена рулевых наконечников",
        price: "от 1000 ₽",
        offerPrice: 1000
      },
      { name: "Замена жидкости ГУР", price: "от 1000 ₽", offerPrice: 1000 },
      { name: "Замена рулевых реек", price: "от 6000 ₽", offerPrice: 6000 },
      {
        name: "Замена пыльников рулевых реек",
        price: "от 2000 ₽",
        offerPrice: 2000
      },
      { name: "Замена рулевых тяг", price: "от 2000 ₽", offerPrice: 2000 },
      { name: "Замена насосов ГУР", price: "от 3000 ₽", offerPrice: 3000 },
      {
        name: "Замена и ремонт рулевых редукторов и маятников",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      {
        name: "Замена шлангов и трубок ГУР",
        price: "от 3000 ₽",
        offerPrice: 3000
      }
    ]
  },
  {
    slug: "diagnostika",
    title: "Диагностика автомобиля",
    items: [
      { name: "Диагностика двигателя", price: "от 1500 ₽", offerPrice: 1500 },
      {
        name: "Диагностика подвески и тормозной системы",
        price: "от 1000 ₽",
        offerPrice: 1000
      },
      { name: "Замер компрессии", price: "от 2000 ₽", offerPrice: 2000 },
      { name: "Замер давления масла", price: "от 2000 ₽", offerPrice: 2000 },
      {
        name: "Замер давления в топливной системе",
        price: "от 2000 ₽",
        offerPrice: 2000
      },
      { name: "Компьютерная диагностика автомобиля", price: "цена уточняется" }
    ]
  },
  {
    slug: "ohlazhdenie",
    title: "Система охлаждения",
    items: [
      {
        name: "Промывка основного радиатора",
        price: "от 2500 ₽",
        offerPrice: 2500
      },
      { name: "Промывка радиатора печки", price: "от 3500 ₽", offerPrice: 3500 },
      {
        name: "Промывка системы охлаждения",
        price: "от 4000 ₽",
        offerPrice: 4000
      },
      { name: "Чистка радиаторов", price: "от 2500 ₽", offerPrice: 2500 }
    ]
  },
  {
    slug: "transmissiya",
    title: "Трансмиссия",
    items: [
      {
        name: "Замена сальников, пыльников, прокладок",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      { name: "Замена крестовин", price: "от 2500 ₽", offerPrice: 2500 },
      {
        name: "Замена раздаточных коробок",
        price: "от 10000 ₽",
        offerPrice: 10000
      },
      { name: "Замена сцепления", price: "от 10000 ₽", offerPrice: 10000 },
      { name: "Ремонт привода сцепления", price: "цена уточняется" },
      {
        name: "Замена и ремонт карданных валов",
        price: "от 2000 ₽",
        offerPrice: 2000
      },
      { name: "Замена МКПП и АКПП", price: "от 15000 ₽", offerPrice: 15000 }
    ]
  },
  {
    slug: "vyhlop",
    title: "Выхлопная система",
    items: [
      { name: "Замена резонаторов", price: "от 1500 ₽", offerPrice: 1500 },
      { name: "Сварочные работы", price: "от 1000 ₽", offerPrice: 1000 },
      {
        name: "Замена кислородного датчика",
        price: "от 1500 ₽",
        offerPrice: 1500
      },
      { name: "Замена катализатора", price: "от 3000 ₽", offerPrice: 3000 },
      {
        name: "Замена и установка гофры",
        price: "от 3000 ₽",
        offerPrice: 3000
      },
      { name: "Ремонт глушителей", price: "цена уточняется" }
    ]
  },
  {
    slug: "prochie",
    title: "Прочие услуги",
    items: [
      { name: "Ремонт карбюраторов", price: "от 2000 ₽", offerPrice: 2000 },
      {
        name: "Пескоструй и защита от коррозии",
        price: "от 1000 ₽",
        offerPrice: 1000
      },
      { name: "Оклейка автомобиля", price: "от 3000 ₽", offerPrice: 3000 },
      { name: "Чистка форсунок стендовая", price: "цена уточняется" },
      { name: "Установка фаркопа", price: "цена уточняется" },
      { name: "Сварочные работы", price: "от 1000 ₽", offerPrice: 1000 },
      { name: "Выездная диагностика автомобиля", price: "цена уточняется" },
      { name: "Установка парктроника", price: "цена уточняется" },
      { name: "Ремонт автоэлектрики", price: "цена уточняется" },
      { name: "Ремонт стартера", price: "цена уточняется" },
      { name: "Ремонт генератора", price: "цена уточняется" },
      { name: "Ремонт фар", price: "цена уточняется" },
      { name: "Удаление катализаторов", price: "цена уточняется" },
      { name: "Проточка тормозных дисков", price: "цена уточняется" }
    ]
  }
];

const group = (slug: string) => priceGroups.find((item) => item.slug === slug)!;

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "shinomontazh",
    title: "Шиномонтаж",
    shortDescription:
      "Сезонная переобувка, балансировка, ремонт проколов, RUNFLAT и хранение колес.",
    longDescription:
      "Выполняем шиномонтаж R10-R24 в Балашихе: снятие и установка колес, балансировка, ремонт бескамерных покрышек, замена камер, правка дисков и сезонное хранение. Работаем с низкопрофильной резиной и RUNFLAT.",
    seoTitle: "Шиномонтаж в Балашихе R10-R24 - Авто друг",
    seoDescription:
      "Шиномонтаж R10-R24 в Балашихе: снятие и установка колес, балансировка, ремонт проколов, RUNFLAT, правка дисков и сезонное хранение.",
    h1: "Шиномонтаж в Балашихе для колес R10-R24",
    priceFrom: "от 150 ₽",
    offerPrice: 150,
    services: group("shinomontazh").items,
    symptoms: [
      "Нужна сезонная переобувка.",
      "Появилась вибрация на скорости.",
      "Прокол или медленно спускает колесо.",
      "Нужна балансировка после замены шин.",
      "Требуется работа с RUNFLAT или низким профилем."
    ],
    steps: commonSteps,
    faq: [
      ...commonFaq("шиномонтаж"),
      {
        question: "Какие размеры колес обслуживаете?",
        answer: "Работаем с колесами R10-R24, включая низкопрофильную резину и RUNFLAT."
      },
      {
        question: "Есть ли сезонное хранение?",
        answer: "Да, сезонное хранение колес начинается от 3000 ₽."
      }
    ],
    relatedServices: ["diagnostika-avto", "remont-podveski", "remont-tormozov"],
    image: "/images/tire-service.jpg"
  },
  {
    slug: "remont-dvigatelya",
    title: "Ремонт двигателя",
    shortDescription:
      "ГРМ, свечи, фильтры, опоры, сальники, масляный насос и капитальный ремонт.",
    longDescription:
      "Если двигатель стал шуметь, троить, расходовать масло или загорелся Check Engine, начнем с диагностики. Мастер объяснит причину неисправности, покажет проблемные места и согласует ремонт до начала работ.",
    seoTitle: "Ремонт двигателя в Балашихе - Авто друг",
    seoDescription:
      "Ремонт двигателя в Балашихе: замена ГРМ, свечей, фильтров, опор, сальников, капитальный ремонт и диагностика. Цены от, запись по телефону.",
    h1: "Ремонт двигателя в Балашихе",
    priceFrom: "от 1500 ₽",
    offerPrice: 1500,
    services: group("dvigatel").items.filter((item) => item.name !== "Экспресс-замена масла"),
    symptoms: [
      "Двигатель троит, плохо заводится или глохнет.",
      "Появился стук, вибрация или посторонний шум.",
      "Увеличился расход масла или топлива.",
      "Загорелся Check Engine.",
      "Подтекает масло или антифриз."
    ],
    steps: commonSteps,
    faq: commonFaq("ремонт двигателя"),
    relatedServices: ["diagnostika-avto", "zamena-masla", "transmissiya"],
    image: "/images/engine-repair.jpg"
  },
  {
    slug: "zamena-masla",
    title: "Замена масла",
    shortDescription:
      "Экспресс-замена масла, фильтров и базовый осмотр автомобиля.",
    longDescription:
      "Экспресс-замена масла помогает вовремя защитить двигатель от износа. Подскажем по фильтрам, проверим основные узлы и объясним, если что-то требует внимания.",
    seoTitle: "Замена масла в Балашихе - Авто друг",
    seoDescription:
      "Экспресс-замена масла в Балашихе от 1000 ₽. Поможем с фильтрами, проверим основные узлы и подскажем, что требует внимания.",
    h1: "Замена масла в Балашихе",
    priceFrom: "от 1000 ₽",
    offerPrice: 1000,
    services: group("dvigatel").items.filter((item) =>
      ["Экспресс-замена масла", "Замена фильтров", "Установка защиты картера"].includes(item.name)
    ),
    symptoms: [
      "Подошел срок регламентной замены.",
      "Масло потемнело или ушло ниже уровня.",
      "После покупки авто нужно обновить расходники.",
      "Появился запах масла или следы подтеков."
    ],
    steps: [
      "Подбираем масло и фильтр под автомобиль.",
      "Сливаем старое масло и меняем расходники.",
      "Проверяем уровень и отсутствие подтеков.",
      "Подсказываем следующий интервал обслуживания."
    ],
    faq: commonFaq("замену масла"),
    relatedServices: ["diagnostika-avto", "remont-dvigatelya", "remont-podveski"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "diagnostika-avto",
    title: "Диагностика автомобиля",
    shortDescription:
      "Двигатель, подвеска, тормоза, компрессия, давление масла и компьютерная диагностика.",
    longDescription:
      "Если не знаете, что именно сломалось, просто опишите симптомы. Мастер начнет с диагностики, покажет проблемные места и объяснит, с чего разумнее начать ремонт.",
    seoTitle: "Диагностика автомобиля в Балашихе - Авто друг",
    seoDescription:
      "Диагностика двигателя, подвески, тормозной системы, компрессии и давления масла в Балашихе. Объясняем причину неисправности по факту.",
    h1: "Диагностика автомобиля в Балашихе",
    priceFrom: "от 1000 ₽",
    offerPrice: 1000,
    services: group("diagnostika").items,
    symptoms: [
      "Машина стучит, вибрирует или тянет в сторону.",
      "Загорелся Check Engine.",
      "Плохо тормозит или появился скрип.",
      "Есть шумы в подвеске.",
      "Нужно понять стоимость ремонта до работ."
    ],
    steps: commonSteps,
    faq: commonFaq("диагностику автомобиля"),
    relatedServices: ["remont-dvigatelya", "remont-podveski", "remont-tormozov"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "remont-podveski",
    title: "Ремонт подвески",
    shortDescription:
      "Амортизаторы, стойки, шаровые, рычаги, сайлентблоки и ступичные подшипники.",
    longDescription:
      "Если машина начала стучать на кочках, тянуть в сторону или появился люфт, лучше не затягивать с диагностикой подвески. В «Авто друг» мастер проверит узлы, покажет проблемные места и согласует ремонт до начала работ.",
    seoTitle: "Ремонт подвески в Балашихе - Авто друг",
    seoDescription:
      "Ремонт подвески в Балашихе: амортизаторы, стойки, шаровые, рычаги, сайлентблоки, ступичные подшипники. Диагностика и запись.",
    h1: "Ремонт подвески в Балашихе",
    priceFrom: "от 1000 ₽",
    offerPrice: 1000,
    services: group("podveska").items,
    symptoms: [
      "Стук на кочках или лежачих полицейских.",
      "Машину тянет в сторону.",
      "Появился люфт, вибрация или неравномерный износ шин.",
      "Автомобиль стал хуже держать дорогу."
    ],
    steps: commonSteps,
    faq: commonFaq("ремонт подвески"),
    relatedServices: ["shinomontazh", "diagnostika-avto", "rulevoe-upravlenie"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "remont-tormozov",
    title: "Ремонт тормозной системы",
    shortDescription:
      "Колодки, диски, жидкость, шланги, суппорты, цилиндры и ABS.",
    longDescription:
      "Тормоза лучше проверять сразу, если появился скрип, биение, увеличился тормозной путь или педаль стала мягкой. Осмотрим систему, покажем износ и согласуем работы.",
    seoTitle: "Ремонт тормозной системы в Балашихе - Авто друг",
    seoDescription:
      "Замена колодок, дисков, шлангов, суппортов, тормозной жидкости и прокачка тормозной системы в Балашихе. Цены от 800 ₽.",
    h1: "Ремонт тормозной системы в Балашихе",
    priceFrom: "от 800 ₽",
    offerPrice: 800,
    services: group("tormoza").items,
    symptoms: [
      "Скрип, скрежет или биение при торможении.",
      "Педаль тормоза стала мягкой.",
      "Автомобиль уводит при торможении.",
      "Горит индикатор ABS или тормозной системы.",
      "Нужно заменить колодки, диски или жидкость."
    ],
    steps: commonSteps,
    faq: commonFaq("ремонт тормозной системы"),
    relatedServices: ["diagnostika-avto", "remont-podveski", "shinomontazh"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "rulevoe-upravlenie",
    title: "Ремонт рулевого управления",
    shortDescription:
      "Рулевые тяги, наконечники, рейки, насосы ГУР, пыльники и жидкость ГУР.",
    longDescription:
      "Проверим рулевое управление, если появился люфт, стук, течь жидкости ГУР или руль стал тяжелее. Объясним, что требует ремонта, и согласуем работы до начала.",
    seoTitle: "Ремонт рулевого управления в Балашихе - Авто друг",
    seoDescription:
      "Ремонт рулевого управления в Балашихе: рулевые тяги, наконечники, рейки, насосы ГУР, пыльники и жидкость ГУР.",
    h1: "Ремонт рулевого управления в Балашихе",
    priceFrom: "от 1000 ₽",
    offerPrice: 1000,
    services: group("rulevoe").items,
    symptoms: [
      "Появился люфт руля.",
      "Стук при повороте или на неровностях.",
      "Руль стал тяжелым.",
      "Есть течь жидкости ГУР.",
      "Автомобиль плавает по дороге."
    ],
    steps: commonSteps,
    faq: commonFaq("ремонт рулевого управления"),
    relatedServices: ["diagnostika-avto", "remont-podveski", "shinomontazh"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "promyvka-sistemy-ohlazhdeniya",
    title: "Промывка системы охлаждения",
    shortDescription:
      "Промывка системы охлаждения, радиатора и печки с предварительной диагностикой.",
    longDescription:
      "Если двигатель перегревается, печка хуже греет или охлаждающая жидкость давно не менялась, лучше проверить систему охлаждения. Мастер осмотрит узлы, объяснит причину и согласует промывку до начала работ.",
    seoTitle: "Промывка системы охлаждения в Балашихе — Авто друг",
    seoDescription:
      "Промывка системы охлаждения в Балашихе: основной радиатор, радиатор печки, чистка радиаторов. Цены от 2500 ₽, запись в Авто друг.",
    h1: "Промывка системы охлаждения в Балашихе",
    priceFrom: "от 2500 ₽",
    offerPrice: 2500,
    services: group("ohlazhdenie").items,
    symptoms: [
      "Двигатель стал перегреваться.",
      "Печка хуже греет салон.",
      "Охлаждающая жидкость потемнела или давно не менялась.",
      "После диагностики рекомендована промывка радиатора.",
      "Нужно восстановить нормальную работу системы охлаждения."
    ],
    steps: commonSteps,
    faq: commonFaq("промывку системы охлаждения"),
    relatedServices: ["diagnostika-avto", "remont-dvigatelya", "zamena-masla"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "chistka-forsunok-stendovaya",
    title: "Чистка форсунок стендовая",
    shortDescription:
      "Стендовая чистка форсунок после диагностики и согласования работ.",
    longDescription:
      "Если двигатель троит, вырос расход топлива или появились неровные обороты, форсунки стоит проверить. В «Авто друг» мастер проведет диагностику, объяснит результат и согласует стендовую чистку до начала работ.",
    seoTitle: "Чистка форсунок стендовая в Балашихе — Авто друг",
    seoDescription:
      "Стендовая чистка форсунок в Балашихе: диагностика, согласование работ и помощь с запчастями при необходимости. Запись в Авто друг.",
    h1: "Стендовая чистка форсунок в Балашихе",
    priceFrom: "цена уточняется",
    services: group("prochie").items.filter((item) => item.name === "Чистка форсунок стендовая"),
    symptoms: [
      "Двигатель работает неровно или троит.",
      "Плавают обороты на холостом ходу.",
      "Увеличился расход топлива.",
      "Автомобиль хуже разгоняется.",
      "После диагностики нужна проверка форсунок на стенде."
    ],
    steps: commonSteps,
    faq: commonFaq("стендовую чистку форсунок"),
    relatedServices: ["diagnostika-avto", "remont-dvigatelya", "zamena-masla"],
    image: "/images/engine-repair.jpg"
  },
  {
    slug: "transmissiya",
    title: "Ремонт трансмиссии",
    shortDescription:
      "Сцепление, МКПП, АКПП, карданные валы, крестовины и раздаточные коробки.",
    longDescription:
      "Если появились рывки, шум, вибрация или передачи включаются с трудом, проверим трансмиссию и согласуем дальнейшие работы. Работаем с МКПП, АКПП, сцеплением и карданными валами.",
    seoTitle: "Ремонт трансмиссии, МКПП и АКПП в Балашихе",
    seoDescription:
      "Ремонт трансмиссии в Балашихе: замена сцепления, МКПП, АКПП, карданных валов, крестовин, сальников и раздаточных коробок.",
    h1: "Ремонт трансмиссии в Балашихе",
    priceFrom: "от 2000 ₽",
    offerPrice: 2000,
    services: group("transmissiya").items,
    symptoms: [
      "Передачи включаются с трудом.",
      "Есть рывки, вибрация или шум.",
      "Появились течи масла.",
      "Пробуксовывает сцепление.",
      "Нужна проверка карданного вала или раздатки."
    ],
    steps: commonSteps,
    faq: commonFaq("ремонт трансмиссии"),
    relatedServices: ["diagnostika-avto", "remont-dvigatelya", "zamena-masla"],
    image: "/images/service-placeholder.jpg"
  },
  {
    slug: "vyhlopnaya-sistema",
    title: "Ремонт выхлопной системы",
    shortDescription:
      "Глушители, резонаторы, гофры, катализаторы, сварка и кислородные датчики.",
    longDescription:
      "Если автомобиль стал громче, появился запах выхлопа или ошибка по кислородному датчику, проверим выхлопную систему и предложим ремонт по факту.",
    seoTitle: "Ремонт глушителя и выхлопной системы в Балашихе",
    seoDescription:
      "Ремонт выхлопной системы в Балашихе: глушители, резонаторы, гофры, катализаторы, сварочные работы и кислородные датчики.",
    h1: "Ремонт выхлопной системы в Балашихе",
    priceFrom: "от 1000 ₽",
    offerPrice: 1000,
    services: group("vyhlop").items,
    symptoms: [
      "Автомобиль стал заметно громче.",
      "Появился запах выхлопа в салоне или рядом с авто.",
      "Слышен дребезг снизу.",
      "Есть ошибка по кислородному датчику.",
      "Нужны сварочные работы по выхлопу."
    ],
    steps: commonSteps,
    faq: commonFaq("ремонт выхлопной системы"),
    relatedServices: ["diagnostika-avto", "remont-dvigatelya", "transmissiya"],
    image: "/images/service-placeholder.jpg"
  }
];

export const featuredServiceSlugs = serviceCategories.map((service) => service.slug);

export type LeadServiceOption = {
  label: string;
  value: string;
};

export const leadServiceOptions: LeadServiceOption[] = [
  ...serviceCategories.map((service) => ({ label: service.title, value: service.title }))
];

export function getServiceBySlug(slug: string) {
  return serviceCategories.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]) {
  return slugs
    .map((slug) => serviceCategories.find((service) => service.slug === slug))
    .filter(Boolean) as ServiceCategory[];
}
