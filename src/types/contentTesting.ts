export type TestStatus = 'draft' | 'planning' | 'active' | 'completed' | 'paused';
export type TestResult = 'winner' | 'loser' | 'inconclusive' | 'ongoing';
export type KPIType =
  | 'engagement_rate'
  | 'click_through_rate'
  | 'conversion_rate'
  | 'view_duration'
  | 'shares'
  | 'saves'
  | 'comments'
  | 'likes';

export interface ABTestIdea {
  id: string;
  name: string;
  hypothesis: string;
  description: string;
  variants: TestVariant[];
  kpis: KPI[];
  targetAudience: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'all';
  estimatedDuration: number; // in days
  createdAt: Date;
  updatedAt: Date;
  status: TestStatus;
  category: string;
  tags: string[];
}

export interface TestVariant {
  id: string;
  name: string;
  description: string;
  type: 'control' | 'variant';
  changes: string[];
  thumbnailUrl?: string;
  content?: {
    title?: string;
    description?: string;
    hashtags?: string[];
    format?: string;
  };
}

export interface KPI {
  type: KPIType;
  targetValue: number;
  currentValue?: number;
  weight: number; // importance weight for this KPI
  unit: string; // %, count, seconds, etc.
}

export interface TestExecution {
  id: string;
  testId: string;
  startDate: Date;
  endDate?: Date;
  status: TestStatus;
  variants: TestVariantPerformance[];
  sampleSize: number;
  confidenceLevel: number;
  significanceThreshold: number;
  dailyData: DailyTestData[];
}

export interface TestVariantPerformance {
  variantId: string;
  variantName: string;
  impressions: number;
  conversions: number;
  metrics: Record<KPIType, number>;
  conversionRate: number;
  uplift?: number; // percentage change from control
  confidence?: number;
  result?: TestResult;
}

export interface DailyTestData {
  date: Date;
  variantData: {
    variantId: string;
    impressions: number;
    conversions: number;
    metrics: Record<KPIType, number>;
  }[];
}

export interface TestAnalysis {
  testId: string;
  executionId: string;
  winner?: string;
  confidence: number;
  significanceReached: boolean;
  estimatedRemainingDays?: number;
  insights: TestInsight[];
  recommendations: string[];
  nextSteps: string[];
}

export interface TestInsight {
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  metric?: KPIType;
  impact: 'high' | 'medium' | 'low';
}

export interface TestTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: string;
  defaultHypothesis: string;
  suggestedKPIs: KPIType[];
  suggestedDuration: number;
  bestPractices: string[];
  exampleVariants: Partial<TestVariant>[];
}

export interface ContentImprovement {
  id: string;
  testId: string;
  type: 'title' | 'thumbnail' | 'description' | 'hashtags' | 'format' | 'timing' | 'other';
  originalValue: string;
  improvedValue: string;
  reason: string;
  expectedImpact: string;
  confidenceScore: number;
  implemented: boolean;
}

export interface TestLearning {
  id: string;
  testId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  platform: string;
  keyTakeaways: string[];
  dosList: string[];
  dontsList: string[];
  metrics: {
    uplift: number;
    confidence: number;
    sampleSize: number;
  };
  createdAt: Date;
}
