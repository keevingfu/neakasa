import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdCampaignAnalytics from './AdCampaignAnalytics';

const ContentEmpowermentAds: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="campaign-analytics" replace />} />
      <Route path="campaign-analytics" element={<AdCampaignAnalytics />} />
    </Routes>
  );
};

export default ContentEmpowermentAds;