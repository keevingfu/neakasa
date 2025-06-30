import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdCampaignAnalytics from './AdCampaignAnalytics';
import ChannelPerformanceReport from './ChannelPerformanceReport';
import CampaignDetailAnalysis from './CampaignDetailAnalysis';
import PricingStrategyAnalysis from './PricingStrategyAnalysis';
import GlobalPrimeDayAnalysis from './GlobalPrimeDayAnalysis';
import ContentAdsOverview from './ContentAdsOverview';
import PricingComparisonAnalysis from './PricingComparisonAnalysis';
import KOLCampaignPerformance from './KOLCampaignPerformance';
import IntegratedPerformanceDashboard from './IntegratedPerformanceDashboard';

const ContentForAds: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ContentAdsOverview />} />
        <Route path="overview" element={<ContentAdsOverview />} />
        <Route path="campaign-analytics" element={<AdCampaignAnalytics />} />
        <Route path="channel-performance" element={<ChannelPerformanceReport />} />
        <Route path="campaign-details" element={<CampaignDetailAnalysis />} />
        <Route path="pricing-strategy" element={<PricingStrategyAnalysis />} />
        <Route path="global-prime-day" element={<GlobalPrimeDayAnalysis />} />
        <Route path="pricing-comparison" element={<PricingComparisonAnalysis />} />
        <Route path="kol-campaign-performance" element={<KOLCampaignPerformance />} />
        <Route path="integrated-dashboard" element={<IntegratedPerformanceDashboard />} />
      </Routes>
    </div>
  );
};

export default ContentForAds;
