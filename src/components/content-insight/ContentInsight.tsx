import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConsumerVoiceAnalysis from './ConsumerVoiceAnalysis';
import SearchInsights from './SearchInsights';
import ViralFactorAnalysis from './ViralFactorAnalysis';
import ViralVideoInsights from './ViralVideoInsights';
import ContentInsightOverview from './ContentInsightOverview';

const ContentInsight: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ContentInsightOverview />} />
        <Route path="consumer-voice" element={<ConsumerVoiceAnalysis />} />
        <Route path="search" element={<SearchInsights />} />
        <Route path="viral-factor" element={<ViralFactorAnalysis />} />
        <Route path="viral-video" element={<ViralVideoInsights />} />
      </Routes>
    </div>
  );
};

export default ContentInsight;
