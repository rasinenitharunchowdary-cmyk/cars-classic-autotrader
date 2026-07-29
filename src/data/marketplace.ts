export type Car = {
  slug: string
  year: number
  make: string
  model: string
  title: string
  price: number
  mileage: string
  color: string
  engine: string
  gearbox: string
  power: string
  origin: string
  image: string
  accent: 'ink' | 'red' | 'green'
  description: string
}

export type Service = {
  slug: string
  index: string
  title: string
  shortTitle: string
  image: string
  summary: string
  paragraphs: string[]
}

export const cars: Car[] = [
  {
    slug: '1967-toyota-2000gt',
    year: 1967,
    make: 'Toyota',
    model: '2000GT',
    title: '1967 Toyota 2000GT',
    price: 94000,
    mileage: '28,400 miles',
    color: 'Graphite black',
    engine: '2.0L inline-six',
    gearbox: '5-speed manual',
    power: '150 hp',
    origin: 'Japan',
    image: '/assets/images/car-black.webp',
    accent: 'ink',
    description:
      'An elegant grand tourer with a long-bonnet silhouette, beautifully weighted steering and a cabin restored with period-correct materials. This example has been inspected, road tested and documented by our in-house classic-car specialists.',
  },
  {
    slug: '1967-jaguar-e-type',
    year: 1967,
    make: 'Jaguar',
    model: 'E-Type Series 1',
    title: '1967 Jaguar E-Type',
    price: 118000,
    mileage: '31,900 miles',
    color: 'Carmen red',
    engine: '4.2L inline-six',
    gearbox: '4-speed manual',
    power: '265 hp',
    origin: 'United Kingdom',
    image: '/assets/images/car-red.webp',
    accent: 'red',
    description:
      'A beautifully balanced Series 1 coupe presented in a deep period red. Its matching-numbers powertrain, carefully renewed interior and comprehensive history make it a confident long-distance classic.',
  },
  {
    slug: '1969-ford-mustang-mach-1',
    year: 1969,
    make: 'Ford',
    model: 'Mustang Mach 1',
    title: '1969 Ford Mustang Mach 1',
    price: 76000,
    mileage: '42,100 miles',
    color: 'Highland green',
    engine: '5.8L V8',
    gearbox: '4-speed manual',
    power: '290 hp',
    origin: 'United States',
    image: '/assets/images/car-green.webp',
    accent: 'green',
    description:
      'A muscular fastback restored for reliable touring without losing the direct, analogue character that defines the Mach 1. The car includes a documented mechanical refresh and detailed condition report.',
  },
  {
    slug: '1968-dodge-charger-rt',
    year: 1968,
    make: 'Dodge',
    model: 'Charger R/T',
    title: '1968 Dodge Charger R/T',
    price: 89000,
    mileage: '37,600 miles',
    color: 'Raven black',
    engine: '7.2L V8',
    gearbox: '3-speed automatic',
    power: '375 hp',
    origin: 'United States',
    image: '/assets/images/car-black.webp',
    accent: 'ink',
    description:
      'A dramatic pillarless coupe with the stance and sound of a true late-sixties icon. Recent work includes braking, cooling and suspension refurbishment for composed modern-road use.',
  },
  {
    slug: '1966-mercedes-230sl',
    year: 1966,
    make: 'Mercedes-Benz',
    model: '230 SL',
    title: '1966 Mercedes-Benz 230 SL',
    price: 83000,
    mileage: '46,200 miles',
    color: 'Signal red',
    engine: '2.3L inline-six',
    gearbox: '4-speed automatic',
    power: '150 hp',
    origin: 'Germany',
    image: '/assets/images/car-red.webp',
    accent: 'red',
    description:
      'The understated Pagoda combines light controls, elegant proportions and genuine everyday usability. This car carries a clean specialist history and a carefully preserved cabin.',
  },
  {
    slug: '1970-pontiac-gto-judge',
    year: 1970,
    make: 'Pontiac',
    model: 'GTO Judge',
    title: '1970 Pontiac GTO Judge',
    price: 97000,
    mileage: '34,800 miles',
    color: 'Verdoro green',
    engine: '6.6L V8',
    gearbox: '4-speed manual',
    power: '366 hp',
    origin: 'United States',
    image: '/assets/images/car-green.webp',
    accent: 'green',
    description:
      'A charismatic GTO with strong provenance, crisp bodywork and the kind of effortless torque that made the era famous. It has passed our structural, mechanical and documentation inspection.',
  },
]

export const services: Service[] = [
  {
    slug: 'shipping',
    index: '01',
    title: 'SHIPPING',
    shortTitle: 'Shipping',
    image: '/assets/images/service-shipping.webp',
    summary: 'Door-to-door enclosed transport with live coordination and condition reporting.',
    paragraphs: [
      'We partner with specialist enclosed carriers who understand low-clearance classics, delicate trim and the importance of documented handovers. Every collection begins with a photographed condition report and a named transport coordinator.',
      'Domestic and international movements can include customs documentation, marine insurance and secure storage. Your coordinator shares each milestone clearly, from collection window through final delivery.',
      'Routes and timelines are confirmed before purchase so there are no surprises after you commit to the car.',
    ],
  },
  {
    slug: 'warranty',
    index: '02',
    title: 'WARRANTY PURCHASE',
    shortTitle: 'Warranty purchase',
    image: '/assets/images/service-warranty.webp',
    summary: 'Independent inspection and tailored mechanical protection for confident ownership.',
    paragraphs: [
      'Every eligible car is assessed by an independent marque specialist. Their report covers structure, running gear, electrical systems, road behaviour and the documentation that supports authenticity.',
      'Optional protection plans can cover major mechanical components while preserving your freedom to use trusted classic-car workshops. Terms are explained in plain language before purchase.',
      'For cars outside the standard programme, we can arrange an enhanced pre-purchase inspection and a maintenance roadmap instead.',
    ],
  },
  {
    slug: 'financing',
    index: '03',
    title: 'FINANCING',
    shortTitle: 'Financing',
    image: '/assets/images/service-financing.webp',
    summary: 'Flexible collector-car finance structured around the vehicle and your ownership plan.',
    paragraphs: [
      'Collector vehicles need a more considered approach than everyday-car lending. Our finance partners assess provenance, condition and long-term value alongside the usual affordability checks.',
      'Choose from hire purchase, balanced-payment and balloon structures with clear illustrations of deposit, term and total cost. Applications are private and never affect the advertised status of a car until approved.',
      'A specialist can compare options with you without pressure and coordinate the paperwork with our sales and transport teams.',
    ],
  },
]

export const faqs = [
  {
    question: 'Do you offer financing options for purchasing classic cars?',
    answer:
      'Yes. Our specialist partners provide several structures for qualifying collectors, with every fee and repayment shown before you apply.',
  },
  {
    question: 'Are the showcased cars fully restored or in original condition?',
    answer:
      'The collection includes both. Every listing states the condition clearly and includes known restoration work, originality notes and inspection findings.',
  },
  {
    question: 'Do you assist with shipping for purchased classic cars?',
    answer:
      'Yes. We coordinate enclosed domestic transport and international delivery, including condition reports, insurance options and customs support.',
  },
  {
    question: 'Are your vintage cars certified or inspected for authenticity?',
    answer:
      'Each vehicle is identity-checked and inspected by a specialist. Where formal certificates exist, their details are included in the vehicle file.',
  },
  {
    question: 'Can I request additional photos before purchasing?',
    answer:
      'Absolutely. We can provide detailed photos, a live video walk-around and a focused inspection of any area you want to review.',
  },
]

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
