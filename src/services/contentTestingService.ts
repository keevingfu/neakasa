import {
  ABTestIdea,
  TestExecution,
  TestAnalysis,
  TestTemplate,
  ContentImprovement,
  TestLearning,
  // TestStatus,
  // KPIType,
  TestVariantPerformance,
  DailyTestData,
} from '../types/contentTesting';

// Mock data for development
const mockTestIdeas: ABTestIdea[] = [
  {
    id: '1',
    name: 'Thumbnail Style Test - Product vs Lifestyle',
    hypothesis:
      'Lifestyle thumbnails showing the product in use will increase CTR by 25% compared to product-only thumbnails',
    description:
      'Testing whether showing our cleaning products in real home environments increases engagement',
    variants: [
      {
        id: 'control',
        name: 'Product Focus',
        type: 'control',
        description: 'Clean product shots on white background',
        changes: ['White background', 'Product centered', 'Minimal text overlay'],
        thumbnailUrl: '/api/placeholder/400/225',
      },
      {
        id: 'variant-a',
        name: 'Lifestyle Context',
        type: 'variant',
        description: 'Product shown in real home settings',
        changes: ['Home environment', 'Product in use', 'Before/after split'],
        thumbnailUrl: '/api/placeholder/400/225',
      },
    ],
    kpis: [
      { type: 'click_through_rate', targetValue: 8.5, weight: 0.5, unit: '%' },
      { type: 'view_duration', targetValue: 45, weight: 0.3, unit: 'seconds' },
      { type: 'engagement_rate', targetValue: 12, weight: 0.2, unit: '%' },
    ],
    targetAudience: 'Homeowners aged 25-45',
    platform: 'youtube',
    estimatedDuration: 14,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-10'),
    status: 'active',
    category: 'Visual Content',
    tags: ['thumbnail', 'visual', 'lifestyle'],
  },
  {
    id: '2',
    name: 'Video Length Optimization',
    hypothesis:
      'Shorter 15-30 second videos will have 40% higher completion rates than 60+ second videos',
    description: 'Testing optimal video length for TikTok audience engagement',
    variants: [
      {
        id: 'control-2',
        name: 'Long Form (60s)',
        type: 'control',
        description: 'Traditional 60-second product demo',
        changes: ['Full demonstration', 'Detailed features', 'Multiple use cases'],
        content: {
          format: '60-second demo',
          title: 'Complete Cleaning Guide',
        },
      },
      {
        id: 'variant-2a',
        name: 'Short Form (15s)',
        type: 'variant',
        description: 'Quick, punchy 15-second highlight',
        changes: ['Single key benefit', 'Fast cuts', 'Hook in first 3 seconds'],
        content: {
          format: '15-second quick tips',
          title: 'Clean in Seconds!',
        },
      },
    ],
    kpis: [
      { type: 'view_duration', targetValue: 80, weight: 0.4, unit: '%' },
      { type: 'shares', targetValue: 5, weight: 0.3, unit: '%' },
      { type: 'saves', targetValue: 3, weight: 0.3, unit: '%' },
    ],
    targetAudience: 'TikTok users interested in cleaning hacks',
    platform: 'tiktok',
    estimatedDuration: 7,
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-12'),
    status: 'active',
    category: 'Content Format',
    tags: ['video length', 'format', 'engagement'],
  },
];

const mockTestExecutions: TestExecution[] = [
  {
    id: 'exec-1',
    testId: '1',
    startDate: new Date('2025-03-10'),
    status: 'active',
    variants: [
      {
        variantId: 'control',
        variantName: 'Product Focus',
        impressions: 15420,
        conversions: 1234,
        metrics: {
          click_through_rate: 6.8,
          view_duration: 38,
          engagement_rate: 9.2,
          conversion_rate: 8.0,
          shares: 2.1,
          saves: 1.8,
          comments: 3.2,
          likes: 12.5,
        },
        conversionRate: 8.0,
        result: 'ongoing',
      },
      {
        variantId: 'variant-a',
        variantName: 'Lifestyle Context',
        impressions: 15380,
        conversions: 1542,
        metrics: {
          click_through_rate: 8.9,
          view_duration: 52,
          engagement_rate: 14.3,
          conversion_rate: 10.0,
          shares: 3.8,
          saves: 3.2,
          comments: 5.1,
          likes: 18.2,
        },
        conversionRate: 10.0,
        uplift: 25.0,
        confidence: 94.2,
        result: 'ongoing',
      },
    ],
    sampleSize: 30800,
    confidenceLevel: 95,
    significanceThreshold: 0.05,
    dailyData: generateDailyData(),
  },
];

function generateDailyData(): DailyTestData[] {
  const days = 7;
  const data: DailyTestData[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    data.push({
      date,
      variantData: [
        {
          variantId: 'control',
          impressions: 2000 + Math.random() * 500,
          conversions: 160 + Math.random() * 40,
          metrics: {
            click_through_rate: 6.5 + Math.random() * 0.6,
            view_duration: 35 + Math.random() * 5,
            engagement_rate: 8.5 + Math.random() * 1.5,
            conversion_rate: 7.5 + Math.random() * 1,
            shares: 1.8 + Math.random() * 0.6,
            saves: 1.5 + Math.random() * 0.5,
            comments: 2.8 + Math.random() * 0.8,
            likes: 11 + Math.random() * 3,
          },
        },
        {
          variantId: 'variant-a',
          impressions: 2000 + Math.random() * 500,
          conversions: 200 + Math.random() * 50,
          metrics: {
            click_through_rate: 8.5 + Math.random() * 0.8,
            view_duration: 48 + Math.random() * 8,
            engagement_rate: 13 + Math.random() * 2.5,
            conversion_rate: 9.5 + Math.random() * 1.2,
            shares: 3.5 + Math.random() * 0.6,
            saves: 2.8 + Math.random() * 0.8,
            comments: 4.5 + Math.random() * 1.2,
            likes: 16 + Math.random() * 4,
          },
        },
      ],
    });
  }

  return data;
}

const mockTestTemplates: TestTemplate[] = [
  {
    id: 'template-1',
    name: 'Thumbnail A/B Test',
    description: 'Test different thumbnail styles to optimize click-through rates',
    category: 'Visual Content',
    platform: 'youtube',
    defaultHypothesis:
      'Alternative thumbnail style will increase CTR by X% compared to current style',
    suggestedKPIs: ['click_through_rate', 'view_duration', 'engagement_rate'],
    suggestedDuration: 14,
    bestPractices: [
      'Test one element at a time (color, text, imagery)',
      'Ensure thumbnails are visible at small sizes',
      'Use high contrast and clear focal points',
      'Include faces when relevant - they typically perform better',
      'Test text overlays vs no text',
    ],
    exampleVariants: [
      {
        name: 'High Contrast',
        description: 'Bold colors with strong contrast',
        changes: ['Bright background', 'Large text', 'Product prominent'],
      },
      {
        name: 'Lifestyle Shot',
        description: 'Product in real-world context',
        changes: ['Natural setting', 'People using product', 'Softer colors'],
      },
    ],
  },
  {
    id: 'template-2',
    name: 'Hook Testing',
    description: 'Test different video openings to improve retention',
    category: 'Content Format',
    platform: 'tiktok',
    defaultHypothesis:
      'Starting with a question/problem will increase view duration by X% vs product showcase',
    suggestedKPIs: ['view_duration', 'shares', 'saves', 'engagement_rate'],
    suggestedDuration: 7,
    bestPractices: [
      'First 3 seconds are crucial on TikTok',
      'Test question vs statement vs action',
      'Consider pattern interrupts',
      'Match hook to content payoff',
      'Test with and without text overlays',
    ],
    exampleVariants: [
      {
        name: 'Question Hook',
        description: 'Start with intriguing question',
        changes: ['Question in first 2 seconds', 'Problem presentation', 'Solution tease'],
      },
      {
        name: 'Action Hook',
        description: 'Jump straight into demonstration',
        changes: ['Immediate action', 'Visual impact', 'No introduction'],
      },
    ],
  },
];

const mockTestLearnings: TestLearning[] = [
  {
    id: 'learning-1',
    testId: '1',
    title: 'Lifestyle Thumbnails Drive 25% Higher CTR',
    description:
      'Testing showed that thumbnails featuring products in real home environments significantly outperformed clean product shots',
    category: 'Visual Content',
    tags: ['thumbnail', 'lifestyle', 'ctr'],
    platform: 'youtube',
    keyTakeaways: [
      'Real environments create stronger emotional connection',
      'Before/after comparisons in thumbnails boost curiosity',
      'Showing people using products increases relatability',
      'Warmer color tones performed better than clinical whites',
    ],
    dosList: [
      'Use real home settings with natural lighting',
      'Include before/after transformations when possible',
      'Show the product solving a real problem',
      'Use warm, inviting color schemes',
    ],
    dontsList: [
      'Avoid sterile, white-background product shots',
      "Don't use stock photo environments",
      'Avoid cluttered backgrounds that distract',
      "Don't forget to show the product clearly",
    ],
    metrics: {
      uplift: 25.3,
      confidence: 97.8,
      sampleSize: 45000,
    },
    createdAt: new Date('2025-03-15'),
  },
];

export class ContentTestingService {
  static async getTestIdeas(): Promise<ABTestIdea[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTestIdeas;
  }

  static async getTestExecutions(): Promise<TestExecution[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTestExecutions;
  }

  static async getTestTemplates(): Promise<TestTemplate[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockTestTemplates;
  }

  static async getTestLearnings(): Promise<TestLearning[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockTestLearnings;
  }

  static async createTestIdea(idea: Partial<ABTestIdea>): Promise<ABTestIdea> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newIdea: ABTestIdea = {
      ...(idea as ABTestIdea),
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
    };
    mockTestIdeas.push(newIdea);
    return newIdea;
  }

  static async calculateSignificance(
    variantA: TestVariantPerformance,
    variantB: TestVariantPerformance
  ): Promise<{
    pValue: number;
    isSignificant: boolean;
    confidence: number;
    recommendedSampleSize?: number;
  }> {
    // Simplified statistical significance calculation
    const conversionRateA = variantA.conversionRate / 100;
    const conversionRateB = variantB.conversionRate / 100;
    const nA = variantA.impressions;
    const nB = variantB.impressions;

    // Pooled conversion rate
    const pooledRate = (variantA.conversions + variantB.conversions) / (nA + nB);

    // Standard error
    const se = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / nA + 1 / nB));

    // Z-score
    const z = (conversionRateB - conversionRateA) / se;

    // P-value (two-tailed)
    const pValue = 2 * (1 - this.normalCDF(Math.abs(z)));

    // Confidence level
    const confidence = (1 - pValue) * 100;

    // Check if significant at 95% confidence
    const isSignificant = pValue < 0.05;

    // Calculate recommended sample size if not significant
    let recommendedSampleSize;
    if (!isSignificant) {
      const effect = Math.abs(conversionRateB - conversionRateA);
      const _power = 0.8; // 80% statistical power
      const _alpha = 0.05; // 5% significance level
      const zAlpha = 1.96; // z-score for 95% confidence
      const zBeta = 0.84; // z-score for 80% power

      recommendedSampleSize = Math.ceil(
        (2 * pooledRate * (1 - pooledRate) * Math.pow(zAlpha + zBeta, 2)) / Math.pow(effect, 2)
      );
    }

    return {
      pValue,
      isSignificant,
      confidence,
      recommendedSampleSize,
    };
  }

  private static normalCDF(z: number): number {
    // Approximation of the cumulative distribution function for standard normal distribution
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const p =
      d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  }

  static generateContentImprovements(testAnalysis: TestAnalysis): ContentImprovement[] {
    return [
      {
        id: '1',
        testId: testAnalysis.testId,
        type: 'thumbnail',
        originalValue: 'Product on white background',
        improvedValue: 'Product in home setting with before/after split',
        reason: 'Lifestyle context increased CTR by 25%',
        expectedImpact: 'Higher initial engagement and click-through rates',
        confidenceScore: 0.95,
        implemented: false,
      },
      {
        id: '2',
        testId: testAnalysis.testId,
        type: 'title',
        originalValue: 'Professional Steam Cleaner Review',
        improvedValue: 'Watch This Steam Cleaner Transform My Dirty Carpet!',
        reason: 'Action-oriented titles with transformation promise perform better',
        expectedImpact: '15-20% increase in CTR',
        confidenceScore: 0.88,
        implemented: false,
      },
    ];
  }
}
