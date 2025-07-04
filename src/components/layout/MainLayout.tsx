import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import OverviewCenter from '../Overview/OverviewCenter';
import ContentInsight from '../content-insight/ContentInsight';
import ContentTest from '../content-testing/ContentTest';
import KOLDashboard from '../content-for-kol/KOLDashboard';
import ContentForAds from '../content-for-ads/ContentForAds';
import ContentForPrivate from '../content-for-private/ContentForPrivate';
import ContentManagement from '../content-management/ContentManagement';
import SystemSettings from '../Settings/SystemSettings';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Routes>
            <Route path="/" element={<OverviewCenter />} />
            <Route path="/overview" element={<OverviewCenter />} />
            <Route path="/content-insight/*" element={<ContentInsight />} />
            <Route path="/content-testing/*" element={<ContentTest />} />
            <Route path="/content-kol/*" element={<KOLDashboard />} />
            <Route path="/content-ads/*" element={<ContentForAds />} />
            <Route path="/content-private/*" element={<ContentForPrivate />} />
            <Route path="/content-management" element={<ContentManagement />} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
