// Service for private channel analytics data
// Focused on Neakasa's smart cat litter box and garment steamer products

export interface ProductData {
  id: string;
  name: string;
  category: 'cat-litter-box' | 'garment-steamer';
  sku: string;
  price: number;
}

export interface ChannelMetrics {
  channel: string;
  revenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
  avgOrderValue: number;
  growth: number;
}

export interface ProductPerformance {
  product: string;
  sales: number;
  revenue: number;
  units: number;
  rating: number;
  reviews: number;
}

export interface CustomerSegment {
  segment: string;
  count: number;
  revenue: number;
  avgPurchaseFrequency: number;
  lifetimeValue: number;
}

// Neakasa product catalog
export const neakasaProducts: ProductData[] = [
  { id: 'nl-001', name: 'Neakasa M1 Open-Top Cat Litter Box', category: 'cat-litter-box', sku: 'NKLB-M1', price: 599.99 },
  { id: 'nl-002', name: 'Neakasa F1 Smart Cat Litter Box', category: 'cat-litter-box', sku: 'NKLB-F1', price: 799.99 },
  { id: 'nl-003', name: 'Neakasa Cat Litter Deodorizer', category: 'cat-litter-box', sku: 'NKLB-DEO', price: 49.99 },
  { id: 'ns-001', name: 'Neakasa S1 Pro Garment Steamer', category: 'garment-steamer', sku: 'NKGS-S1P', price: 199.99 },
  { id: 'ns-002', name: 'Neakasa S2 Portable Steamer', category: 'garment-steamer', sku: 'NKGS-S2', price: 149.99 },
  { id: 'ns-003', name: 'Neakasa Professional Steam Iron', category: 'garment-steamer', sku: 'NKGS-PRO', price: 299.99 },
];

// Shopify Analytics Mock Data
export const getShopifyMetrics = () => {
  return {
    overview: {
      totalRevenue: 2847563,
      totalOrders: 8432,
      conversionRate: 3.2,
      avgOrderValue: 337.82,
      returningCustomerRate: 42.5,
      cartAbandonmentRate: 68.3,
    },
    productPerformance: [
      { product: 'Neakasa M1 Open-Top Cat Litter Box', sales: 3245, revenue: 1946755, units: 3245, rating: 4.8, reviews: 2156 },
      { product: 'Neakasa F1 Smart Cat Litter Box', sales: 1876, revenue: 1499124, units: 1876, rating: 4.9, reviews: 1234 },
      { product: 'Neakasa S1 Pro Garment Steamer', sales: 2134, revenue: 426732, units: 2134, rating: 4.7, reviews: 987 },
      { product: 'Neakasa S2 Portable Steamer', sales: 876, revenue: 131274, units: 876, rating: 4.6, reviews: 543 },
      { product: 'Cat Litter Deodorizer', sales: 1543, revenue: 77085, units: 1543, rating: 4.5, reviews: 876 },
      { product: 'Professional Steam Iron', sales: 758, revenue: 227342, units: 758, rating: 4.8, reviews: 432 },
    ],
    customerSegments: [
      { segment: 'Cat Owners - Premium', count: 3456, revenue: 2067345, avgPurchaseFrequency: 3.2, lifetimeValue: 598.23 },
      { segment: 'Cat Owners - Budget', count: 2345, revenue: 468900, avgPurchaseFrequency: 1.8, lifetimeValue: 199.95 },
      { segment: 'Professional Users', count: 1234, revenue: 567890, avgPurchaseFrequency: 2.4, lifetimeValue: 459.99 },
      { segment: 'Home Users', count: 2876, revenue: 456789, avgPurchaseFrequency: 1.6, lifetimeValue: 158.87 },
    ],
    monthlyTrends: [
      { month: 'Jan', revenue: 234567, orders: 678, catProducts: 445, steamerProducts: 233 },
      { month: 'Feb', revenue: 256789, orders: 723, catProducts: 489, steamerProducts: 234 },
      { month: 'Mar', revenue: 278901, orders: 812, catProducts: 523, steamerProducts: 289 },
      { month: 'Apr', revenue: 298765, orders: 867, catProducts: 578, steamerProducts: 289 },
      { month: 'May', revenue: 312345, orders: 923, catProducts: 612, steamerProducts: 311 },
      { month: 'Jun', revenue: 334567, orders: 987, catProducts: 656, steamerProducts: 331 },
    ],
  };
};

// Offline Stores Analytics Mock Data
export const getOfflineStoresMetrics = () => {
  return {
    overview: {
      totalStores: 156,
      totalRevenue: 4567890,
      footTraffic: 234567,
      conversionRate: 12.3,
      avgTransactionValue: 287.45,
      inventoryTurnover: 4.2,
    },
    storePerformance: [
      { store: 'Flagship Store - NYC', revenue: 567890, visitors: 23456, conversion: 15.2, topProduct: 'F1 Smart Litter Box' },
      { store: 'PetSmart - California', revenue: 456789, visitors: 19876, conversion: 13.8, topProduct: 'M1 Open-Top Litter Box' },
      { store: 'Target - Texas', revenue: 345678, visitors: 17654, conversion: 11.2, topProduct: 'S1 Pro Steamer' },
      { store: 'Walmart - Florida', revenue: 298765, visitors: 21345, conversion: 10.5, topProduct: 'M1 Open-Top Litter Box' },
      { store: 'Petco - Illinois', revenue: 267890, visitors: 15432, conversion: 12.7, topProduct: 'Cat Litter Deodorizer' },
    ],
    productDistribution: [
      { category: 'Cat Litter Boxes', units: 12456, revenue: 3456789, stores: 134 },
      { category: 'Garment Steamers', units: 8765, revenue: 1234567, stores: 98 },
      { category: 'Accessories', units: 5432, revenue: 234567, stores: 156 },
    ],
    regionalPerformance: [
      { region: 'North America', stores: 78, revenue: 2345678, growth: 12.3 },
      { region: 'Europe', stores: 45, revenue: 1234567, growth: 8.7 },
      { region: 'Asia Pacific', stores: 33, revenue: 987654, growth: 23.4 },
    ],
  };
};

// WhatsApp Business Analytics Mock Data
export const getWhatsAppMetrics = () => {
  return {
    overview: {
      totalContacts: 45678,
      activeChats: 3456,
      messagesSent: 234567,
      messagesReceived: 189234,
      avgResponseTime: 2.3, // hours
      satisfactionScore: 4.6,
    },
    campaignPerformance: [
      { campaign: 'New F1 Launch', sent: 12345, delivered: 12089, read: 10234, clicks: 3456, conversions: 234 },
      { campaign: 'Holiday Sale - Cat Products', sent: 9876, delivered: 9567, read: 8234, clicks: 2345, conversions: 189 },
      { campaign: 'Steamer Maintenance Tips', sent: 8765, delivered: 8456, read: 7234, clicks: 1876, conversions: 98 },
      { campaign: 'Customer Care Follow-up', sent: 7654, delivered: 7432, read: 6543, clicks: 1234, conversions: 156 },
    ],
    messageTypes: [
      { type: 'Product Inquiries', count: 5678, percentage: 35.2 },
      { type: 'Order Status', count: 4321, percentage: 26.8 },
      { type: 'Technical Support', count: 3456, percentage: 21.4 },
      { type: 'Promotions', count: 1876, percentage: 11.6 },
      { type: 'Feedback', count: 809, percentage: 5.0 },
    ],
    customerJourney: [
      { stage: 'Awareness', users: 12345, conversionToNext: 67.8 },
      { stage: 'Consideration', users: 8364, conversionToNext: 45.6 },
      { stage: 'Purchase', users: 3812, conversionToNext: 78.9 },
      { stage: 'Retention', users: 3008, conversionToNext: 85.2 },
      { stage: 'Advocacy', users: 2563, conversionToNext: 0 },
    ],
  };
};

// EDM (Email Direct Marketing) Analytics Mock Data
export const getEDMMetrics = () => {
  return {
    overview: {
      totalSubscribers: 123456,
      activeSubscribers: 98765,
      avgOpenRate: 24.5,
      avgClickRate: 3.8,
      unsubscribeRate: 0.8,
      deliverabilityRate: 97.2,
    },
    campaignPerformance: [
      { 
        campaign: 'Monthly Newsletter - Pet Care Tips',
        sent: 98765,
        delivered: 96234,
        opened: 24567,
        clicked: 3789,
        conversions: 234,
        revenue: 45678
      },
      { 
        campaign: 'F1 Smart Box - Product Launch',
        sent: 87654,
        delivered: 85432,
        opened: 28976,
        clicked: 5432,
        conversions: 432,
        revenue: 89765
      },
      { 
        campaign: 'Seasonal Sale - Steamers',
        sent: 76543,
        delivered: 74321,
        opened: 19876,
        clicked: 2987,
        conversions: 198,
        revenue: 34567
      },
      { 
        campaign: 'Customer Loyalty Rewards',
        sent: 65432,
        delivered: 63987,
        opened: 21345,
        clicked: 4567,
        conversions: 345,
        revenue: 56789
      },
    ],
    segmentPerformance: [
      { segment: 'Cat Owners', subscribers: 67890, openRate: 32.4, clickRate: 5.6, revenue: 234567 },
      { segment: 'Dog Owners', subscribers: 23456, openRate: 28.7, clickRate: 4.2, revenue: 98765 },
      { segment: 'Professional Cleaners', subscribers: 12345, openRate: 19.8, clickRate: 3.1, revenue: 45678 },
      { segment: 'Home Users', subscribers: 19865, openRate: 21.3, clickRate: 2.8, revenue: 34567 },
    ],
    contentPerformance: [
      { contentType: 'Product Features', emails: 24, avgOpenRate: 28.9, avgClickRate: 4.5 },
      { contentType: 'How-to Guides', emails: 18, avgOpenRate: 31.2, avgClickRate: 5.8 },
      { contentType: 'Customer Stories', emails: 12, avgOpenRate: 26.7, avgClickRate: 3.9 },
      { contentType: 'Promotions', emails: 15, avgOpenRate: 22.4, avgClickRate: 6.2 },
    ],
  };
};

// LinkedIn Analytics Mock Data
export const getLinkedInMetrics = () => {
  return {
    overview: {
      followers: 34567,
      impressions: 2345678,
      engagementRate: 4.2,
      websiteClicks: 12345,
      shareOfVoice: 12.3,
      followerGrowth: 8.7,
    },
    postPerformance: [
      {
        post: 'Innovation in Pet Care Technology',
        type: 'Article',
        impressions: 45678,
        engagements: 2345,
        clicks: 567,
        shares: 123,
        comments: 89
      },
      {
        post: 'Sustainability in Product Design',
        type: 'Video',
        impressions: 38976,
        engagements: 3456,
        clicks: 789,
        shares: 234,
        comments: 156
      },
      {
        post: 'Employee Spotlight - R&D Team',
        type: 'Image',
        impressions: 29876,
        engagements: 1876,
        clicks: 432,
        shares: 98,
        comments: 76
      },
      {
        post: 'New Partnership Announcement',
        type: 'Article',
        impressions: 34567,
        engagements: 2234,
        clicks: 654,
        shares: 187,
        comments: 123
      },
    ],
    audienceDemographics: [
      { category: 'Industry', data: [
        { name: 'Pet Industry', percentage: 35.2 },
        { name: 'Retail', percentage: 22.8 },
        { name: 'Technology', percentage: 18.5 },
        { name: 'Manufacturing', percentage: 14.3 },
        { name: 'Others', percentage: 9.2 },
      ]},
      { category: 'Seniority', data: [
        { name: 'Entry Level', percentage: 12.4 },
        { name: 'Manager', percentage: 34.6 },
        { name: 'Director', percentage: 28.9 },
        { name: 'VP/C-Level', percentage: 18.7 },
        { name: 'Others', percentage: 5.4 },
      ]},
    ],
    competitorComparison: [
      { company: 'Neakasa', followers: 34567, engagementRate: 4.2, shareOfVoice: 12.3 },
      { company: 'Competitor A', followers: 45678, engagementRate: 3.8, shareOfVoice: 15.6 },
      { company: 'Competitor B', followers: 28976, engagementRate: 3.2, shareOfVoice: 10.8 },
      { company: 'Competitor C', followers: 31234, engagementRate: 3.5, shareOfVoice: 11.2 },
    ],
  };
};