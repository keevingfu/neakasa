export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'overview',
    name: 'Overview',
    path: '/overview',
  },
  {
    id: 'content-insight',
    name: 'Content Insight',
    path: '/content-insight',
    children: [
      {
        id: 'consumer-voice',
        name: 'Consumer Voice Analysis',
        path: '/content-insight/consumer-voice',
      },
      { id: 'search-insights', name: 'Search Insights', path: '/content-insight/search' },
      { id: 'viral-factor', name: 'Viral Factor Analysis', path: '/content-insight/viral-factor' },
      { id: 'viral-video', name: 'Viral Video Insights', path: '/content-insight/viral-video' },
    ],
  },
  {
    id: 'content-testing',
    name: 'Content Testing',
    path: '/content-testing',
    children: [
      { id: 'self-koc', name: 'Self-KOC Analysis', path: '/content-testing/self-koc' },
      { id: 'neakasa-leap', name: 'KOC Performance', path: '/content-testing/neakasa-leap' },
      { id: 'ideation', name: 'Content Ideation Planning', path: '/content-testing/ideation' },
      { id: 'execution', name: 'Content Testing Execution', path: '/content-testing/execution' },
      { id: 'performance', name: 'Performance Analysis', path: '/content-testing/performance' },
      { id: 'refinement', name: 'Content Refinement', path: '/content-testing/refinement' },
    ],
  },
  {
    id: 'content-kol',
    name: 'Content for KOL',
    path: '/content-kol',
    children: [
      { id: 'kol-overview', name: 'KOL Overview', path: '/content-kol/overview' },
      { id: 'kol-reach', name: 'Content Reach Analysis', path: '/content-kol/reach' },
      { id: 'kol-conversion', name: 'Conversion Analysis', path: '/content-kol/conversion' },
    ],
  },
  {
    id: 'content-ads',
    name: 'Content for Ads',
    path: '/content-ads',
    children: [
      {
        id: 'ads-overview',
        name: 'Overview',
        path: '/content-ads/overview',
      },
      {
        id: 'ad-campaign-analytics',
        name: 'Ad Campaign Analytics',
        path: '/content-ads/campaign-analytics',
      },
      {
        id: 'channel-performance',
        name: 'Channel Performance Report',
        path: '/content-ads/channel-performance',
      },
      {
        id: 'campaign-details',
        name: 'Campaign Detail Analysis',
        path: '/content-ads/campaign-details',
      },
      {
        id: 'pricing-strategy',
        name: 'Pricing Strategy Analysis',
        path: '/content-ads/pricing-strategy',
      },
      {
        id: 'global-prime-day',
        name: 'Global Prime Day Analysis',
        path: '/content-ads/global-prime-day',
      },
      {
        id: 'pricing-comparison',
        name: 'Pricing Comparison Analysis',
        path: '/content-ads/pricing-comparison',
      },
      {
        id: 'kol-campaign-performance',
        name: 'KOL Campaign Performance',
        path: '/content-ads/kol-campaign-performance',
      },
      {
        id: 'integrated-dashboard',
        name: 'Integrated Performance Dashboard',
        path: '/content-ads/integrated-dashboard',
      },
    ],
  },
  {
    id: 'content-private',
    name: 'Content for Private',
    path: '/content-private',
    children: [
      { id: 'edm', name: 'EDM Analytics', path: '/content-private/edm' },
      { id: 'linkedin', name: 'LinkedIn Analytics', path: '/content-private/linkedin' },
      { id: 'offline', name: 'Offline Stores', path: '/content-private/offline' },
      { id: 'shopify', name: 'Shopify Analytics', path: '/content-private/shopify' },
      { id: 'whatsapp', name: 'WhatsApp Analytics', path: '/content-private/whatsapp' },
    ],
  },
  {
    id: 'content-management',
    name: 'Content Management',
    path: '/content-management',
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '/settings',
  },
];
