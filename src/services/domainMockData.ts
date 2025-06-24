// Domain-specific mock data for Neakasa and competitors

interface DomainData {
  overview: {
    organic_keywords: number;
    organic_traffic: number;
    organic_cost: number;
    adwords_keywords: number;
    adwords_traffic: number;
    adwords_cost: number;
  };
  keywords: {
    keyword: string;
    position: number;
    search_volume: number;
    cpc: number;
    url: string;
    traffic_percent: number;
    traffic_cost: number;
    competition: number;
    trend: string;
  }[];
}

export const domainMockData: { [key: string]: DomainData } = {
  'neakasa.com': {
    overview: {
      organic_keywords: 8543,
      organic_traffic: 125000,
      organic_cost: 95000,
      adwords_keywords: 1250,
      adwords_traffic: 35000,
      adwords_cost: 45000,
    },
    keywords: [
      {
        keyword: 'neakasa m1',
        position: 1,
        search_volume: 12100,
        cpc: 1.85,
        url: 'https://www.neakasa.com/products/neakasa-m1',
        traffic_percent: 15.8,
        traffic_cost: 22385,
        competition: 0.45,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'neakasa cat litter box',
        position: 1,
        search_volume: 8100,
        cpc: 1.65,
        url: 'https://www.neakasa.com/collections/cat-litter-box',
        traffic_percent: 18.2,
        traffic_cost: 13365,
        competition: 0.35,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'automatic cat litter box',
        position: 4,
        search_volume: 74000,
        cpc: 2.85,
        url: 'https://www.neakasa.com/products/automatic-cat-litter-box',
        traffic_percent: 12.5,
        traffic_cost: 210900,
        competition: 0.98,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'app controlled litter box',
        position: 5,
        search_volume: 14800,
        cpc: 3.15,
        url: 'https://www.neakasa.com/products/app-controlled-litter-box',
        traffic_percent: 4.8,
        traffic_cost: 46620,
        competition: 0.88,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
    ],
  },
  'litter-robot.com': {
    overview: {
      organic_keywords: 12500,
      organic_traffic: 385000,
      organic_cost: 450000,
      adwords_keywords: 3500,
      adwords_traffic: 125000,
      adwords_cost: 185000,
    },
    keywords: [
      {
        keyword: 'litter robot 4',
        position: 1,
        search_volume: 49500,
        cpc: 3.45,
        url: 'https://www.litter-robot.com/litter-robot-4',
        traffic_percent: 22.5,
        traffic_cost: 170775,
        competition: 0.98,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'litter robot 3',
        position: 1,
        search_volume: 40500,
        cpc: 3.25,
        url: 'https://www.litter-robot.com/litter-robot-3',
        traffic_percent: 18.3,
        traffic_cost: 131625,
        competition: 0.96,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'automatic cat litter box',
        position: 1,
        search_volume: 74000,
        cpc: 2.85,
        url: 'https://www.litter-robot.com/',
        traffic_percent: 15.2,
        traffic_cost: 210900,
        competition: 0.98,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'self cleaning litter box',
        position: 1,
        search_volume: 60500,
        cpc: 3.25,
        url: 'https://www.litter-robot.com/',
        traffic_percent: 12.8,
        traffic_cost: 196625,
        competition: 0.95,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
    ],
  },
  'petkit.com': {
    overview: {
      organic_keywords: 8900,
      organic_traffic: 195000,
      organic_cost: 225000,
      adwords_keywords: 2100,
      adwords_traffic: 65000,
      adwords_cost: 95000,
    },
    keywords: [
      {
        keyword: 'petkit pura max',
        position: 1,
        search_volume: 18100,
        cpc: 2.85,
        url: 'https://www.petkit.com/products/pura-max',
        traffic_percent: 25.3,
        traffic_cost: 51585,
        competition: 0.89,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'petkit pura x',
        position: 1,
        search_volume: 12100,
        cpc: 2.65,
        url: 'https://www.petkit.com/products/pura-x',
        traffic_percent: 18.7,
        traffic_cost: 32065,
        competition: 0.85,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'smart litter box',
        position: 3,
        search_volume: 40500,
        cpc: 2.95,
        url: 'https://www.petkit.com/collections/litter-box',
        traffic_percent: 8.5,
        traffic_cost: 119475,
        competition: 0.92,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'petkit automatic feeder',
        position: 1,
        search_volume: 9900,
        cpc: 2.25,
        url: 'https://www.petkit.com/products/automatic-feeder',
        traffic_percent: 12.2,
        traffic_cost: 22275,
        competition: 0.78,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
    ],
  },
  'petsnowy.com': {
    overview: {
      organic_keywords: 5200,
      organic_traffic: 85000,
      organic_cost: 125000,
      adwords_keywords: 950,
      adwords_traffic: 28000,
      adwords_cost: 52000,
    },
    keywords: [
      {
        keyword: 'petsnowy snow+',
        position: 1,
        search_volume: 9900,
        cpc: 2.95,
        url: 'https://www.petsnowy.com/products/snow-plus',
        traffic_percent: 32.5,
        traffic_cost: 29205,
        competition: 0.87,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'petsnowy self cleaning',
        position: 1,
        search_volume: 6600,
        cpc: 2.75,
        url: 'https://www.petsnowy.com/',
        traffic_percent: 24.8,
        traffic_cost: 18150,
        competition: 0.82,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'snow+ litter box',
        position: 1,
        search_volume: 4950,
        cpc: 2.85,
        url: 'https://www.petsnowy.com/products/snow-plus',
        traffic_percent: 18.5,
        traffic_cost: 14107,
        competition: 0.79,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'self cleaning litter box',
        position: 12,
        search_volume: 60500,
        cpc: 3.25,
        url: 'https://www.petsnowy.com/',
        traffic_percent: 5.2,
        traffic_cost: 196625,
        competition: 0.95,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
    ],
  },
  'petsafe.com': {
    overview: {
      organic_keywords: 25600,
      organic_traffic: 450000,
      organic_cost: 380000,
      adwords_keywords: 5200,
      adwords_traffic: 180000,
      adwords_cost: 220000,
    },
    keywords: [
      {
        keyword: 'petsafe scoopfree',
        position: 1,
        search_volume: 27100,
        cpc: 2.45,
        url: 'https://www.petsafe.com/scoopfree',
        traffic_percent: 12.5,
        traffic_cost: 66395,
        competition: 0.91,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'scoopfree litter box',
        position: 1,
        search_volume: 22200,
        cpc: 2.35,
        url: 'https://www.petsafe.com/scoopfree-litter-box',
        traffic_percent: 10.8,
        traffic_cost: 52170,
        competition: 0.88,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'petsafe automatic feeder',
        position: 1,
        search_volume: 14800,
        cpc: 1.95,
        url: 'https://www.petsafe.com/automatic-feeders',
        traffic_percent: 8.5,
        traffic_cost: 28860,
        competition: 0.82,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
      {
        keyword: 'disposable litter tray',
        position: 2,
        search_volume: 8100,
        cpc: 1.65,
        url: 'https://www.petsafe.com/scoopfree-trays',
        traffic_percent: 6.2,
        traffic_cost: 13365,
        competition: 0.75,
        trend: '0.81,0.74,0.81,0.90,1.00,1.10,1.20,1.15,1.10,1.00,1.10,1.35',
      },
    ],
  },
};
