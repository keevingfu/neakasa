import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import KOLOverview from './KOLOverview';
import KOLContentReachAnalysis from './KOLContentReachAnalysis';
import KOLConversionRevenueAnalysis from './KOLConversionRevenueAnalysis';

const KOLDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<KOLOverview />} />
      <Route path="reach" element={<KOLContentReachAnalysis />} />
      <Route path="conversion" element={<KOLConversionRevenueAnalysis />} />
    </Routes>
  );
};

export default KOLDashboard;
